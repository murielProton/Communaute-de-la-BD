var mongoose = require('mongoose');
 Schema = mongoose.Schema

var EvenementSchema = new mongoose.Schema({
        nom: {
                type: String,
        },
        description: {
                type: String,
        }, 
        ville: {
                type: String,
        },        
        date: {
                type: Date,
        } ,
        cree_par: {
                type: String,
        },
        date_enregistrement :{
        type: Date,
        default:Date.now
        }              
});
var Evenement = mongoose.model('Evenement', EvenementSchema);
module.exports = Evenement;