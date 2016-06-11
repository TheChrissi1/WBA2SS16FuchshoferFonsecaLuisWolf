var express = require('express');
var router = express.Router();
var fs = require('fs');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var redis = require( 'redis' );
var db = redis.createClient(); //Creates a new Client


//[OK]
//Trägt einen neuen Anime in die DB ein.
router.put('/anime', jsonParser, function( req, res){
    
    var newAnime = req.body;
    db.set('anime:'+newAnime.name, JSON.stringify(newAnime), function(err, rep) {
        res.status(201).type('text').send('new anime: ' +newAnime.name);
    });

});

//[OK]
// Ändert die Daten eines Animes.
router.put( '/anime/:anime_name', jsonParser, function(req, res){

	db.exists('anime:'+req.params.anime_name, function(err, rep) {
		if (rep == 1) {
			var updatedAnime = req.body;
		//	updatedAnime.name = req.params.anime_name;

			db.set('anime:' + req.params.anime_name, JSON.stringify(updatedAnime), function(err, rep) {
				res.status(200).type('json').send(updatedAnime);
			});
		} else {
			res.status(404).type('text').send('Anime not exists!');
        }
		
	});
});

//[OK]
//Trägt einen neuen Benutzer in die DB ein.
router.put('/user', jsonParser, function(req, res){

    var newUser = req.body;
    
    //Inkrement wird nicht zurückgesetzt wenn bspw. alle User gelöscht werden!!!
	db.incr('uID:user', function (err, rep) {

		newUser.uID = rep;
		db.set('user:'+newUser.uID, JSON.stringify(newUser), function(err, rep) {
			res.status(201).type('text').send('new user: ' +newUser.uID);
		});
        var newStat = {"uID": newUser.uID,"gesFolgen": "","gesAnimes": ""};
        db.set('stats:'+newUser.uID, JSON.stringify(newStat), function(err, rep) {
            console.log('new statistic for user: ' +newUser.uID);
        });
	});
});

//[OK]
//Ändert die Daten eines Benutzers.
router.put( '/user/:uID', jsonParser, function(req, res){
    
    	db.exists('user:'+req.params.uID, function(err, rep) {
		if (rep == 1) {
			var updatedUser = req.body;
			updatedUser.uID = req.params.uID;

			db.set('user:' + req.params.uID, JSON.stringify(updatedUser), function(err, rep) {
				res.status(200).type('json').send(updatedUser);
			});
		} else {
			res.status(404).type('text').send('User already exists!');
		}
	});
});

//[NOT OK]
//Ändert die Statistik eines Nutzers.
router.put( '/user/:id/stats', jsonParser, function(req, res){
    
    

});






console.log('loaded put.js.')
module.exports = router;