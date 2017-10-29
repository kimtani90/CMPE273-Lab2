var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;

var UserLogSchema   = new Schema({

    user: String,
    userlog:Array
});

module.exports = mongoose.model('UserLog', UserLogSchema);
