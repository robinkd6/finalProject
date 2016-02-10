var express = require('express');
var bodyParser = require('body-parser');
// var Airplane = require('../models/airplane');
var router = express.Router();
var watson = require('watson-developer-cloud');

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

router.route('/save')
.post(function(req, res) {
	res.send(req.body);
});

module.exports = router;