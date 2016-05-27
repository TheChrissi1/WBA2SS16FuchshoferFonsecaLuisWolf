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
        
        if(a.id.toLowerCase() < b.id.toLowerCase()) return -1;
 	    if(a.id.toLowerCase() > b.id.toLowerCase()) return 1;
 	    return 0;
    });
    
    data = JSON.stringify( data, null, 4 );
    
    fs.writeFileSync(__parentdirectory+"/daten/user.json", data);
    
}


//Gibt einen Benutzer anhand seiner ID (querry parameter) zurück.
function returnUser (string) {
    
     
    var data = loadUser();
    
    
    var return_value = -1;
	data = data.user;
    
	for(var i = 0; i<data.length;i++){
		var tmp = data[i].id;
		
        
		if(string == tmp){
			return_value = i;
		}
	}
        
	return return_value;
    
}




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



//Trägt einen neuen Benutzer in /data/user.json ein.
router.put('/benutzer', jsonParser, function(req, res){
    
    var data = loadUser();
    
    var body = req.body;
    
    var search = returnUser(body.id);
    
	if ( search == -1) {
        data.user.push(body);
    } else {
        res.send("Failed! User already exists!");
        console.log("Failed! User already exists: " +body.id);
    }
    
    user_sort(data);
    if (search == -1) {
        console.log("New user: " +body.id);
    }
    res.send("done");
});







console.log('loaded put.js.')
module.exports = router;