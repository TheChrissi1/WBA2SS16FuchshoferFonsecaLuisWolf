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
    var datas = require('./profil.json');
    var erg = 0;
    for (i=0; i<datas.anime.length; i++) {
        
        if (datas.anime[i].name == string) {
            var erg = datas.anime[i];
            return erg;
        }
    }
    if (erg==0) {
        erg = 'Anime nicht gefunden!';
        return erg;
    }
    
}

app.get('/anime/:anime_name', jsonParser, function(req, res){
	
    
	var querry = req.params.anime_name;
    var erg = returnAnime(querry);
	res.send(erg);
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
