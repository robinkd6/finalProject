var express = require('express');
var app = express();

var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
	secret : new Buffer('9wkmbdwh6jJiZWSE8r6NVjjckv0Ksd20Nj5b4r0b9ixXgV6sRmzUnhQ1hyUz064K', 'base64'),
	audience: 'hmL3QcEYooWu2nQLIFTkZjyUyQ9eRpRy'
});

app.get('/api/public', function(req, res) {
	res.json({ message: "Hello from a public endpoint! No need for authentication"});
});

app.get('/api/private', authCheck, function(req, res) {
	res.json({ message: "Hello from a private endpoint! You NEED for authentication"});
});

app.listen(3001);
console.log("Listening on localhost:3001");