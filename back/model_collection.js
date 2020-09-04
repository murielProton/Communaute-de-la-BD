const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Collection = new Schema({

    proprietaire: { 
        type: String, 
    },

    date: { 
        type: Date,
        default: Date.now, 
    },

    dernier_ajout: {
        type: Date,
    },

    liste: { 
        type: Array, 
        default: [],
    },


});
module.exports = mongoose.model('Collection', Collection);
