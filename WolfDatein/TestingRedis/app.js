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

	db.keys('anime:*',function(err,rep) {

		var animes = [];

		if (rep.length == 0) {
			res.json(animes);
			return;
		}

		db.mget(rep, function(err,rep) {
				rep.forEach(function(val){
				animes.push(JSON.parse(val));
			});

			animes = animes.map(function(animes){
				return {id: animes.id, name: animes.name};
			});
			res.json(animes);
		});
	});
});

app.post( '/anime', jsonParser, function(req, res){
	var newAnime = req.body;

	db.incr('id:anime', function (err, rep) {

		newAnime.id = rep;
		db.set('anime:'+newAnime.id, JSON.stringify(newAnime), function(err, rep) {
			res.json(newAnime);
		});
	});
});

//Spezifischer Anime {GET, DELETE, PUT} [OK, OK, OK]
app.get( '/anime/:id', jsonParser, function(req, res){

	db.get('anime:'+req.params.id, function(err, rep) {

		if (rep) {
			res.type('json').send(rep);
		} else {
			res.status(404).type('text').send('Anime not found!');
		}
	});

});
app.delete( '/anime/:id', jsonParser, function(req, res){

	db.del('anime:'+req.params.id, function(err, rep){
		if (rep == 1){
			res.status(200).type('text').send('Anime successfully deleted');
		}  else {
			res.status(404).type('text').send('Anime not found!');
		}
	});
});

app.put( '/anime/:id', jsonParser, function(req, res){

	db.exists('anime:'+req.params.id, function(err, rep) {
		if (rep == 1) {
			var updatedAnime = req.body;
			updatedAnime.id = req.params.id;

			db.set('anime:' + req.params.id, JSON.stringify(updatedAnime), function(err, rep) {
				res.json(updatedAnime);
			});
		} else {
			res.status(404).type('text').send('Anime already exists!');
		}
	});
});

//Liste Aller Benutzer {GET, POST} [OK, OK]


app.use(bodyParser.json());

app.get( '/user', jsonParser, function(req, res){

	db.keys('user:*',function(err,rep) {

		var users = [];

		if (rep.length == 0) {
			res.json(users);
			return;
		}

		db.mget(rep, function(err,rep) {
				rep.forEach(function(val){
				users.push(JSON.parse(val));
			});

			users = users.map(function(users){
				return {id: users.id, name: users.name};
			});
			res.json(users);
		});
	});
});


app.post( '/user', jsonParser, function(req, res){

	var newUser = req.body;

	db.incr('id:user', function (err, rep) {

		newUser.id = rep;
		db.set('user:'+newUser.id, JSON.stringify(newUser), function(err, rep) {
			res.json(newUser);
		});
	});
});


//Spezifischer Benutzer {GET, DELETE, POST, PUT} [OK, OK, OK]
app.get( '/user/:id', jsonParser, function(req, res){

	db.get('user:'+req.params.id, function(err, rep) {

		if (rep) {
			res.type('json').send(rep);
		} else {
			res.status(404).type('text').send('User not found!');
		}
	});
});

app.delete( '/user/:id', jsonParser, function(req, res){

	db.del('user:'+req.params.id, function(err, rep){
		if (rep == 1){
			res.status(200).type('text').send('User successfully deleted');
		}  else {
			res.status(404).type('text').send('User not found!');
		}
	});
});
app.put( '/user/:id', jsonParser, function(req, res){

	db.exists('user:'+req.params.id, function(err, rep) {
		if (rep == 1) {
			var updatedUser = req.body;
			updatedUser.id = req.params.id;

			db.set('user:' + req.params.id, JSON.stringify(updatedUser), function(err, rep) {
				res.json(updatedUser);
			});
		} else {
			res.status(404).type('text').send('User already exists!');
		}
	});
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
