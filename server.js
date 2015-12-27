var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// Express configuration
//  ------------------------------
// Sets the configuration to MongoDB

mongoose.connect("mongodb://localhost/Mapster");

//Logging and parsing
//  ------------------------------

// sets the statuc files location to public
app.use(express.static(__dirname + '/public'));
// Use Bower Components
app.use('/bower_components', express.static(__dirname + '/bower_components'));
// log with Morgan
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json());
//parse application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// allows bodyParser to look at raw text
app.use(bodyParser.text());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

//Routes
//  ------------------------------
 require('./app/routes.js')(app);

// Listen
//  ------------------------------
app.listen(port);
console.log('App lisetning on port ' + port);
