var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var fs = require( 'fs' );
var redis = require( 'redis' );


var serverPort = 1337;


app.listen(serverPort, function(){
	console.log('Server running on Port: ' + serverPort);
});
