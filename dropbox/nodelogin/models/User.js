var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/cmpe273'); // connect to our database


var UserSchema   = new Schema({

    firstname: String,
    lastname: String,
    password: Object,
    email: String,
    contactno: String,
    interests: String,
    lastlogintime: Date,
    userlog:Array
});

module.exports = mongoose.model('User', UserSchema);
