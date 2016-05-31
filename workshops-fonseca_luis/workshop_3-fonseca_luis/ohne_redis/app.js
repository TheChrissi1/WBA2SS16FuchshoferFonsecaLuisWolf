/*********************************
 *															 *
 *	Basic Methods without Redis	 *
 *															 *
 *********************************/


var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var fs = require( 'fs' );
var redis = require( 'redis' );
var db = redis.createClient(); //Creates a new Client

var serverPort = 1337;
var anime_path = './anime.json';
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
//User Sort [OK]
function user_sort(err){
	if( err ) throw err;
	var data = require( user_path );
	data.users.sort(function(a, b){
		return a.user_id - b.user_id;
	})
	data = JSON.stringify( data, null, 4);
	fs.writeFile( user_path, data, function(err){
		if( err ) throw err;
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
//Search User by Name [OK]
function returnUser (string) {
		string = string.toLowerCase();
    var data = require(user_path);
    var return_value = -1;
		data = data.users;
    for (var i = 0; i<data.length; i++) {
			var tmp = data[i].username;
			tmp = tmp.toLowerCase();
			if(string == tmp){
				return_value = i;
			}
    }
		return return_value;
}
//Search User by ID [OK]
function returnUserID (int) {
    var data = require(user_path);
    var return_value = -1;
		data = data.users;
    for (var i = 0; i<data.length; i++) {
			var tmp = data[i].user_id;
			if(int == tmp){
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

//Liste Aller Anime {GET, POST} [OK, OK]
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
		data.push(body);
		res.send(body.name + " successfully added.");
	} else {
		res.send(body.name + " already in the list.");
	}
	anime_sort();
});

//Spezifischer Anime {GET, DELETE, PUT} [OK, OK, OK]
app.get( '/anime/:anime_name', jsonParser, function(req, res){
	var data = require( anime_path );
	data = data.anime;
	var querry = req.params.anime_name;
	var search = returnAnime(querry);
	if(search >= 0){
		res.send(data[search]);
	}
});
app.delete( '/anime/:anime_name', jsonParser, function(req, res){
	var data = require( anime_path )
	data = data.anime;
	var querry = req.params.anime_name;
	var search = returnAnime(querry);
	if(search != -1){
		data.splice(search, 1);
		res.send("Successfully deleted " + querry);
	} else {
		res.send("Anime was not in List");
	}
	anime_sort();
});
app.put( '/anime/:anime_name', jsonParser, function(req, res){
	var data = require( anime_path );
	data = data.anime;
	var body = req.body;
	var querry = req.params.anime_name;
	var search = returnAnime(querry);
	if(search != -1){
		data[search] = body;
		res.send("Successfully changed " + body.name);
	} else {
		res.send(body.name + " not in List");
	}
	anime_sort();
});

//Liste Aller Benutzer {GET, POST} [OK, OK]
app.get( '/user', jsonParser, function(req, res){
		var data = require( user_path );
		res.send(data.users);
});
app.post( '/user', jsonParser, function(req, res){
	var data = require( user_path );
	data = data.users;
	var body = req.body;
	var search = returnUser(body.username);
	if( search == -1){
		var id_counter = data[data.length-1].user_id;
		data.push(body);
		id_counter++;
		data[data.length-1].user_id = id_counter;
		res.send("Successfully created User " + body.username + " with ID: " + id_counter);
	} else {
		res.send("Username was already taken");
	}
	user_sort();
});

//Spezifischer Benutzer {GET, DELETE, POST, PUT} [OK, OK, OK]
app.get( '/user/:id', jsonParser, function(req, res){
	var data = require( user_path );
	data = data.users;
	var querry = req.params.id;
	var search = returnUserID(querry);
	if(search >= 0){
		res.send(data[search]);
	}
});
app.delete( '/user/:id', jsonParser, function(req, res){
	var data = require( user_path );
	data = data.users;
	var querry = req.params.id;
	var search = returnUserID(querry);
	if(search != -1){
		data.splice(search, 1);
		res.send("Successfully deleted UserID: " + querry);
	} else {
		res.send("User not Found");
	}
	user_sort();
});
app.put( '/user/:id', jsonParser, function(req, res){
	var data = require( user_path );
	data = data.users;
	var body = req.body;
	var querry = req.params.id;
	var search = returnUserID(querry);
	if(search != -1){
		data[search].name = body.name;
		data[search].username = body.username;
		data[search].email = body.email;
		res.send("Successfully changend User with ID: " + querry);
	} else {
		res.send("User with ID: " + querry + " not Found");
	}
	user_sort();
});

//Spezifische Benutzerstatistiken {GET, POST, PUT} [FAIL, FAIL, FAIL]
app.get( '/user/:id/stats', jsonParser, function(req, res){

});
app.post( '/user/:id/stats', jsonParser, function(req, res){

});
app.put( '/user/:id/stats', jsonParser, function(req, res){

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
