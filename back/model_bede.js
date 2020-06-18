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
        type: Boolean,
    },
    // couverture: {    
    //     type: Image,
    // },
    resume: {
        type: String,
    },
    derniere_modification: {
        type: String,
    },
    avis: [{type: Schema.Types.ObjectId, ref:'Avis'}] 
});
module.exports = mongoose.model('Bede', Bede);
