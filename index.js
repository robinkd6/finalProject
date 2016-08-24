var express       				= require('express'),
	  bodyParser    				= require('body-parser'),
	  mongoose 							= require('mongoose'),
	  models        				= require("./models"),
	  User 									= require("./models/users"),
	  session       				= require('express-session'),
	  passport      				= require('passport'),
	  LocalStrategy 				= require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  strategies 						= require('./config/strategies'),
	  path          				= require('path'),
	  app           				= express();

//  routes        = require('./routes'),
//  
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost/knowYourself");

app.use(require("express-session")({
	secret: "Black garlic ramen is amazing",
	resave: false,
	saveUninitialized: false
}));


app.use(bodyParser.json());
app.use(session({ secret: 'iloveDogs', resave: false, saveUninitialized: true }));
// Load middleware
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(strategies.localStrategy);

app.use('/login', require('./routes/login.controller'));
app.use('/signup', require('./routes/signup.controller'));

//Auth Routes
app.get('/signup', function(req, res){
	res.render()
})

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