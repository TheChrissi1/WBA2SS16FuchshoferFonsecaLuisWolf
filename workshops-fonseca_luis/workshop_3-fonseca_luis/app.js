var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var fs = require( 'fs' );
var redis = require( 'redis' );
var db = redis.createClient(); //Creates a new Client

var serverPort = 1337;
var anime_path = './profil.json';
var user_path  = './user.json';


/****************************************
 *	/anime									GET
 *	/anime/{name}						GET
 *													DELETE
 *	 												POST
 *													PUT
 *	/benutzer								GET
 *	/benutzer/{id}					GET
 *													DELETE
 *													POST
 *													PUT
 *	/benutzer/{id}/stats		GET
 *													POST
 *													PUT
 *	/genre									GET
 *	/ref										GET
 *	/ref/{id}								GET
 *													DELETE
 *													POST
 *													PUT
 *	/filter/{querry-param}	GET
 *	/login
 ***************************************/

/***************************************
 *	BASIC FUNCTIONS
 **************************************/
//Anime Sort [OK]
function anime_sort(err){
	if( err ) throw err;
	var data = require( anime_path );
	data.anime.sort(function(a, b){
		//compare two values
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		return 0;
	});
	data = JSON.stringify( data, null, 4 );
	fs.writeFile( anime_path, data, function(err){
		if(err) throw err;
	});
}
//Search Anime [OK]
function returnAnime (string) {
	string = string.toLowerCase();
	string = string.replace(/-/g,' ');
	var anime = require(anime_path);
	var return_value = -1;
	anime = anime.anime;
	for(var i = 0; i<anime.length; i++){
		var tmp = anime[i].name;
		tmp = tmp.toLowerCase();
		if(string == tmp){
			return_value = i;
		}
	}
	return return_value;
}
//Search User [OK]
function returnUser (string) {
		string = string.toLowerCase();
    var users = require(user_path);
    var return_value = -1;
		users = users.user;
    for (var i = 0; i<users.length; i++) {
			var tmp = users[i].id;
			tmp = tmp.toLowerCase();
			if(string == tmp){
				return_value = i;
			}
    }
		return return_value;
}

/************************************************
 *	SERVER SPECIFIC
 ***********************************************/

//Index [OK]
app.get( '/', jsonParser, function(req, res){
	res.send('Das ist der Index');
});

//Liste Aller Anime {GET, POST} [OK, FAIL]
app.get( '/anime/' , jsonParser, function(req, res){
	var data = require( anime_path );
	res.send(data.anime);
})
app.post( '/anime/', jsonParser, function(req, res){
	var data = require( anime_path );
	data = data.anime;
	var body = req.body;

	var search = returnAnime(body.name);
	if( search == -1){
		anime.push(body);
	}
	anime_sort();
	res.send(data.name + "successfully added.");
});

//Spezifischer Anime {GET, DELETE, PUT} [FAIL, FAIL, FAIL]
app.get( '/anime/:anime_name', jsonParser, function(req, res){
	var data = require( anime_path );
	data = data.anime;
	var querry = req.params.anime_name;
	var search = returnAnime(querry);
	if(search >= 0){
		res.send(anime[erg]);
	}
});
app.delete( '/anime/:anime_name', jsonParser, function(req, res){
	var data = require( anime_path )
	array.splice(i,1);

});
app.put( '/anime/:anime_name', jsonParser, function(req, res){

});

//Liste Aller Benutzer {GET, POST} [FAIL, FAIL]
app.get( '/benutzer/', jsonParser, function(req, res){

});
app.post( '/benutzer/:id', jsonParser, function(req, res){

});

//Spezifischer Benutzer {GET, DELETE, POST, PUT} [FAIL, FAIL, FAIL]
app.get( '/benutzer/:id', jsonParser, function(req, res){

});
app.delete( '/benutzer/:id', jsonParser, function(req, res){

});
app.put( '/benutzer/:id', jsonParser, function(req, res){

});

//Spezifische Benutzerstatistiken {GET, POST, PUT} [FAIL, FAIL, FAIL]
app.get( '/benutzer/:id/stats', jsonParser, function(req, res){

});
app.post( '/benutzer/:id/stats', jsonParser, function(req, res){

});
app.put( '/benutzer/:id/stats', jsonParser, function(req, res){

});

//Liste Aller Genre {GET} [FAIL]
//Liste Aller Externen Seiten {GET} [FAIL]
//Spezifische Externe Seite {GET, DELETE, POST, PUT} [FAIL]
//filter???
//login???



app.listen(serverPort, function(){
	console.log('Server running on Port: ' + serverPort);
	db.on('connect', function(){
		console.log('connected');
	});
});
