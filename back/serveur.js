const mongoose = require('mongoose');

let Membre = require('./model_membre'); // Permet d'utiliser le model Membre
let Groupe = require('./model_groupe'); // Permet d'utiliser le model Groupe

const express = require('express');
const app = express();

const membre_routes = express.Router(); // Route pour les membres

const bodyParser = require('body-parser'); // Permet de découper les informations envoyées depuis le front pour être traitées par le back
const cors = require('cors'); // Facilite la gestion des routes

const crypto = require('crypto') // Converti les mots de passe en sha1

app.use( bodyParser.json() );       // Pour le support des JSON-encoded bodies
app.use(bodyParser.urlencoded({     // Pour le support des URL-encoded bodies
    extended: true
})); 

app.use(cors()); // Permet d'utiliser cors
app.use(membre_routes); // Permet d'utiliser les routes pour les membres

mongoose.connect('mongodb://localhost/CRAM', {useNewUrlParser: true});

// Ma connexion à la base de données doit être faite dans ce fichier. Sinon, le programme enverra un message d'erreur: "Membre is not a constructor"
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur de connexion:'));
db.once('open', function() {
    console.log('connecté à la base de données CRAM');
    
});

//------------------------------------------------------------------------------------------------------------------------------------------

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
membre_routes.route('/membre/inscription').post(function(req, res){ 

    console.log("Dans création utilisateur");
    console.log("req.body", req.body);
    let membre = new Membre(req.body);

    membre.mot_de_passe = toSha1(membre.mot_de_passe);
    membre.save()
        .then(membre => {
            res.status(200).json({'membre': 'Nouveau membre ajouté !!'});
        })
        .catch(err => {
            res.status(400).send("Echec ajout nouveau membre (in else)");
            console.log(err);
        });
});

//------------------------------------------------------------------------------------------------------------------------------------------
// Donne la liste des membres dans la base de donnée
membre_routes.route('/membre/liste').get(function(req, res){ 
        Membre.find(function(err, membres) {
            if (err) {
                console.log(err);
            } else {
                res.json(membres);
            }
        });
    });
//------------------------------------------------------------------------------------------------------------------------------------------
// Donne le profil d'un membre dans la base de donnée
membre_routes.route('/membre/profil/:id').get(function(req, res){ 
        let id = req.params.id;
        console.log("doing monprofil");
        console.log(id);
        Membre.find({ _id: id }).populate('groupes')
        .then(result=>{
            res.json(result)
            console.log("mes results",result);
        })
        .catch((error)=>{
            console.log("error:",error);
            res.status(405).json(error)
        });
     }); 
     //------------------------------------------------------------------------------------------------------------------------------------------
     // Supprime totalement le profil d'un membre dans la base de donnée
     membre_routes.route('/membre/supprime/:id').get(function(req, res){ 
           Membre.findByIdAndDelete(req.params.id , function(err, membre){
           console.log(req.params.id)
           console.log('carreau')
                if(!membre) {
                    res.status(404).send("membre non trouve");
                    console.log("membre non trouvé");
                }  else {
                    res.status(200).send("Membre supprime");
                console.log("Membre supprime");
            }
            })
        })

//------------------------------------------------------------------------------------------------------------------------------------------
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