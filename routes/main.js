var express = require('express');
var router = express.Router();
var models = require("../models");
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/restricted', function(req, res) {
  if (req.user) {
    res.render('restricted');
  } else {
    req.flash('danger','You do not have permission to see this page');
    res.redirect('/');
  }
});


exports.gettodos = function(req, res) {
    models.Todo.findAll().then(function(todos){
        res.json(todos);
    });
};
 
exports.savetodos = function(req, res) {
    models.Todo.create({
        text: req.body.text,
        done: req.body.done
    }).then(function(todos){
        res.json(todos.dataValues);
    }).catch(function(error){
        console.log("ops: " + error);
        res.status(500).json({ error: 'error' });
    });
};

module.exports = router;