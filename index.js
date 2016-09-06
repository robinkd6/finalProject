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
	  require('dotenv').config();

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
mongoose.connect("mongodb://localhost/knowYourself");
app.use(bodyParser.urlencoded({extended: true}));



app.use(bodyParser.json());
app.use('/api/personality', require('./routes/personality'));



// Make sure this is the last route loaded.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(3000);