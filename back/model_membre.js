const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Membre = new Schema({

    pseudo: { 
        type: String, 
    },

    email: { 
        type: String, 
    },

    mot_de_passe: { 
        type: String, 
    },

    date_de_naissance: {
        type: Date,
    },

    date_inscription: {
        type: Date,
        default: Date.now
    },
    derniere_connexion: {
        type: Date,
    },

    ville: {
        type: String,
    },

    // avatar: {
    //     data: Buffer,
    //     Type: String,
    // },

    admin: { 
        type: Boolean,
        default: false // A mettre true si on veux créer un admin et commenter les lignes 26 et 119 dans le component inscription 
    },

    banni: {
        type: Boolean,
        default: false
    },

    groupes: [{ type: Schema.Types.ObjectId, ref: 'Groupe'}]
});
module.exports = mongoose.model('Membre', Membre);
