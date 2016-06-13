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
    
    var data = loadUser();
    
    var return_value = -1;
    for (var i=0; i<data.user.length; i++) {

        if (data.user[i].uID == string) {
            return_value = i;
            return return_value;
        }
    }
    return return_value;

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
    if (erg==0) {
        erg = 'user statistics not found!';
        return erg;
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
        
	return return_value;

};

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


//[OK]
router.delete( '/anime/:anime_name', jsonParser, function(req, res){
	var data = loadProfile();
	//data = data.anime;
	var querry = req.params.anime_name;
	var search = returnAnime(querry);
	if(search != -1){
		data.anime.splice(search, 1);
        
        data = JSON.stringify( data, null, 4 );
        fs.writeFileSync(__parentdirectory+"/daten/profil.json", data);
        
        
		res.send("Anime successfully deleted: " + querry);
        console.log("DELETE anime: " + querry);
	} else {
		res.send("Anime was not in list: " + querry);
        console.log("DELETE anime FAILED: " + querry);
	}
    anime_sort(data);
	
});

//[OK]
router.delete( '/user/:uID', jsonParser, function(req, res){
    
    var querry = req.params.uID;
    var data = loadUser();
    var erg = returnUser(querry);
    
    
    if (erg != -1) {
        data.user.splice(erg, 1);
        data = JSON.stringify(data, null, 4);
        fs.writeFileSync(__parentdirectory+"/daten/user.json", data);
        
        res.send("User successfully deleted " + querry);
        console.log("DELETE user: " + querry);
    } else {
        res.send("User was not in list: " + querry);
        console.log("DELETE user FAILED: " + querry);
    }
    user_sort(data);
   
/*
	
		if (rep == 1){
			res.status(200).type('text').send('User successfully deleted');
		}  else {
			res.status(404).type('text').send('User not found!');
		}
*/
	
});


console.log('loaded delete.js')


module.exports = router;