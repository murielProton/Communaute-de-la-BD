const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Avis = new Schema({

    auteur: { 
        type: String, // _id de l'auteur
    },

    contenu: {
        type: String,
    },

    serie_bede: { // Permet de savoir pour quelle bédé (et quel tome), l'avis a été écrit lors de l'affichage de tous les avis
        type: String,
    },

    tome_bede: {
        type: Number,
    },

    date: { 
        type: Date,
        default: Date.now, 
    },

});
module.exports = mongoose.model('Avis', Avis);
