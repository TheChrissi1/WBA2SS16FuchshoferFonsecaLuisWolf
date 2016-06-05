var express = require('express');
var router = express.Router();
var fs = require('fs');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var path = require('path'),__parentdirectory=path.dirname(process.mainModule.filename);



 //Läd die /data/profil.json per synchronen Aufruf.   
function loadProfile() {
        
        var data = fs.readFileSync(__parentdirectory+"/daten/profil.json")
        data = JSON.parse(data);
        return data;
    }

//Läd die /data/user.json per synchronen Aufruf.

function loadUser() {
    
    var data = fs.readFileSync(__parentdirectory+"/daten/user.json")
    data = JSON.parse(data);
    return data;
}
// Läd die /data/stats.json per synchronen Aufruf.

function loadStats() {
    
    var data = fs.readFileSync(__parentdirectory+"/daten/stats.json")
    data = JSON.parse(data);
    return data;
}
    
//Gibt einen Benutzer anhand seiner ID (querry parameter) zurück.
function returnUser (string) {
    
//    var user = fs.readFileSync(__parentdirectory+"/daten/user.json")
//    user = JSON.parse(user);
    var data = loadUser();
    
    var erg = 0;
    for (i=0; i<data.user.length; i++) {

        if (data.user[i].uID == string) {
            var erg = data.user[i];
            return erg;
        }
    }
    return erg;
    
}
//Gibt die Statistik eines Benutzers anhand seiner ID (querry parameter) zurück.
function returnStat (string) {
    

    var data = loadStats();
    
    var erg = 0;
    for (var i=0; i<data.stats.length; i++) {

        if (data.stats[i].uID == string) {
            var erg = data.stats[i];
            return erg;
        }
    }
    return erg;
}

//Gibt einen Anime zurück.
function returnAnime (string) {
	string = string.toLowerCase();
	string = string.replace(/-/g,' ');
    
    var data = loadProfile();

    
    var return_value = -1;
	data = data.anime;
    
	for(var i = 0; i<data.length;i++){
		var tmp = data[i].name;
		tmp = tmp.toLowerCase();
        
		if(string == tmp){
            
			return_value = i;
            return return_value;
		}
	}
    
	return return_value;

};



//[OK]
//Index
router.get('/', function(req, res){
	res.send('Projekt der TH Köln, Medieninformatik 4. Semester.');
    console.log('Projekt der TH Köln, Medieninformatik 4. Semester.');
});

//[OK]
//Gibt eine Liste aller Animes aus profil.json zurück.
router.get('/anime', jsonParser, function(req, res){


    var data = loadProfile();

    res.send(data);
    console.log('GET: profil.json');
 
});

//[OK]
//Gibt einen Anime anhand seiens Namens (querry-parameter) zurück.
router.get('/anime/:anime_name', jsonParser, function(req, res){
    
    
	var querry = req.params.anime_name;
    var erg = returnAnime(querry);
    

    var data = loadProfile();
    data = data.anime;
   
    if(erg >= 0){
		res.send(data[erg]);
        console.log('GET anime: ' +data[erg].name);
	}
    else {
        res.send('Failed! Anime not found.');
        console.log('Failed! Anime not found: ' +querry);
    }

});

//[OK]
//Gibt eine Liste aller Benutzer aus user.json zurück.
router.get('/user', jsonParser, function(req, res){
    

    var data = loadUser();
    
	res.send(data);
    console.log('GET: user.json');
});

//[OK]
//Gibt einen Benutzer anhand seiner ID (querry-parameter) zurück.
router.get('/user/:uID', jsonParser, function(req, res){

	var querry = req.params.uID;
    var erg = returnUser(querry);
    
    if (erg == 0) {
        res.send('user not found: ' +querry);
        console.log('GET user FAILED: ' +querry);
    } else {
        res.send(erg);
        console.log('GET user: ' +erg.uID);
    }
});

//[OK]
//Gibt die Statistik eines Benutzers aus stats.json zurück.
router.get( '/user/:uID/stats', jsonParser, function(req, res){
    
    var querry = req.params.uID;
    var erg = returnUser(querry);
    erg = erg.uID;
    
    var data = returnStat(erg);
    
    if (data != 0) {
        res.send(data);
        console.log('GET user statistic: ' +querry);
    } else {
        res.send('User statistic not found ' +querry);
        console.log('GET user statistic FAILED: ' +querry);
    }


});





console.log('loaded get.js');
module.exports = router;