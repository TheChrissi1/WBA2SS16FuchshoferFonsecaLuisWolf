var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var jsonParser = bodyParser.json();
var fs = require( 'fs' );


var serverPort = 1337;

/*******
 *Index*
 *******/

app.get('/', function(req, res){
	res.send('Das ist der Index');
});

/***************************************************
 *Gibt eine Liste aller Animes in profile.json aus.*
 ***************************************************/

app.get('/anime', jsonParser, function(req, res){
	var anime = require('./profil.json');
	res.send(anime);
});


/* //old
app.get('/anime/shingeki+no+kyojin', jsonParser, function(req, res){
	var anime = require('./profil.json');
	anime = anime.anime;
	res.send(anime);
});
*/

/*********************************************************************
 *Gibt einen Anime anhand des QuerryParameters aus profile.json aus. *
 *                                                                   *
 *Der Querry muss dabei aber "wort+wort+wort.." sein, berücksichtigen*
 *im JSON-File! (Oder das "+" durch eine Funktion entfernen)           *
 *********************************************************************/

//Funktion um einen Anime anhand seines Namens aus einem JSOn File zu lesen. (kleinbuchstaben!)
function returnAnime (string) {
	string = string.toLowerCase();
	string = string.replace(/-/g,' ');
	var anime = require('./profil.json');
	var return_value = -1;
	anime = anime.anime;
	for(var i = 0; i<anime.length;i++){
		var tmp = anime[i].name;
		tmp = tmp.toLowerCase();
		if(string == tmp){
			return_value = i;
		}
	}
	return return_value;
}

app.get('/anime/:anime_name', jsonParser, function(req, res){

	var anime = require('./profil.json');
	anime = anime.anime;
	var querry = req.params.anime_name;
  var erg = returnAnime(querry);
	if(erg >= 0){
		res.send(anime[erg]);
	}
});
/******************************************
 *
 ******************************************/
 function anime_sort(err){
 		if( err ) throw err;
		var data = require('./profil.json');
 		data.anime.sort(function(a, b){

 	  //compare two values
 	  if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
 	  if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
 	  return 0;

 		});
 		data = JSON.stringify( data );
 		fs.writeFile( './profil.json', data, function(err){
 			if(err) throw err;
 		});
 }

app.put( '/anime/', function( req, res, next ){
	var data = require( './profil.json' );
	var anime = data.anime;
	var body = {"name":"Shokugeki no Soma", "episodes":25, "status":"finished"};

  var search = returnAnime(body.name);
	if( search == -1 ){
		anime.push(body);
	}
	anime_sort();
});



/**********************************************
 *Gibt eine Liste aller User in user.json aus.*
 **********************************************/

app.get('/benutzer', jsonParser, function(req, res){
    var benutzer = require('./user.json');
	res.send(benutzer);
});

/*********************************************************************
 *Gibt einen Nutzer anhand des QuerryParameters aus user.json zurück.*
 *                                                                   *
 *Der Querry muss dabei aber "wort+wort+wort.." sein, berücksichtigen*
 *im JSON-File! (Oder das "+" durch eine Funktion entfernen)           *
 *********************************************************************/

//Funktion um einen User anhand seiner ID aus einem JSOn File zu lesen.
function returnUser (string) {
    var datas = require('./user.json');
    var erg = 0;
    for (i=0; i<datas.user.length; i++) {

        if (datas.user[i].id == string) {
            var erg = datas.user[i];
            return erg;
        }
    }
    if (erg==0) {
        erg = 'User nicht gefunden!';
        return erg;
    }

}

app.get('/benutzer/:id', jsonParser, function(req, res){

	var querry = req.params.id;
    var erg = returnUser(querry);
	res.send(erg);
});


/*********************************************************************
 *Trägt einen neuen Nutzer anhand des body-requests in user.json ein.*
 *********************************************************************/

//Funktioniert noch nicht, im REST-Client kann im Body ein neuer Nutzer eingetragen werden
//der dann in user.json gepspeichert wird
app.put('/benutzer', jsonParser, function(req, res){

  var body = req.body;
  var data = JSON.stringify(body);
  console.log(body);
  console.log(data);
  fs.writeFile("./user.json", data, function(err) {
              if (err) throw err;
  });
});









app.listen(serverPort, function(){
	console.log('Server running on Port: ' + serverPort);
});
