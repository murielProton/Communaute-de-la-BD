const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Groupe = new Schema({

    nomgroupe: {
        type: String,
    },

    administrateur: {
        type: String,
    },

    prive: {
        type: Boolean,
    }, 

    date: {
        type: Date,
        default:Date.now
    },

    membres: [{type: Schema.Types.ObjectId, ref:'Membre'}],
                  
});
module.exports = mongoose.model('Groupe', Groupe);