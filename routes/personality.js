var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../models');
var router = express.Router();
var watson = require('watson-developer-cloud');
require('dotenv').config()


router.route('/analyze/:summary')
.get(function(req, res) {
	var personality_insights = watson.personality_insights({
		id		: 'me',
		source	: 'text',
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		version : 'v2'
	});

	var my_profile = req.params.summary;

	personality_insights.profile({ text: my_profile },
	function (err, profile) {
	  if (err)
	    res.send(err);
	  else
	  	res.send(profile);
	});
});

router.route('/analyze/:message')
.get(function(req, res) {
	var document_conversion = watson.document_conversion({
	username: process.env.TONE_USERNAME,
	password: process.env.TONE_PASSWORD,
	version: 'v2'
});

	var my_message = req.params.message;

	document_conversion.tone({ text: my_message },
	function (err, tone) {
		if(err)
			res.send(err);
		else
			res.send(tone);
	});
});

router.route('/save')
.post(function(req, res) {
	var stringified = JSON.stringify(req.body);
	db.results.findOrCreate({
	    where: {
	      user_id: 1
	    },
	    defaults: {
	      data: stringified
	    }
	}).spread(function(result, created) {
	    res.send(result.get());
	});
});

router.route('/:user_id')
.get(function(req, res) {
	db.results.find({ where: {user_id: req.params.user_id}})
	.then(function(result){
		res.send(result.get());
	})
});

module.exports = router;