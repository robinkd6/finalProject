var express = require('express');
var router = express.Router();
var request = require('request');
var db  = require('../models');

router.post('/', function (req, res) {
    console.log('Yes, I work', req.body);
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults : {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    }).spread(function(user,created){
        console.log('created ----------------- '+ created);
        if(created){
            req.login(user, function(err){
                console.log('inside if created');
                if(err) throw err;
                console.log('past if err');
                res.send(200);
            });
        } else {
            res.send(400);
        }
    });
    // .catch(function(err){
        // console.log('WTF');
        // res.sendStatus(500);
    // });
});

module.exports = router; 