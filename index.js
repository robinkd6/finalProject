var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	path = require('path'),
	passport = require('passport'),
	config = require('./oauth.js'),
	FacebookStrategy = require('passport-facebook').Strategy,
	app = express();

app.use(express.static(__dirname + '/public'));


app.get('/signup', function(req, res){
  res.send('Hello World');
});

app.get('/login', function(req, res){
  res.send('login');
});


// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Make sure this is the last route loaded.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);