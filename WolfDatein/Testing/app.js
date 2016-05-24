var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var fs = require( 'fs' );


var serverPort = 1337;




app.get('/anime/shingeki-no-kyojin', jsonParser, function(req, res){
	var anime = require('./profil.json');
	anime = anime.anime;
	res.send(anime);
});



app.listen(serverPort, function(){
	console.log('Server running on Port: ' + serverPort);
});