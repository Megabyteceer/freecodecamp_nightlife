'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollAnswer = new Schema({

       pollId: Schema.Types.ObjectId,
       name: String,
       rate: { type: Number, default: 0 }

});

module.exports = mongoose.model('PollAnswer', PollAnswer);
