'use strict';

var Poll = require('../models/poll.js');
var PollAnswer = require('../models/pollAnswer.js');

function PollHandler () {
	
	
	function pollIsVoted(req, id){
		if(typeof(req.session.answered)==='undefined')
			return false;
			
		return(req.session.answered[id]);
	}
	
	function markPollAsVoted(req, id){
		if(typeof(req.session.answered)==='undefined'){
			req.session.answered={};
		}
		req.session.answered[id]=true;
	}
	
	
	
	this.postPoll = function (req, res) {
	
		var newPoll = new Poll();
		newPoll.ownerId = req.user.id;
		newPoll.name = req.body.name;
		newPoll.save();
		
		req.body.answers.forEach(function(a){
			
			var polAnswer = new PollAnswer();
			polAnswer.pollId = newPoll._id;
			polAnswer.name = a.name;
			polAnswer.save();
		})
		res.end('ok');
	};
	
	this.getPolls = function (req, res) {
		Poll.
		  find({
		    ownerId: req.user.id
		  }).
		  select({ name: 1}).
		  exec(function(err, polls){
		  	if(err)	{
		  		res.end(err)
		  	} else {
		  		res.json(polls);
		  	}
		  });
	}
	
	this.getPoll = function (req, res) {
		Poll.
		  findOne({
		    _id: req.params.id
		  }).
		  select({ name: 1}).
		  exec(function(err, poll){
		  	if(err)	{
		  		res.end(err.message)
		  	} else {
		  		
		  		PollAnswer.find({
				    pollId: req.params.id
				  }).
				  select({ name: 1, rate:1}).
				  exec(function(err, answs){
				  	if(err)	{
				  		res.end(err)
				  	} else {
				  		res.json({name: poll.name, answered:pollIsVoted(req, req.params.id), id:poll._id, answers: answs});
				  	}
				  })
		  	}
		  });
	}
	
	this.postAnswer = function (req, res) {
		
		PollAnswer.findOne({ '_id': req.params.id }, { 'pollId': true, 'rate':true })
			.exec(function (err, pollAnswer) {
				if (err) { throw err; }
				
				var pollId = (pollAnswer.pollId);
				
				if(pollIsVoted(req, pollId)){
					res.end('You already voted this poll.');
				} else {
					markPollAsVoted(req, pollId);
					pollAnswer.rate++;
					pollAnswer.save();
					res.end('ok');
				}
				
			});
		
		
		
		
	}
	
	
	
	this.deletePoll = function (req, res) {
		Poll.
		  findOne({
		    _id: req.params.id
		  }).
		  select({ name: 1}).
		  exec(function(err, poll){
		  	if(err)	{
		  		res.end(err.message)
		  	} else {
		  		
		  		PollAnswer.find({
				    pollId: req.params.id
				  }).
				  select({ name: 1, rate:1}).
				  exec(function(err, answs){
				  	if(err)	{
				  		res.end(err)
				  	} else {
				  		poll.remove();
				  		answs.forEach(function (a) {
				  			a.remove();
				  		});
				  		res.end('ok');
				  	}
				  })
		  	}
		  });
	}

}

module.exports = PollHandler;
