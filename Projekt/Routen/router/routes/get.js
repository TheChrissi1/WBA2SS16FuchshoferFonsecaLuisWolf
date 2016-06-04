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

        if (data.user[i].id == string) {
            var erg = data.user[i];
            return erg;
        }
    }
    if (erg==0) {
        erg = 'user not found!';
        return erg;
    }

}
//Gibt die Statistik eines Benutzers anhand seiner ID (querry parameter) zurück.
function returnStat (string) {
    

    var data = loadStats();
    
    var erg = 0;
    for (i=0; i<data.stats.length; i++) {

        if (data.stats[i].id == string) {
            var erg = data.stats[i];
            return erg;
        }
    }
    

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
		}
	}
    console.log(return_value);
	return return_value;

};




//Index
router.get('/', function(req, res){
	res.send('Projekt der TH Köln, Medieninformatik 4. Semester.');
    console.log('Projekt der TH Köln, Medieninformatik 4. Semester.');
});

//Gibt eine Liste aller Animes aus profil.json zurück.
router.get('/anime', jsonParser, function(req, res){


    var data = loadProfile();

    res.send(data);
    console.log('GET: profil.json');
 
});
    
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
	
//Gibt eine Liste aller Benutzer aus user.json zurück.
router.get('/user', jsonParser, function(req, res){
    

    var data = loadUser();
    
	res.send(data);
    console.log('GET: user.json');
});

//Gibt einen Benutzer anhand seiner ID (querry-parameter) zurück.
router.get('/user/:id', jsonParser, function(req, res){

	var querry = req.params.id;
    var erg = returnUser(querry);
    
    
	res.send(erg);
    console.log('GET user: ' +erg.id);
});

//Gibt die Statistik eines Benutzers aus stats.json zurück.
router.get( '/user/:id/stats', jsonParser, function(req, res){
    
    var querry = req.params.id;
    var erg = returnUser(querry);
    erg = erg.id;
    
    var data = returnStat(erg);
    
    if (data != 0) {
        res.send(data);
        console.log('GET user statistic: ' +data.id);
    } else {
        res.send('User statistic not found ' +data.id);
        console.log('GET user statistic FAILED: ' +data.id);
    }


});





console.log('loaded get.js');
module.exports = router;