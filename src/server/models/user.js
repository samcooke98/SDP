var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {type: String, required: true},
    name: String,
    journals: [{type:Schema.ObjectId, ref:'Journal'}] //TODO: Ensure unique-ness ($addToSet)
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);