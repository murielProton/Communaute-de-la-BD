const mongoose = require('mongoose');
const MongoPort = "27042"; // Anciennement 27017

let Membre = require('./model_membre'); // Permet d'utiliser le model Membre
let Groupe = require('./model_groupe'); // Permet d'utiliser le model Groupe

const express = require('express');
const app = express();

const membre_routes = express.Router(); // Route pour les membres
const groupe_routes = express.Router();

const bodyParser = require('body-parser'); // Permet de découper les informations envoyées depuis le front pour être traitées par le back
const cors = require('cors'); // Facilite la gestion des routes

const crypto = require('crypto') // Converti les mots de passe en sha1

app.use(bodyParser.json());       // Pour le support des JSON-encoded bodies
app.use(bodyParser.urlencoded({     // Pour le support des URL-encoded bodies
    extended: true
}));

app.use(cors()); // Permet d'utiliser cors
app.use(membre_routes); // Permet d'utiliser les routes pour les membres
app.use('/groupe', groupe_routes);// évite de réécrire /groupe à chaque fois qu'on fait une route groupe

mongoose.connect('mongodb://localhost:27042/CRAM', { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost/CRAM', { useNewUrlParser: true });

// Ma connexion à la base de données doit être faite dans ce fichier. Sinon, le programme enverra un message d'erreur: "Membre is not a constructor"
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'erreur de connexion:'));
db.once('open', function () {
    console.log('connecté à la base de données CRAM');

});

//------------------------------------------------------------------------------------------------------------------------------------------
//récupérer les fonctions exportés depuis le fichier serveur-membre-fonction dans le même dossier
var funct = require('./serveur-membre-fonction');
// Recherche par utilisateur pour que le pseudo soit unique. Retourne une erreur si le pseudo existe déjà
membre_routes.route('/membre/pseudo').post(function (req, res) {
    let erreurs = [];
    console.log("Dans le pseudo est-il déjà utilisé");
    console.log("req.body", req.body);
    console.log("pseudo: ", req.body.pseudo);
    Membre.find({ pseudo: req.body.pseudo }, function (err, membres) {
        if (membres.length == 0) {
            console.log("Aucun membre trouvé");
            res.status(200).json({ 'Membre': 'Pseudo disponible !!' });
            return;
        }
        else {
            console.log("Membre trouvé");
            res.status(403).send("Le pseudo existe déjà dans la base de donnée");
        }
    });
});

// Enregistre le nouveau membre dans la base de donnée
membre_routes.route('/membre/inscription').post(async function (req, res) {

    console.log("Dans création utilisateur");
    console.log("req.body", req.body);
    let membre = new Membre(req.body);
    let erreurs = await funct.generateurErreursInscription(req, membre);
    if (erreurs.length > 0) {
        console.log("envoyer un message à l'administrateur du site. " + erreurs);
        res.status(403).json({ 'erreurs': "l'administrateur a été prvenu de votre requête." });
        return;
    } else {
        membre.mot_de_passe = toSha1(membre.mot_de_passe);
        membre.save()
            .then(membre => {
                res.status(200).json({ 'membre': 'Nouveau membre ajouté !!' });
            })
            .catch(err => {
                res.status(403).send("Echec ajout nouveau membre (in else)");
                console.log(err);
            });
    }
});
// Permet à l'utilisateur de se connecter
membre_routes.route('/membre/connexion').post(async function (req, res) {
    console.log("Dans connexion de l'utilisateur");
    let listeMembres = await Membre.find({ pseudo: req.body.pseudo });
    console.log("Dans connexion après la recherche");
    if (listeMembres.lenght == 0) { //Si la longeur de vaut zéro, c'est que le pseudo n'existe pas dans la base de données
        console.log("Dans le if: pas de membre pour le pseudo");
        res.status(403).send("Pseudo ou mot de passe incorrect");
    }
    else {
        membre = listeMembres[0]; // Nous permet de récupérer le premier membre trouvé
        console.log("membre.mot_de_passe" + membre.mot_de_passe);
        console.log("req.body.mot_de_passe" + toSha1(req.body.mot_de_passe));
        if (membre.mot_de_passe == toSha1(req.body.mot_de_passe)) { //On hache le mot de passe donné lors de la connexion pour savoir s'il correspond à celui de la base de donnée (qui est déjà haché)
            res.status(200).send("Pseudo et mot de passe corrects !!");
            console.log("Connexion réussie !");
        }
        else {
            console.log("Dans le else, mot de passe incorrect");
            res.status(403).send("Pseudo ou mot de passe incorrect");
        }
    }
});

// Affiche la liste des membres dans la base de donnée
membre_routes.route('/membre/liste').get(function (req, res) {
    Membre.find(function (err, membres) {
        if (err) {
            console.log(err);
        } else {
            res.json(membres);
        }
    });
});

// Affiche le profil d'un membre dans la base de donnée
membre_routes.route('/membre/profil/:id').get(function (req, res) {
    let id = req.params.id;
    console.log("Dans la route afficher mon profile.");
    console.log(id);
    Membre.find({ _id: id }).populate('groupes')
        .then(resultat => {
            res.json(resultat)
            console.log("mes resultats", resultat);
        })
        .catch((err) => {
            console.log("err:", err);
            res.status(403).json(err)
        });
});

// Supprimer totalement le profil d'un membre dans la base de donnée
membre_routes.route('/membre/supprimer/:id').get(function (req, res) {
    Membre.findByIdAndDelete(req.params.id, function (err, membre) {
        console.log(req.params.id)
        console.log('Dans la route supprimer membre.')
        if (!membre) {
            res.status(403).send("membre non trouve");
            console.log("membre non trouvé");
        } else {
            res.status(200).send("Membre supprimer");
            console.log("Membre supprimer");
        }
    })
})
//------------------------------------------------------------------------------------------------------------------------------------------
//ROUTES GROUPES
//http://localhost:4242/groupe/creation
groupe_routes.route('/creation').post(async function (req, res, membre) {
    console.log("je suis dans groupe création.");
    let groupe = new Groupe(req.body);
    async function transformerListePseudoEnListe_id(req) {
        
        //Adaptation à faire pour récupérer le liste des mebres en objectId à la place des login.
        console.log("req.body.membre_groupe_pseudonymes");
        console.log(req.body.membre_groupe_pseudonymes);
        console.log("groupe avant sauvegarde " + groupe);
        let liste_membre_groupe_pseudo = req.body.membre_groupe_pseudonymes;
        console.log("liste_membre_groupe_pseudo");
        console.log(liste_membre_groupe_pseudo);
        let liste_membre_groupe_object_id = [];
        for (let index = 0; index < liste_membre_groupe_pseudo.length; index++) {
            let pseudoMembre = liste_membre_groupe_pseudo[index];
            let membre = await Membre.findOne({ pseudo: pseudoMembre }).populate();
            liste_membre_groupe_object_id.push(membre._id);
        }
        return liste_membre_groupe_object_id;
    }
    liste_membre_groupe_object_id = await transformerListePseudoEnListe_id(req);
    console.log("transformerListePseudoEnListe_id = "+liste_membre_groupe_object_id);
    groupe.membres_groupe = liste_membre_groupe_object_id;
    let err = []
    //gestion des erreurs
    //let err = await funct.generateurErreursGroupeCreation(req, member);
    //console.log("serveur Groupe Création err = "+err+ err.length);
    if (err.length > 0) {
        res.status(403).json({ 'err': err })
        return;
    } else {
        groupe.date_c_g = Date.now();
        groupe.save()
            .then(async groupe => {
                for (let index = 0; index < liste_membre_groupe_pseudo.length; index++) {
                    let pseudoMembre = liste_membre_groupe_pseudo[index];
                    let membre = await Membre.findOne({ pseudo: pseudoMembre }).populate();
                    console.log(membre);
                    membre.groupes.push(groupe);
                    membre.save();
                }
                res.status(200).json({ 'route': '/creation', 'status': "OK", 'groupe': 'groupe ajouté avec succès' });
                //attention les redirects ne se font pas du côté server mais du côté component !!!! reférence create-memeber.component
            })
            .catch(err => {
                console.log("serveur Groupe Création err = " + err + err.length);
                res.status(403).send({ 'err': ["Erreur Technique"] });
            });

    }
});
// Affiche la liste des groupes dans la base de donnée
groupe_routes.route('/liste').get(async function (req, res) {
    let ListeGroupe = await Groupe.find().populate('membres_groupe').sort({ nom_groupe: -1 });
    let err = [];
    if (ListeGroupe.length == 0) {
        err.push("Il n'y a pas de groupes dans la base de donnée.");
        console.log(err);
        res.status(403).json({ 'route': 'groupe/liste', 'status': 'KO', 'err': err });
        return (err);
    } else {
        res.status(200).json({ 'status': 'OK', 'ListeGroupe': ListeGroupe });
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------
//FONCTIONS UTILES
// Fonction qui converti les mots de passes en sha1
function toSha1(password) {
    // On crée notre Hasher avec l'algo qu'on veux
    var shasum = crypto.createHash('sha1');
    // ce qu'on veux hasher
    shasum.update(password);
    // hex => Format de retour hex 012345679abcdef (base 16)
    return shasum.digest('hex');
}

//------------------------------------------------------------------------------------------------------------------------------------------

// Permet le lancement du serveur
app.listen(4242, function () {
    console.log('Connecté au serveur localhost:4242');
});