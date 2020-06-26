const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Bede = new Schema({

    serie: {
        type: String,
    },
    titre: {
        type: String,
    },
    tome: {
        type: Number,
    },
    scenariste: {
        type: Array,
    },
    dessinateur: {
        type: Array,
    },
    editeur: {
        type: String,
    }, 
    annee_parution: {
        type: Number,
    },
    jaime: {
        type: Number,
        default: 0,
    },
    // couverture: {    
    //     type: Image,
    // },
    resume: {
        type: String,
        default: "Pas de résumé"
    },
    // Le pseudo de la dernière personne à avoir apporter une modification pour repérer ceux qi font n'importe quoi
    derniere_modification: { 
        type: String,
    },
    // A FAIRE: si tous les champs sont rempli, passe en true pour que l'admin puisse vérifier les info et le passer en non modifiable
    complet: { 
        type: Boolean,
        default: false,
    },
    // A FAIRE: l'admin recevra une notification si le model est complet pour le vérifier pour empêcher de futurs modifications
    modifiable: {
        type: Boolean,
        default: true,
    },
    // A FAIRE permettra à l'administrateur de consulter les derniers ajouts
    enregistre_le: {
        type: Date,
        default: Date.now,
    },
    avis: [{type: Schema.Types.ObjectId, ref:'Avis'}],
    collections: [{type: Schema.Types.ObjectId, ref:'Collection'}]
});
module.exports = mongoose.model('Bede', Bede);
