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

//Die Suche aus dem JSON File funktioniert noch nicht!

app.get('/anime/:anime_name', jsonParser, function(req, res){
	var data = require('./profil.json');
	var querry = req.params.anime_name;
    console.log("Para: "+ querry);
    var erg = data.anime.find(function(a, b) {
        if (data.anime.name == querry){
            return erg;
        }
        else {
            res.send("Anime nicht verfügbar!");
        }      
    });
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

//Die Suche aus dem JSON File funktioniert noch nicht!

app.get('/benutzer/:id', jsonParser, function(req, res){
	var data = require('./user.json');
	var querry = req.params.id;
    console.log("Para: "+ querry);
    var erg = data.user.find(function(a, b) {
        if (data.user.name == querry){
            return erg;
        }
        else {
            res.send("Nutzer nicht gefunden!");
        }      
    });
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
