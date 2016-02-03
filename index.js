var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	path = require('path'),
	passport = require('passport'),
	config = require('./oauth.js'),
	FacebookStrategy = require('passport-facebook').Strategy,
	app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view-engine', 'ejs');

app.get('/signup', function(req, res){
  res.render('views/signup')
  
});

app.get('/login', function(req, res){
 
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

app.use('/api/personality', require('./routes/personality'));

// Make sure this is the last route loaded.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000);