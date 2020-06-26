var mongoose = require('mongoose');
 Schema = mongoose.Schema

var DiscussionSchema = new mongoose.Schema({
    prive:{
        type: Boolean,
           },
    titre: {
        type: String,
           },
    groupe: {
            type: String,
              },
    messages: [{type: Schema.Types.ObjectId, ref:'Message'}],
    date: {
            type: Date,
            default:Date.now
            } 
});
var Discussion = mongoose.model('Discussion', DiscussionSchema);
module.exports = Discussion;
