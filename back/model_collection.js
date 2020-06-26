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

    // liste: { 
    //     type: Array, 
    //     default: [],
    // },
    bedes: [{type: Schema.Types.ObjectId, ref:'Bede'}]
});
module.exports = mongoose.model('Collection', Collection);
