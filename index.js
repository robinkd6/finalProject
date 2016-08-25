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

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost/knowYourself");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
	secret: "Black garlic ramen is amazing",
	resave: false,
	saveUninitialized: false
}));


app.use(bodyParser.json());
app.use('/api/personality', require('./routes/personality'));

// app.use(session({ secret: 'iloveDogs', resave: false, saveUninitialized: true }));
// Load middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport.use(strategies.localStrategy);

//AUTH Routes
app.get('/signup', isLoggesIn, function(req, res){
	res.render("signup");
});

//handle user signup
app.post('/signup', function (req, res) 
{

    req.body.username
    req.body.firstName
    req.body.lastName
    req.body.email
    req.body.password
    User.register(new User({username: req.body.username, firstname: req.body.firstName, lastname: req.body.lastName, email: req.body.email}),
    	req.body.password, function(err, user) {
    		if(err) {
    			console.log(err);
    			return res.redirect('/signup');
    		}
    		//logs user in
    		passport.authenticate("local")(req, res, function(){
    			res.redirect("/analyze");
    		});
    	});
});

//LOGIN ROUTES
app.get("/login", function(req, res)
{
	res.render("login");
});
//Middleware + login logic
app.post("/login", passport.authenticate("local", 
{
	successRedirect: "/analyze",
	failureRedirect: "login"
}), function(req, res) {
	console.log("works");

});

app.get('/logout', function(req, res)
{
	var _LoggedIn = (req.isAuthenticated() ? true : false);
});

function isLoggesIn(req, res, next)
{
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}




// Make sure this is the last route loaded.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);