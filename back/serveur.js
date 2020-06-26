const mongoose = require('mongoose');

let Membre = require('./model_membre'); // Permet d'utiliser le model Membre
let Collection = require('./model_collection'); // Permet d'utiliser le model Collection
let Bede = require('./model_bede'); // Permet d'utiliser le model Bede
let Avis = require('./model_avis'); // Permet d'utiliser le model Avis
let Groupe = require('./model_groupe'); // Permet d'utiliser le model Groupe
let Discussion = require('./model_discussion'); // Permet d'utiliser le model discussion
let Message = require('./model_message'); // Permet d'utiliser le model Message
let Evenement = require('./model_evenement'); // Permet d'utiliser le model Message
let Partenaire = require('./model_partenaire'); // Permet d'utiliser le model Message

const express = require('express');
const app = express();

const membre_routes = express.Router(); // Routes pour les membres
const collection_routes = express.Router(); // Routes pour les collections
const bede_routes = express.Router(); // Routes pour les bédés
const avis_routes = express.Router(); // Routes pour les avis sur les bédés
const admin_routes = express.Router(); // Routes pour l'administrateur
const discussion_routes = express.Router(); // Route pour les discussions
const message_routes = express.Router(); // Route pour les messages
const groupe_routes = express.Router(); // Route pour les groupes
const evenement_routes = express.Router(); // Route pour les evenements
const partenaire_routes = express.Router(); // Route pour les partenaires
const accueil_routes = express.Router(); // Route pour la page d'accueil

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
app.use(admin_routes); // Permet d'utiliser les routes pour l'administrateur
app.use(discussion_routes);// Permet d'utiliser les routes pour les discussions
app.use(message_routes);// Permet d'utiliser les routes pour les messages
app.use(groupe_routes);// Permet d'utiliser les routes pour les groupes
app.use(evenement_routes);// Permet d'utiliser les routes pour les evenements
app.use(partenaire_routes);// Permet d'utiliser les routes pour les partenaires
app.use(accueil_routes);// Permet d'utiliser les routes pour la page d'accueil

mongoose.connect('mongodb://localhost/CRAM', {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost:27042/CRAM', { useNewUrlParser: true });

// Ma connexion à la base de données doit être faite dans ce fichier. Sinon, le programme enverra un message d'erreur: "Membre is not a constructor"
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur de connexion:'));
db.once('open', function() {
    console.log('connecté à la base de données CRAM');
    
});

//Routes membre--------------------------------------------------------------------------------------------------------------------------------

// Récupérer les fonctions exportés depuis le fichier serveur-membre-fonction dans le même dossier
var funct = require('./serveur-membre-fonction'); //
const { collection } = require('./model_membre');

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
    let membre_banni = "Le membre est banni";

    Membre.find({ pseudo: req.body.pseudo }, function(err, membres){
        console.log("Dans connexion après la recherche");
        if(membres.length == 0){ //Si la longeur de vaut zéro, c'est que le pseudo n'existe pas dans la base de données
            console.log("Dans le if: pas de membre pour le pseudo");
            res.status(403).send("Pseudo ou mot de passe incorrect");
        }
        else{
            membre = membres[0]; // Nous permet de récupérer le premier membre trouvé
            if(membre.mot_de_passe == toSha1(req.body.mot_de_passe)){ //On hache le mot de passe donné lors de la connexion pour savoir s'il correspond à celui de la base de donnée (qui est déjà haché)
                if(membre.banni === false){
                    res.json(membre).status(200);
                    console.log("Connexion réussie !");
                } else if (membre.banni === true){
                    console.log("Le membre est banni");
                    res.json(membre_banni);
                }
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

membre_routes.route('/membre/trouver/nom/:id').get(function(req, res){
    console.log("Dans la route trouver un nom par id")
    Membre.findById(req.params.id, function(err, membre){
        res.json(membre);
        console.log(membre);

    })
})

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
    console.log('req.body.pseudo: ', req.body.pseudo);
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

// Permet d'ajouter une bédé à la collection de l'utilisateur
collection_routes.route('/collection/ajouter/:id/:proprietaire').get(function(req, res){
    console.log("Dans la route ajouter une bédé à la collection");
    console.log('req.params.id de la bédé: ', req.params.id);
    console.log('req.params.membre du propriétaire: ', req.params.proprietaire);
    Collection.findOneAndUpdate({proprietaire: req.params.proprietaire}, {$push: {bedes: req.params.id}})
                .then(collection_bede => {
                    res.status(200).json({'Collection': 'Nouvelle bédé ajoutée à la collection !!'});
                })
                .catch(err => {
                    res.status(403).send("Echec ajout nouvelle bédé à la collection");
                    console.log(err);
                });
})


// collection_routes.route('/collection/liste/:proprietaire').get(async function(req, res){
    
//     console.log("Dans la route afficher collection");
//     console.log('req.params.membre du propriétaire: ', req.params.proprietaire);
//     Collection.find({proprietaire: req.params.proprietaire}, function(err, bedes){
//         if(err){
//             console.log(err);
//             res.status(403).json(err);
//         } else {
//             let ma_collection = [];
//             console.log('reultat de la recherche de collection: ', bedes);
//             // console.log('bedes.liste: ', bedes[0].liste);
//             // console.log('bedes._id: ', bedes[0]._id);
//             // console.log('bedes.proprietaire: ', bedes[0].proprietaire);
//             bedes[0].liste.forEach(async function(bede){
//                 console.log("bede: ", bede);
//                 const recherche_bede_a_partir_liste_dans_collection = await Bede.find({_id: bede });
//                     if(await recherche_bede_a_partir_liste_dans_collection.length == 0){
//                         console.log("Rien du tout");
//                     } else {
//                     // console.log("Resultat recherche bédé par id: ", resultat_recherche_bede);
                    
//                     ma_collection.push(recherche_bede_a_partir_liste_dans_collection);
//                     console.log('Bédes de la collection: ', ma_collection);
//                     }
//                     console.log('Bédes de la collection après le forEach: ', ma_collection);
//                     // res.json(ma_collection);
//                 });
//                 console.log("Ma collection après then", ma_collection[0]);
                
//             };
//         })
        
    
//     // res.json(ma_collection);

// })

// collection_routes.route('/collection/liste/:proprietaire').get(function(req, res){
    
//     console.log("Dans la route afficher collection");
//     console.log('req.params.membre du propriétaire: ', req.params.proprietaire);
//     Collection.find({proprietaire: req.params.proprietaire}, function(err, bedes){
//         if(err){
//             console.log(err);
//             res.status(403).json(err);
//         } else {
//             let ma_collection = [];
//             console.log('reultat de la recherche de collection: ', bedes);
//             // console.log('bedes.liste: ', bedes[0].liste);
//             // console.log('bedes._id: ', bedes[0]._id);
//             // console.log('bedes.proprietaire: ', bedes[0].proprietaire);
//             bedes[0].liste.forEach(function(bede){
//                 console.log("bede: ", bede);
//                 Bede.find({_id: bede }, function(err, resultat_recherche_bede){
//                     if(err){
//                         console.log(err);
//                     } else {
//                     // console.log("Resultat recherche bédé par id: ", resultat_recherche_bede);
                    
//                     ma_collection.push(resultat_recherche_bede);
//                     console.log('Bédes de la collection: ', ma_collection);
//                     }
//                     console.log('Bédes de la collection après le forEach: ', ma_collection);
//                     // res.json(ma_collection);
//                 }).then(console.log("Ma collection après then", ma_collection));
                
//             });
//         }
        
//     })
//     // res.json(ma_collection);

// })

// Permet d'afficher la collection du membre
collection_routes.route('/collection/liste/:proprietaire').get(function(req, res){
    
    console.log("Dans la route afficher collection");
    console.log('req.params.membre du propriétaire: ', req.params.proprietaire);
    Collection.find({proprietaire: req.params.proprietaire})
                // .populate('bedes').sort({serie: 1, tome: 1})
                .populate({path: 'bedes', options: {sort:{serie: 1, tome: 1}}}) // L'option permet de classer les bédés d'abord par série puis par tome. J'utilise cette méthode plus celles des autres requêtes car je trie un objetID
                .then(resultat => {
                    res.json(resultat);
                    console.log('resultat: ', resultat);
                    console.log('longeur resultat.bedes: ', resultat.bedes);
                })
                .catch(err => {
                    console.log("erreur: ", err);
                    res.status(403).json(err);
                })

});

// // Permet de retirer une bédé d'une collection
// collection_routes.route('/collection/retirer/bd/:id').get(function(req, res){

//     console.log("Dans la route pour retirer une bande-dessinée de la collection");
//     console.log("req.params de l'id", req.params.id);
//     Collection.findByIdAndDelete({bedes: req.params.id}, function(err, dans_ma_collection){
//         if(!dans_ma_collection){
//             res.status(404).send("La bede n'est pas dans la collection");
//             console.log("La bede n'est pas dans la collection");
//         } else {
//             res.status(200).send("Bede retirée de la collection");
//             console.log("Bede retirée de la collection");
//         }
//     })
// });

// Permet de retirer une bédé de la collection
collection_routes.route('/collection/retirer/bd/:id/:proprietaire').get(function(req, res){

    console.log("Dans la route pour retirer une bande-dessinée de la collection");
    console.log("req.params de l'id", req.params.id);
    console.log("propriétaire: ", req.params.proprietaire);
    Collection.update({proprietaire: req.params.proprietaire}, { $pull: {bedes: req.params.id}}, function(err, dans_ma_collection){
        if(!dans_ma_collection){
            res.status(404).send("La bede n'est pas dans la collection");
            console.log("La bede n'est pas dans la collection");
        } else {
            res.status(200).send("Bede retirée de la collection");
            console.log("Bede retirée de la collection");
        }
    })
});

//Routes bede------------------------------------------------------------------------------------------------------------------------------------------

// Enregistre la nouvelle bédé dans la base de donnée 
bede_routes.route('/bede/ajout').post(function(req, res){ 

    console.log("Dans ajout bédé");
    console.log("req.body", req.body);
    let bede = new Bede(req.body);

    bede.save()
        .then(bede => {
            res.json(bede).status(200).json({'bédé': 'Nouvelle bédé ajoutée !!'});
        })
        .catch(err => {
            res.status(403).send("Echec ajout nouvelle bédé");
            console.log(err);
        });
});

// Affiche la liste des bande-dessinées de la base de donnée
bede_routes.route('/bede/liste').get(function(req, res){ 
    Bede.find().sort({serie: 1, tome: 1}).exec(function(err, bedes) {
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
    Bede.find({ _id: id }).populate('avis')
    .then(resultat=>{
        res.json(resultat)
        console.log("Resultats: ",resultat);
    })
    .catch((err)=>{
        console.log("err:",err);
        res.status(403).json(err)
    });
 }); 

 // Permet la recherche de bande-déssinée
 bede_routes.route('/bede/recherche').post(function(req, res){
    console.log("Dans la route recherche bande-dessinée");
    console.log("req.body: ", req.body);
    console.log("req.body.recherche: ", req.body.recherche)
    let pas_de_reponse = "vide";

    // Bede.find({ serie: req.body.recherche})
    // Bede.find({ serie: { $regex: req.body.serie }}) // Permet de trouver une bédé avec une partie du nom de la série
    Bede.find( { $or:[ { serie: { $regex: req.body.recherche }}, // Permet de trouver une bédé par série, titre, scénariste, dessinateur
                        { titre: { $regex: req.body.recherche }},  // Le regex permet d'utiliser des noms incomplets
                        { scenariste: { $regex: req.body.recherche }}, 
                        { dessinateur: { $regex: req.body.recherche }} ] }).sort({serie: 1, tome: 1})
        .then(resultat=>{
            if(resultat.length != 0){
                res.json(resultat);
                console.log("Resultat: ", resultat);
            } else {
                res.json(pas_de_reponse);
                console.log("Pas de réponse: ", pas_de_reponse);
            }
        })
        .catch((err)=>{
            console.log("err: ", err);
            res.status(403).json(err)
        });
 })
 

//   // Permet la recherche de bande-déssinée
//   bede_routes.route('/bede/recherche').post(function(req, res){
//     console.log("Dans la route recherche bande-dessinée");
//     console.log("req.body: ", req.body);
//     console.log("req.body.recherche: ", req.body.recherche)
//     // Bede.find({ serie: req.body.recherche})
//     // Bede.find({ serie: { $regex: req.body.serie }}) // Permet de trouver une bédé avec une partie du nom de la série
//     Bede.find( { $or:[ { serie: { $regex: req.body.recherche }}, // Permet de trouver une bédé par série, titre, scénariste, dessinateur
//                         { titre: { $regex: req.body.recherche }},  // Le regex permet d'utiliser des noms incomplets
//                         { scenariste: { $regex: req.body.recherche }}, 
//                         { dessinateur: { $regex: req.body.recherche }} ] }),
//                 function(err, resultat){
//                     if (resultat.lenght == 0){
//                         console.log("Aucuns résultats pour la recherche");
//                         res.status(403).send("Aucun résultats");
//                         return;
//                     } else {
//                         res.json(resultat);
//                         console.log("Resultat: ", resultat);
//                     }
//                 }
//  })

// Permet de récupérer les données de la bédé à modifier pour les afficher en valeur par défaut dans le formulaire
bede_routes.route('/bede/prendrecontenu/:id').get(function(req, res) { 

    console.log('Dans la route bédé recherche la bédé par id');
    console.log("id: ", req.params.id);

    Bede.findById(req.params.id, function(err, bede) {
        res.json(bede);
    });
})

// Permet la modification de la bédé
bede_routes.route('/bede/maj/:id').post(function(req, res){
    
    console.log("Dans maj bédé par le membre");
    console.log("id: ", req.params.id);

    Bede.findById(req.params.id, function(err, bede) {
        if(!bede){
            res.status(404).send("bédé non trouvée !!!");
        } else {
            bede.serie = req.body.serie;
            bede.titre = req.body.titre;
            bede.tome = req.body.tome;
            bede.scenariste = req.body.scenariste;
            bede.dessinateur = req.body.dessinateur;
            bede.editeur = req.body.editeur;
            bede.annee_parution = req.body.annee_parution;
            bede.resume = req.body.resume;

            bede.save().then(bede => {
                res.json('Bédé modifiée');
            })
            .catch(err => {
                res.status(400).send("Echec de la maj");
            });
        }
    })
})


//Routes avis------------------------------------------------------------------------------------------------------------------------------------------

// Cette route permet d'ajouter un avis et de l'associer à la bédé correspondante
avis_routes.route('/avis/ajouter/:id').post(function(req, res){

    console.log("Dans la route ajouter un avis");
    console.log("id: ", req.params.id);
    console.log("req.body: ", req.body);
    let avis = new Avis(req.body);
    avis.save()
            .then(resultat => {
                Bede.findById(req.params.id, function(err, bede) {
                    console.log("Avant le if: ", bede);
                    if(bede){
                        console.log("Dans le if");
                        bede.avis.push(avis._id);
                        bede.save();
                        console.log("Avis après save: ", avis);
                        console.log("Bede après save: ", bede);
                        res.status(200).send("Avis ajouté");
                    } else {
                        res.status(404).send("La bande-dessinée pour ajouter l'avis n'a pas été trouvée");
                    }
                });
            })
            .catch(err => {
                res.status(403).send("Erreur dans l'ajout de l'avis");
                console.log("Erreur dans l'ajout de l'avis: ", err);
            })
});

// Permet de récupérer les données de l'avis à modifier pour les afficher en valeur par défaut dans le formulaire
avis_routes.route('/avis/prendrecontenu/:id').get(function(req, res) { 

    console.log("Dans la route avis recherche l'avis par id pour afficher le contenu dans le formulaire");
    console.log("id: ", req.params.id);

    Avis.findById(req.params.id, function(err, avis) {
        res.json(avis);
    });
});

// Permet la modification de l'avis
avis_routes.route('/avis/maj/:id').post(function(req, res){
    
    console.log("Dans la route maj avis par le membre");
    console.log("id: ", req.params.id);

    Avis.findById(req.params.id, function(err, avis) {
        if(!avis){
            res.status(404).send("avis non trouvée !!!");
        } else {
            avis.contenu = req.body.contenu;

            avis.save().then(avis => {
                res.json('Avis modifié');
            })
            .catch(err => {
                res.status(400).send("Echec de la maj");
            });
        }
    })
});

// Permet au membre de supprimer un avis
avis_routes.route('/avis/supprimer/:id').get(function(req, res){

    console.log("Dans la route supprimer un avis par le membre");
    console.log("id: ", req.params.id);

    Avis.findByIdAndDelete(req.params.id, function(err, avis){
        if(!avis){
            res.status(404).send("Avis non trouvé !!!");
            console.log("Avis non trouvé");
        } else {
            res.status(200).send("Avis supprimé");
            console.log("Avis supprimé");  
        }
    }) 
});

// Affiche la liste de tous les avis de la base de donnée
avis_routes.route('/avis/liste').get(function(req, res){ 
    Avis.find().sort({date: -1}).exec(function(err, avis) {
        if (err) {
            console.log(err);
        } else {
            res.json(avis);
        }
    });
});

//Routes admin------------------------------------------------------------------------------------------------------------------------------------------

// Enregistre la nouvelle bédé dans la base de donnée 
admin_routes.route('/admin/bede/ajout').post(function(req, res){ 

    console.log("Dans ajout bédé par l'admin");
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

// Permet de récupérer les données de la bédé à modifier pour les afficher en valeur par défaut dans le formulaire
admin_routes.route('/admin/bede/prendrecontenu/:id').get(function(req, res) { 

    console.log('Dans la route admin recherche la bédé par id');
    console.log("id: ", req.params.id);

    Bede.findById(req.params.id, function(err, bede) {
        res.json(bede);
    });
})

// Permet la modification de la bédé
admin_routes.route('/admin/bede/maj/:id').post(function(req, res){
    
    console.log("Dans maj bédé par l'admin");
    console.log("id: ", req.params.id);

    Bede.findById(req.params.id, function(err, bede) {
        if(!bede){
            res.status(404).send("bédé non trouvée !!!");
        } else {
            bede.serie = req.body.serie;
            bede.titre = req.body.titre;
            bede.tome = req.body.tome;
            bede.scenariste = req.body.scenariste;
            bede.dessinateur = req.body.dessinateur;
            bede.editeur = req.body.editeur;
            bede.annee_parution = req.body.annee_parution;
            bede.resume = req.body.resume;

            bede.save().then(bede => {
                res.json('Bédé modifiée');
            })
            .catch(err => {
                res.status(400).send("Echec de la maj");
            });
        }
    })
})

// Permet à l'administrateur de supprimer une bande-dessinée
admin_routes.route('/admin/bede/supprimer/:id').get(function(req, res){

    console.log("Dans la route admin pour supprimer un bande-dessinée");
    console.log("id: ", req.params.id);

    Bede.findByIdAndDelete(req.params.id, function(err, bede){
        if(!bede){
            res.status(404).send("Bande-dessinée non trouvée !!!");
            console.log("Bande-dessinée non trouvée");
        } else {
            res.status(200).send("Bande-dessinée supprimée");
            console.log("Bande-dessinée supprimée");  
        }
    }) 
});

// Permet à l'administrateur de bannir un membre
admin_routes.route('/admin/membre/bannir/:id').get(function(req, res){

    console.log("Dans bannir membre par l'admin");
    console.log("id: ", req.params.id);

    Membre.findById(req.params.id, function(err, membre) {
        if(!membre){
            res.status(404).send("membre non trouvé !!!");
        } else {
            membre.banni = true;

            membre.save().then(membre => {
                res.json('Bédé modifiée');
            })
            .catch(err => {
                res.status(400).send("Echec de la maj");
            })
        }
    })
});

// Permet à l'administrateur de débannir un membre
admin_routes.route('/admin/membre/debannir/:id').get(function(req, res){

    console.log("Dans bannir membre par l'admin");
    console.log("id: ", req.params.id);

    Membre.findById(req.params.id, function(err, membre) {
        if(!membre){
            res.status(404).send("membre non trouvé !!!");
        } else {
            membre.banni = false;

            membre.save().then(membre => {
                res.json('Bédé modifiée');
            })
            .catch(err => {
                res.status(400).send("Echec de la maj");
            })
        }
    })
});

//Routes accueil------------------------------------------------------------------------------------------------------------------------------------------

//Afficher tous les evenements dans la page d'accueil
accueil_routes.route('/accueil/evenement').get(function(req, res) {
    Evenement.find().sort({date:1}).limit(3).exec(function(err, evenements) {
    // Evenement.find().sort({date:1}).exec(function(err, evenements) {
         if (err) {
             console.log(err);
         } else {
             res.json(evenements);
         }
     });
 });

//Afficher tous les avis dans la page d'accueil
accueil_routes.route('/accueil/avis').get(function(req, res) {
    Avis.find().sort({date:-1}).limit(3).exec(function(err, avis) {
    // Evenement.find().sort({date:1}).exec(function(err, evenements) {
         if (err) {
             console.log(err);
         } else {
             res.json(avis);
         }
     });
 });

//Afficher tous les avis dans la page d'accueil
accueil_routes.route('/accueil/bede').get(function(req, res) {
    Bede.find().sort({enregistre_le:-1}).limit(3).exec(function(err, bedes) {
    // Evenement.find().sort({date:1}).exec(function(err, evenements) {
         if (err) {
             console.log(err);
         } else {
             res.json(bedes);
         }
     });
 });

//Routes discussion------------------------------------------------------------------------------------------------------------------------------------------ 

//Afficher toutes les discussions
discussion_routes.route('/discussion/liste').get(function(req, res) {
    Discussion.find(function(err, discussions) {
        if (err) {
            console.log(err);
        } else {
            res.json(discussions);
        }
    });
});

// Creation d'une discussion 
discussion_routes.route('/discussion/creer').post(function(req, res) {
    let discussion = new Discussion(req.body);
    console.log ('je suis dans creation discussion')
        discussion.save()
            .then(discussion => {
                res.status(200).json({'discussion': 'creer avec success'});
                    })
            .catch(err => {
                res.status(400).send('creer une discussion a echoué');
                      });
            })

// Afficher le detail d'une discussion
discussion_routes.route('/discussion/:id').get(function(req, res){ 
    let id = req.params.id;
   console.log("Dans la route afficher la discussio detail.");
   console.log(id);
    Discussion.find({ _id: id }).populate('messages')
    .then(resultat=>{
           res.json(resultat)
               console.log("mes resultats",resultat);
              })
              .catch((err)=>{
                  console.log("err:",err);
                  res.status(403).json(err)
              });
           }); 

// Supprime totalement une discussion dans la base de donnée
discussion_routes.route('/discussion/supprimer/:id').get(function(req, res){ 
    console.log("dans le serveur suppriemr une discussion",req.params.id)
    Discussion.findByIdAndDelete(req.params.id , function(err, discussion){
    console.log(req.params.id)
    console.log('Dans la route supprimer une discussion.')
         if(!discussion) {
             res.status(403).send("discussion non trouvee");
             console.log("discussion non trouvée");
         }  else {
             res.status(200).send("Discussion supprimee");
         console.log("Discussion supprimee");
     }
     })
 });

// Recherche des paramètres d'une discussion pour préremplir le formulaire de mise à jour du profil
discussion_routes.route('/discussion/avoirmaj/:id').get(function(req, res){ 
    console.log("recherche les params d'une discussion par son id")
    Discussion.findById(req.params.id,function(err,discussion){
        res.json(discussion);
    });
});

// Met à jour un message dans la base de donnée
discussion_routes.route('/discussion/maj/:id').post(function(req, res){ 
Discussion.findById(req.params.id,function(err,discussion){
    console.log(req.params.id)
    if (discussion){
        console.log('je modifie mon message')
        discussion.titre=req.body.titre
        discussion.save()
        .then(discussion => {
            res.status(200).json({'discussion': 'discussion modifié avec succes'});
        })
        
        .catch(err => {
            res.status(403).send('la mise à jour de la discussion a échoué');
        });
        //   }
    }
    else{
        res.status(403).send("aucun résultats trouvé");}
    })
});

//Pour afficher les groupes d'un membre dans la discussions
discussion_routes.route('/membre/groupe/:pseudo').get(function(req, res){ 
    let pseudo = req.params.pseudo;
    console.log("Dans la route afficher mon profile.");
    console.log(pseudo);
    Membre.find({ pseudo: pseudo }).populate('groupes')
    .then(resultat=>{
        res.json(resultat)
        console.log("mes resultats",resultat);
    })
    .catch((err)=>{
        console.log("err:",err);
        res.status(403).json(err)
    });
 }); 

//Routes messages------------------------------------------------------------------------------------------------------------------------------------------------

// Creation d'un message dans une discussion       
message_routes.route('/message/creer/:id').post(function(req, res){ 
    let id = req.params.id;
    let message = new Message(req.body);
    console.log ('je suis dans creation message')
        message.save()
            .then(result => {
                console.log('juste avant de mettre dans la discussion')
                Discussion.findById(id , (err, discussion) => {
                    console.log('danser')
                    if (discussion) {
                        console.log('juste avant de push dans discussion')
                         // The below two lines will add the newly saved review's 
                        // ObjectID to the the User's reviews array field
                        discussion.messages.push(message.id);
                        discussion.save();
                        res.json({ message: 'Message creer!' });
                    };
                })
            })   
            .catch(err => {
                res.status(400).send('Mettre un nouveau message a echoué');
                      });
            })

// Supprime totalement un message dans la base de donnée
message_routes.route('/message/supprimer/:id').get(function(req, res){ 
    console.log("dans le serveur supprimer message",req.params.id)
    Message.findByIdAndDelete(req.params.id , function(err, message){
    console.log(req.params.id)
    console.log('Dans la route supprimer un message.')
         if(!message) {
             res.status(403).send("message non trouve");
             console.log("message non trouvé");
         }  else {
             res.status(200).send("Message supprime");
         console.log("Message supprime");
     }
     })
 });

  // Recherche des paramètres d'un message pour préremplir le formulaire de mise à jour du message
  message_routes.route('/message/avoirmaj/:id').get(function(req, res){ 
    console.log("recherche les params d'un message par son id")
    Message.findById(req.params.id,function(err,message){
        res.json(message);
    });
    })

// Met à jour un message dans la base de donnée
message_routes.route('/message/maj/:id').post(function(req, res){ 
    Message.findById(req.params.id,function(err,message){
        console.log(req.params.id)
        if (message){
            console.log('je modifie mon message')
            message.message=req.body.message
            message.save()
            .then(membre => {
                res.status(200).json({'message': 'message modifié avec succes'});
            })
            
            .catch(err => {
                res.status(403).send('la mise à jour du message a échoué');
            });
            //   }
        }
        else{
            res.status(403).send("aucun résultats trouvé");}
        })
    });

//Routes Groupes------------------------------------------------------------------------------------------------------------------------------------------------

groupe_routes.route('/groupe/creation').post(async function (req, res, membre) {
    console.log("je suis dans groupe création.");
    let groupe = new Groupe(req.body);
    //Adaptation à faire pour récupérer le liste des mebres en objectId à la place des login
    groupe.membres_groupe = await transformerListePseudoEnListe_id(req.body.membre_groupe_pseudonymes);
   console.log(req.body.membre_groupe_pseudonymes);
    let err = []
    //gestion des erreurs
    //let err = await functG.generateurErreursGroupeCreation(req, member);
    //console.log("serveur Groupe Création err = "+err+ err.length);
    if (err.length > 0) {
        res.status(403).json({ 'err': err })
        return;
    } else {

        groupe.save()
             .then(result => {
                for (let index = 0; index < groupe.membres_groupe.length; index++) {
                    let pseudoMembre = groupe.membres_groupe[index];
                    Membre.findById( pseudoMembre, (err, membre)=>{
                        console.log("je suis dedans")
                    membre.groupes.push(groupe.id);
                    membre.save();
                });}
                res.status(200).json({'status': "OK", 'groupe': 'groupe ajouté avec succès' });
                //attention les redirects ne se font pas du côté server mais du côté component !!!! reférence create-memeber.component
            })
            .catch(err => {
                console.log("serveur Groupe Création err = " + err + err.length);
                res.status(403).send({ 'err': ["Erreur Technique"] });
            });
        }
});

//Routes évênements------------------------------------------------------------------------------------------------------------------------------------------------

//Afficher toutes les evenements
evenement_routes.route('/evenement/liste').get(function(req, res) {
    // Evenement.find().sort({date:1}).limit(5).exec(function(err, evenements) {
     Evenement.find().sort({date:1}).exec(function(err, evenements) {
         if (err) {
             console.log(err);
         } else {
             res.json(evenements);
         }
     });
 });

// Creation d'un evenement 
evenement_routes.route('/evenement/creer').post(function(req, res) {
    let evenement = new Evenement(req.body);
    console.log ('je suis dans creation evenement')
        evenement.save()
            .then(evenement => {
                res.status(200).json({'evenement': 'creer avec success'});
                    })
            .catch(err => {
                res.status(400).send('creer un evenement a echoué');
                      });
            })

// Afficher le detail d'un evenement
evenement_routes.route('/evenement/:id').get(function(req, res){ 
    let id = req.params.id;
   console.log("Dans la route afficher l' evenement detail.");
   console.log(id);
    Evenement.find({ _id: id })
    .then(resultat=>{
           res.json(resultat)
               console.log("mes resultats",resultat);
              })
              .catch((err)=>{
                  console.log("err:",err);
                  res.status(403).json(err)
              });
           });

// Supprime totalement un evenement dans la base de donnée
evenement_routes.route('/evenement/supprimer/:id').get(function(req, res){ 
    console.log("dans le serveur suppriemr un evenement",req.params.id)
    Evenement.findByIdAndDelete(req.params.id , function(err, evenement){
    console.log(req.params.id)
    console.log('Dans la route supprimer un evenement.')
         if(!evenement) {
             res.status(403).send("devenement non trouve");
             console.log("evenement non trouvé");
         }  else {
             res.status(200).send("Evenement supprime");
         console.log("Evenement supprime");
     }
     })
 });

// Recherche des paramètres d'un evenement pour préremplir le formulaire de mise à jour 
evenement_routes.route('/evenement/avoirmaj/:id').get(function(req, res){ 
    console.log("recherche les params d'un evenement par son id")
    Evenement.findById(req.params.id,function(err,evenement){
        console.log("envoi au front: ", evenement);
        res.json(evenement);
    });
});

// Met à jour un evenement dans la base de donnée
evenement_routes.route('/evenement/maj/:id').post(function(req, res){ 
Evenement.findById(req.params.id,function(err,evenement){
    console.log(req.params.id)
    if (evenement){
        console.log('je modifie monevenement')
        // evenement.titre=req.body.titre
        evenement.nom=req.body.nom
        evenement.description= req.body.description
        evenement.ville= req.body.ville
        evenement.date= req.body.date
        evenement.save()
        .then(evenement => {
            res.status(200).json({'evenement': 'evenement modifié avec succes'});
        })
        
        .catch(err => {
            res.status(403).send('la mise à jour de levenement a échoué');
        });
        //   }
    }
    else{
        res.status(403).send("aucun résultats trouvé");}
    })
});

//Routes partenaires------------------------------------------------------------------------------------------------------------------------------------------------

//Afficher toutes les partenaires
partenaire_routes.route('/partenaire/liste').get(function(req, res) {
    Partenaire.find().sort({debut_pub:1}).exec(function(err, partenaires) {
        if (err) {
            console.log(err);
        } else {
            res.json(partenaires);
        }
    });
});

// Creation d'un partenaire
partenaire_routes.route('/partenaire/creer').post(function(req, res) {
    let partenaire = new Partenaire(req.body);
    console.log ('je suis dans creation partenaire')
        partenaire.save()
            .then(partenaire => {
                res.status(200).json({'partenaire': 'creer avec success'});
                    })
            .catch(err => {
                res.status(400).send('creer un partenaire a echoué');
                      });
            })

// Afficher le detail d'un partenaire
partenaire_routes.route('/partenaire/:id').get(function(req, res){ 
    let id = req.params.id;
   console.log("Dans la route afficher le partenaire detail.");
   console.log(id);
    Partenaire.find({ _id: id })
    .then(resultat=>{
           res.json(resultat)
               console.log("mes resultats",resultat);
              })
              .catch((err)=>{
                  console.log("err:",err);
                  res.status(403).json(err)
              });
           });

// Supprime totalement un partenaire dans la base de donnée
partenaire_routes.route('/partenaire/supprimer/:id').get(function(req, res){ 
    console.log("dans le serveur suppriemr un partenaire",req.params.id)
    Partenaire.findByIdAndDelete(req.params.id , function(err, partenaire){
    console.log(req.params.id)
    console.log('Dans la route supprimer un partenaire.')
         if(!partenaire) {
             res.status(403).send("partenaire non trouve");
             console.log("partenaire non trouvé");
         }  else {
             res.status(200).send("Partenaire supprime");
         console.log("Partenaire supprime");
     }
     })
 });

// Recherche des paramètres d'un partenaire pour préremplir le formulaire de mise à jour 
partenaire_routes.route('/partenaire/avoirmaj/:id').get(function(req, res){ 
    console.log("recherche les params d'un partenaire par son id")
    Partenaire.findById(req.params.id,function(err,partenaire){
        res.json(partenaire);
    });
});

// Met à jour un partenaire dans la base de donnée
partenaire_routes.route('/partenaire/maj/:id').post(function(req, res){ 
Partenaire.findById(req.params.id,function(err,partenaire){
    console.log(req.params.id)
    if (partenaire){
        console.log('je modifie le partenaire')
        partenaire.nom=req.body.nom
        partenaire.adresse=req.body.adresse
        partenaire.ville=req.body.ville
        partenaire.secteur=req.body.secteur
        partenaire.contact=req.body.contact          
        partenaire.email_contact=req.body.email_contact            
        partenaire.tel_contact=req.body.tel_contact         
        partenaire.debut_pub=req.body.debut_pub        
        partenaire.fin_pub=req.body.fin_pub
        partenaire.save()
        .then(partenaire => {
            res.status(200).json({'partenaire': 'partenaire modifié avec succes'});
        })
        
        .catch(err => {
            res.status(403).send('la mise à jour de du partenaire a échoué');
        });
        //   }
    }
    else{
        res.status(403).send("aucun résultats trouvé");}
    })
});

//Fonctions------------------------------------------------------------------------------------------------------------------------------------------------
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

//Fonction qui convertie une liste de pseudo en liste d'Id
async function transformerListePseudoEnListe_id(liste_membre_groupe_pseudo){
    let liste_membre_groupe_object_id = [];
    for (let index = 0; index < liste_membre_groupe_pseudo.length; index++) {
        let pseudoMembre = liste_membre_groupe_pseudo[index];
        let membre = await Membre.findOne({ pseudo: pseudoMembre }).populate();
        liste_membre_groupe_object_id.push(membre._id);
    }
    return liste_membre_groupe_object_id;
}