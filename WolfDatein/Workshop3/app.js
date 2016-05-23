var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var fs = require( 'fs' );

var redis = require('redis');
var client = redis.createClient();

var serverPort = 1337;

client.on('connect', function() {
    console.log('connected');
});


client.hmset('benutzer', {
    'user1': 'Peter',
    'user2': 'Hans',
    'user3': 'Det'
});


app.get('/benutzer/user2', jsonParser, function(req, res){

  client.hget('./benutzer.json', 'user2',function(err, reply) {
    var benutzer = require('./benutzer.json');
    var ausgabe = benutzer.user2;
    res.send(reply);
      console.log(reply);
      console.log(ausgabe);

  });


    console.log('JO');
});



app.listen(serverPort, function(){
	console.log('Server running on Port: ' + serverPort);
});
