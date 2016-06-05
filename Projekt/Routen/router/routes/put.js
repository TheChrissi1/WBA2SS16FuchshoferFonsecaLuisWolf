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

//Lädt die /data/stats.json per synchronen Aufruf.
function loadStats() {
    
    var data = fs.readFileSync(__parentdirectory+"/daten/stats.json")
    data = JSON.parse(data);
    return data;
    
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
        
	return return_value;
    
}

//Sortiert die profil.json alphabetisch und fügt einen neun Anime ein.
function anime_sort(string){

    var data = string;
    data.anime.sort(function(a, b){
        
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
 	    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
 	    return 0;
    });
    
    data = JSON.stringify( data, null, 4 );
    
    fs.writeFileSync(__parentdirectory+"/daten/profil.json", data);
   
}


function user_sort(string){

    var data = string;
    data.user.sort(function(a, b){
        
        if(a.uID.toLowerCase() < b.uID.toLowerCase()) return -1;
 	    if(a.uID.toLowerCase() > b.uID.toLowerCase()) return 1;
 	    return 0;
    });
    
    data = JSON.stringify( data, null, 4 );
    
    fs.writeFileSync(__parentdirectory+"/daten/user.json", data);
    
}

function stats_sort(string) {
    
    var data = string;
    data.stats.sort(function(a, b){
        
        if(a.uID.toLowerCase() < b.uID.toLowerCase()) return -1;
 	    if(a.uID.toLowerCase() > b.uID.toLowerCase()) return 1;
 	    return 0;
    });
    
    data = JSON.stringify( data, null, 4 );
    
    fs.writeFileSync(__parentdirectory+"/daten/stats.json", data);
    
}


//Gibt einen Benutzer anhand seiner ID (querry parameter) zurück.
function returnUser (string) {
    
     
    var data = loadUser();
    
    
    var return_value = -1;
	data = data.user;
    
	for(var i = 0; i<data.length;i++){
		var tmp = data[i].uID;
		
        
		if(string == tmp){
			return_value = i;
		}
	}
        
	return return_value;
    
}



//[OK]
//Trägt einen neuen Anime in /data/profil.json.
router.put('/anime', jsonParser, function( req, res){
    
    var data = loadProfile();
    var body = req.body;
    var search = returnAnime(body.name);
    
	if( search == -1 ){
        data.anime.push(body);    
	} else {
        res.send("Failed! Anime already exists!");
        console.log("Failed! Anime already exists: " +body.name);
    }
    
	anime_sort(data);
    if (search == -1) {
        console.log("New anime: " +body.name);
    }
	res.send("done");
});

//[OK]
// Ändert die Daten eines Animes
router.put( '/anime/:anime_name', jsonParser, function(req, res){
	var data = loadProfile();
	var body = req.body;
	var querry = req.params.anime_name;
	var search = returnAnime(querry);
	if(search != -1){
		data.anime[search] = body;
		res.send("Successfully changed " + data.anime[search].name);
        console.log("PUT changed anime: " + data.anime[search].name);
	} else {
		res.send(data.anime[search].name + " not in List");
        console.log("PUT changed anime FAILED: " + data.anime[search].name);
    }
    anime_sort(data);
    
});

//[OK]
//Trägt einen neuen Benutzer in /data/user.json ein.
router.put('/user', jsonParser, function(req, res){
    
    var data = loadUser(); 
    var body = req.body;
    var search = returnUser(body.uID);
    
	if ( search == -1) {
        data.user.push(body);
        console.log("New user: " +body.uID);
        res.send("Neuer Benutzer: " + body.uID);
        
        //Zu jedem neuen User wird eine Initialstatistik angelegt
        var stats = loadStats();
        stats.stats.push({"uID": body.uID,"gesFolgen": "","gesAnimes": ""});
        stats_sort(stats);
        console.log("initial statistic created");
    } else {
        res.send("Failed! User already exists!");
        console.log("Failed! User already exists: " +body.uID);
    }
    user_sort(data);
});

//[OK]
//Ändert die Daten eines Benutzers
router.put( '/user/:uID', jsonParser, function(req, res){

	var data = loadUser();
	var body = req.body;
	var querry = req.params.uID;
	var search = returnUser(querry);
    
	if(search != -1){
		data.user[search] = body;
		res.send("Successfully changed " + data.user[search].uID);
        console.log("PUT changed user: " + data.user[search].uID);
	} else {
		res.send(data.user[search].uID + " not in list");
        console.log("PUT changed user FAILED: " + data.user[search].uID);
    }
    user_sort(data);
});

//[NOT OK]
//Ändert die Statistik eines Nutzers.
router.put( '/user/:id/stats', jsonParser, function(req, res){

});






console.log('loaded put.js.')
module.exports = router;