'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
       ownerId: String,
       name: String

});

module.exports = mongoose.model('Poll', Poll);
