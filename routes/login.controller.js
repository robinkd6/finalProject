var express = require('express');
var request = require('request');
var passport = require('passport');
var router = express.Router();

router.route('/login')
    .post(function(req,res){
        passport.authenticate('local', function(err, user, info){
            if(user){
                req.login(user, function(err){
                    if(err) throw err;
                    req.redirect('/');
                });
            } else {
                res.redirect('/login');
            }
        })(req,res);
    });

module.exports = router; 