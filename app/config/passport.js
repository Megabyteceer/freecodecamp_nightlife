'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findOne({'id':id}, function (err, user) {
			done(err, user);
		});
	});
	
	
	
	function auth_inside(profile, done){
		
		process.nextTick(function () {
			User.findOne({'id': profile.provider+':'+profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (!user) {
					user = new User();
					user.provider=profile.provider;
					user.id = profile.provider+':'+profile.id;
				}
					
				user.displayName = profile.displayName;

				user.save(function (err) {
					if (err) {
						throw err;
					}

					return done(null, user);

				})
			});
		});
	}
	
	passport.use(new GitHubStrategy(configAuth.githubAuth, 
	function (token, refreshToken, profile, done) {
		
		return auth_inside(profile, done);
		

	}));
	
	
	passport.use(new GoogleStrategy(configAuth.googleAuth,
	  function(accessToken, refreshToken, profile, done) {
	  	
	   	return auth_inside(profile, done);
	  }
	));

	
	
	
	
	
};
