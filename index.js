var express = require('express');
var bodyParser = require('body-parser');
// var routes = require('./routes');
var models = require("./models");
var session = require('express-session');
// var passport = require('passport');
// var strategies = require('./config/strategies');
var path = require('path');
var app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.set('view-engine', 'ejs');
app.use(bodyParser.json());
app.use(session({ secret: process.env.PASSWORD, resave: false, saveUninitialized: true }));
// Load middleware
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(strategies.serializeUser);
// passport.deserializeUser(strategies.deserializeUser);
// passport.use(strategies.localStrategy);

app.use('/login', require('./routes/login.controller'));
app.use('/signup', require('./routes/signup.controller'));



// config
// passport.use(new FacebookStrategy({
//   clientID: config.facebook.clientID,
//   clientSecret: config.facebook.clientSecret,
//   callbackURL: config.facebook.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//       return done(null, profile);
//     });
//   }
// ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/personality', require('./routes/personality'));




// Make sure this is the last route loaded.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);