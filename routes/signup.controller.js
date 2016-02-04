var express = require('express');
var router = express.Router();
var request = require('request');
var db  = require('../models');

router.post('/', function (req, res) {
    console.log('i made it!', req.body);
    // db.user.findOrCreate({
    //     where: {email: req.body.email},
    //     defaults : {
    //         password: req.body.password,
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName
    //     }
    // }).spread(function(user,created){
    //     if(created){
    //         req.login(user, function(err){
    //             if(err) throw err;
    //             res.send(200);
    //         });
    //     } else {
    //         res.send(400);
    //     }
    // }).catch(function(err){
    //     req.send(500);
    // });
});

module.exports = router; 