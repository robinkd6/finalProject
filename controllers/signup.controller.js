var express = require('express');
var router = express.Router();
var request = require('request');
var db  = require('../models');

router.post('/signup', function (req, res) 
// {
//     res.send("REGISTER POST ROTUE");
// });

{
    console.log('Yes, I work', req.body);
    //var newDob = new Date(req.body.dob);
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults : {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob
        }
    }).spread(function(user, created){
        console.log('created ----------------- '+ created);
        if(created){
            req.login(user, function(err){
                console.log('inside if created');
                if(err) throw err;
                console.log('past if err');
                res.send(200);
            });
        } else {
            res.sendStatus(400);
        }
    })
    .catch(function(err){
        // console.log('WTF');
        res.sendStatus(500);
    });
});

module.exports = router; 