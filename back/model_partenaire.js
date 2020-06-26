var mongoose = require('mongoose');
 Schema = mongoose.Schema

var PartenaireSchema = new mongoose.Schema({
    nom: {
        type: String,
           },
    adresse: {
            type: String,
             },
    ville: {
        type: String,
            },
    secteur: {
        type: String,
           }, 
    contact: {
        type: String,
          }, 
    email_contact: {
        type: String,
               }, 
    tel_contact: {
        type: String,
             }, 
    debut_pub: {
            type: Date,
        },
    fin_pub: {
            type: Date,
        },  
    date_inscription: {
            type: Date,
            default: Date.now
        },            
    // lien: {
    //     type: URL,
    //        }, 
    // pub: {
    //     type: Image,
    //       }                
});
var Partenaire = mongoose.model('Partenaire', PartenaireSchema);
module.exports = Partenaire;