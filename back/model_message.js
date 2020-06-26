var mongoose = require('mongoose');
 Schema = mongoose.Schema

var MessageSchema = new mongoose.Schema({
    pseudo: {
        type: String,
           },
    message: {
            type: String,
            }, 
    date: {
        type: Date,
        default:Date.now
          }                
});
var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;

