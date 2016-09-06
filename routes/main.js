var express   = require('express');
var router    = express.Router();
var models    = require("../models");
var ctrlUsers = require("../controllers/users.controller.js");
router.get('/', function(req, res) {
  res.render('index');
});


//authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('users/login')
  .post(ctrlUsers.login);

module.exports = router;