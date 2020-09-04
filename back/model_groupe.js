const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Groupe = new Schema({

    nom_groupe: {
        type: String,
    },
    admin_groupe: {
        //si admin du groupe supprime son compte trier la liste de membre par date d'entrée  puis par pseudonyme et prendtre membres[0]
        type: String,
    },
    prive: {
        type: Boolean,
    },
    date_c_g: {
        type: Date,
        default: Date.now
    },
    //array d'objet type {date d'ajout : date.now(), membre : pseudonyme du membre}
    membres_groupe: [{ type: Schema.Types.ObjectId, ref: 'Membre' }],

});
module.exports = mongoose.model('Groupe', Groupe);