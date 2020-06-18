const mongoose = require('mongoose');

let Membre = require('./model_membre'); // Permet d'utiliser le model Membre
let Groupe = require('./model_groupe'); // Permet d'utiliser le model Groupe
let Collection = require('./model_collection'); // Permet d'utiliser le model Collection
let Bede = require('./model_bede'); // Permet d'utiliser le model Bede
let Avis = require('./model_avis'); // Permet d'utiliser le model Avis

const express = require('express');
const app = express();

const membre_routes = express.Router(); // Routes pour les membres
const collection_routes = express.Router(); // Routes pour les collections
const bede_routes = express.Router(); // Routes pour les bédés
const avis_routes = express.Router(); // Routes pour les avis sur les bédés
const groupe_routes = express.Router(); // Routes pour les groupes de discussion

const bodyParser = require('body-parser'); // Permet de découper les informations envoyées depuis le front pour être traitées par le back
const cors = require('cors'); // Facilite la gestion des routes

const crypto = require('crypto') // Converti les mots de passe en sha1

app.use( bodyParser.json() );       // Pour le support des JSON-encoded bodies
app.use(bodyParser.urlencoded({     // Pour le support des URL-encoded bodies
    extended: true
})); 

app.use(cors()); // Permet d'utiliser cors
app.use(membre_routes); // Permet d'utiliser les routes pour les membres
app.use(collection_routes); // Permet d'utiliser les routes pour les collections
app.use(bede_routes); // Permet d'utiliser les routes pour les bede
app.use(avis_routes); // Permet d'utiliser les routes pour les avis
app.use(groupe_routes); // Permet d'utiliser les routes pour les groupes

mongoose.connect('mongodb://localhost/CRAM', {useNewUrlParser: true});

// Ma connexion à la base de données doit être faite dans ce fichier. Sinon, le programme enverra un message d'erreur: "Membre is not a constructor"
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur de connexion:'));
db.once('open', function() {
    console.log('connecté à la base de données CRAM');
    
});

//Routes membre--------------------------------------------------------------------------------------------------------------------------------

// Récupérer les fonctions exportés depuis le fichier serveur-membre-fonction dans le même dossier
var funct = require('./serveur-membre-fonction'); //

// Recherche par utilisateur pour que le pseudo soit unique. Retourne une erreur si le pseudo existe déjà
membre_routes.route('/membre/pseudo').post(function(req, res){ 

    let erreurs = [];
    console.log("Dans le pseudo est-il déjà utilisé");
    console.log("req.body", req.body);
    console.log("pseudo: ", req.body.pseudo);
    Membre.find({ pseudo: req.body.pseudo }, function(err, membres){
        if(membres.length == 0){
            console.log("Aucun membre trouvé");
            res.status(200).json({'Membre': 'Pseudo disponible !!'});
            return;
        }
        else{
            console.log("Membre trouvé");
            res.status(403).send("Le pseudo existe déjà dans la base de donnée");
        }
    });
});

// Enregistre le nouveau membre dans la base de donnée
membre_routes.route('/membre/inscription').post(async function(req, res){ 

    console.log("Dans création utilisateur");
    console.log("req.body", req.body);
    let membre = new Membre(req.body);

    let err = await funct.generateurErreursInscription(req, membre);

    if (err.length > 0) {
        console.log("envoyer un message à l'administrateur du site. " + erreurs);
        res.status(403).json({ 'erreurs': "l'administrateur a été prvenu de votre requête." });
        return;
    } else {
        membre.mot_de_passe = toSha1(membre.mot_de_passe);
        membre.save()
            .then(membre => {
                res.status(200).json({'membre': 'Nouveau membre ajouté !!'});
            })
            .catch(err => {
                res.status(403).send("Echec ajout nouveau membre (in else)");
                console.log(err);
            });
    }

});

// Permet à l'utilisateur de se connecter
membre_routes.route('/membre/connexion').post(function(req, res){
    
    console.log("Dans connexion de l'utilisateur");
    Membre.find({ pseudo: req.body.pseudo }, function(err, membres){
        console.log("Dans connexion après la recherche");
        if(membres.lenght == 0){ //Si la longeur de vaut zéro, c'est que le pseudo n'existe pas dans la base de données
            console.log("Dans le if: pas de membre pour le pseudo");
            res.status(403).send("Pseudo ou mot de passe incorrect");
        }
        else{
            membre = membres[0]; // Nous permet de récupérer le premier membre trouvé
            if(membre.mot_de_passe == toSha1(req.body.mot_de_passe)){ //On hache le mot de passe donné lors de la connexion pour savoir s'il correspond à celui de la base de donnée (qui est déjà haché)
                res.status(200).send("Pseudo et mot de passe corrects !!");
                console.log("Connexion réussie !");
            }
            else{
                console.log("Dans le else, mot de passe incorrect");
                res.status(403).send("Pseudo ou mot de passe incorrect");
            }
        }
    });
});

// Affiche la liste des membres dans la base de donnée
membre_routes.route('/membre/liste').get(function(req, res){ 
    Membre.find(function(err, membres) {
        if (err) {
            console.log(err);
            res.status(403).json(err);
        } else {
            res.json(membres);
        }
    });
});

// Affiche le profil d'un membre dans la base de donnée
membre_routes.route('/membre/profil/:id').get(function(req, res){ 
    let id = req.params.id;
    console.log("Dans la route afficher mon profil");
    console.log(id);
    Membre.find({ _id: id }).populate('groupes')
    .then(resultat=>{
        res.json(resultat)
        console.log("mes resultats",resultat);
    })
    .catch((err)=>{
        console.log("err:",err);
        res.status(403).json(err)
    });
 }); 
 
 // Supprime totalement le profil d'un membre dans la base de donnée
 membre_routes.route('/membre/supprimer/:id').get(function(req, res){ 
       Membre.findByIdAndDelete(req.params.id , function(err, membre){
       console.log(req.params.id)
       console.log('Dans la route supprimer membre.')
            if(!membre) {
                res.status(403).send("membre non trouve");
                console.log("membre non trouvé");
            }  else {
                res.status(200).send("Membre supprime");
            console.log("Membre supprime");
        }
    })
});

//Se Connecter pour acceder à la page de modification
membre_routes.route('/membre/validmaj/:id').post(function(req, res){
    
    console.log("Dans mise à jour de l'utilisateur");
    Membre.find({ pseudo: req.body.pseudo }, function(err, membres){
        console.log("Dans ma mise à jour après la recherche");
        if(membres.lenght == 0){ //Si la longeur de vaut zéro, c'est que le pseudo n'existe pas dans la base de données
            console.log("Dans le if: pas de membre pour le pseudo");
            res.status(403).send("Pseudo ou mot de passe incorrect pour modifier");
        }
        else{
            membre = membres[0]; // Nous permet de récupérer le premier membre trouvé
            if(membre.mot_de_passe == toSha1(req.body.mot_de_passe)){ //On hache le mot de passe donné lors de la connexion pour savoir s'il correspond à celui de la base de donnée (qui est déjà haché)
                res.status(200).send("Pseudo et mot de passe corrects !!");
                console.log("Connexion à la page choix réussie !");
            }
            else{
                console.log("Dans le else, mot de passe incorrect");
                res.status(403).send("Pseudo ou mot de passe incorrect pour modifier");
            }
        }
    });
}); 

// Met à jour le mot de passe d'un membre dans la base de donnée
membre_routes.route('/membre/majmotdepasse/:id').post(function(req, res){ 
    Membre.findById(req.params.id,function(err,membre){
        console.log(req.params.id)
        if (membre){
            console.log('je modifie mon compte')
            membre.mot_de_passe=toSha1(req.body.mot_de_passe)
            membre.save()
            .then(membre => {
                res.status(200).json({'membre': 'Compte membre modifié avec succes'});
            })
            
            .catch(err => {
                res.status(403).send('la mise à jour du membre a échoué');
            });
            //   }
        }
        else{
            res.status(403).send("aucun résultats trouvé");
        }
    })
});

// Recherche des paramètres d'un membre pour préremplir le formulaire de mise à jour du profil
membre_routes.route('/membre/avoirmaj/:id').get(function(req, res){ 
    console.log("recherche les params d'un membre par son id")
    Membre.findById(req.params.id,function(err,membre){
        res.json(membre);
    });
});

// Met à jour l'email d'un membre dans la base de donnée
membre_routes.route('/membre/majemail/:id').post(function(req, res){ 
    Membre.findById(req.params.id,function(err,membre){
        console.log(req.params.id)
        if (membre){
            console.log('je modifie mon compte')
            membre.email=req.body.email
            membre.save()
            .then(membre => {
                res.status(200).json({'membre': 'Compte membre modifié avec succes'});
            })
            
            .catch(err => {
                res.status(403).send('la mise à jour du membre a échoué');
            });
            //   }
        }
        else{
            res.status(403).send("aucun résultats trouvé");
        }
    })
});

// Met à jour le pseudo d'un membre dans la base de donnée -> pas utilisé pour le moment, changer le pseudo implique changer le nom dans les messages, groupes, collections, avis...
// membre_routes.route('/membre/majpseudo/:id').post(function(req, res){ 
//     Membre.findById(req.params.id,function(err,membre){
//         console.log(req.params.id)
//         if (membre){
//             console.log('je modifie mon compte')
//             membre.pseudo=req.body.pseudo
//             membre.save()
//             .then(membre => {
//                 res.status(200).json({'membre': 'Compte membre modifié avec succes'});
//             })

//             .catch(err => {
//                 res.status(403).send('la mise à jour du membre a échoué');
//             });
//             //   }
//         }
//         else{
//             res.status(403).send("aucun résultats trouvé");}
//         })
//     });

// Met à jour le profil d'un membre dans la base de donnée
membre_routes.route('/membre/majprofil/:id').post(function(req, res){ 
    Membre.findById(req.params.id,function(err,membre){
        if (membre){
            console.log('je modifie mon compte')
            
            membre.ville=req.body.ville
            membre.date_de_naissance=req.body.date_de_naissance
            membre.save()
            .then(membre => {
                res.status(200).json({'membre': 'Compte membre modifié avec succes'});
            })

            .catch(err => {
                res.status(403).send('la mise à jour du membre a échoué');
            });
            //   }
        }
        else{
            res.status(403).send("aucun résultats trouvé");
        }
    })
});   

//Routes collection------------------------------------------------------------------------------------------------------------------------------------------

// Crée la collection du membre (se fait lors de l'incription du nouveau membre)
collection_routes.route('/collection/creation/').post(function(req, res){
    console.log('Dans création collection');
    console.log('req.params.pseudo: ', req.body.pseudo);
    let collection = new Collection(req.body)
    console.log('collection: ', collection);

    collection.save()
                .then(membre => {
                    res.status(200).json({'collection': 'Nouvelle collection créee'});
                })
                .catch(err => {
                    res.status(403).send("Echec lors de la création de la collection");
                    console.log(err);
                });

});


//Routes bede------------------------------------------------------------------------------------------------------------------------------------------

// Enregistre la nouvelle bédé dans la base de donnée 
bede_routes.route('/bede/ajout').post(function(req, res){ 

    console.log("Dans ajout bédé");
    console.log("req.body", req.body);
    let bede = new Bede(req.body);

    bede.save()
        .then(bede => {
            res.status(200).json({'bédé': 'Nouvelle bédé ajoutée !!'});
        })
        .catch(err => {
            res.status(403).send("Echec ajout nouvelle bédé (in else)");
            console.log(err);
        });
});

// Affiche la liste des bande-dessinées de la base de donnée
bede_routes.route('/bede/liste').get(function(req, res){ 
    Bede.find(function(err, bedes) {
        if (err) {
            console.log(err);
        } else {
            res.json(bedes);
        }
    });
});

// Affiche le détail d'une bande-dessinée
bede_routes.route('/bede/detail/:id').get(function(req, res){ 
    let id = req.params.id;
    console.log("Dans la route afficher le détail de la bande-dessinée");
    console.log(id);
    Bede.find({ _id: id }).populate('Avis')
    .then(resultat=>{
        res.json(resultat)
        console.log("Resultats: ",resultat);
    })
    .catch((err)=>{
        console.log("err:",err);
        res.status(403).json(err)
    });
 }); 

//Routes avis------------------------------------------------------------------------------------------------------------------------------------------


// Fonction qui converti les mots de passes en sha1
function toSha1(mot_de_passe){

    var shasum = crypto.createHash('sha1'); // Choisi le hashage en sha1
    shasum.update(mot_de_passe); // mot de passe hashé
    return shasum.digest('hex'); // => "0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33"
}

// Permet le lancement du serveur
app.listen(4242, function(){
    console.log('Connecté au serveur localhost:4242');
});