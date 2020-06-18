const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Avis = new Schema({

    auteur: { 
        type: String, // _id de l'auteur
    },

    avis: {
        type: String,
    },

    date: { 
        type: Date,
        default: Date.now, 
    },

});
module.exports = mongoose.model('Avis', Avis);
