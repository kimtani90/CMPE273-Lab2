var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var GroupSchema   = new Schema({

    groups:Array

});

module.exports = mongoose.model('Group', GroupSchema);
