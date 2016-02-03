var express = require('express');
// var Airplane = require('../models/airplane');
var router = express.Router();
var watson = require('watson-developer-cloud');



router.route('/')
.get(function(req, res) {

	var personality_insights = watson.personality_insights({
		id: 'me',
		source: 'text',
		username: 'aa33bbd4-50f7-4daf-8236-72c7ea890a18',
		password: 'Z8RVlKJ7WxDl',
		version: 'v2'
	});

	var my_profile = "Call me Ishmael. Some years ago-never mind how long precisely-having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off-then, I account it high time to get to sea as soon as I can.";

	personality_insights.profile({ text: my_profile },
	function (err, profile) {
	  if (err)
	    res.send(err)
	  else
	  	res.send(profile);
	});





});

module.exports = router;