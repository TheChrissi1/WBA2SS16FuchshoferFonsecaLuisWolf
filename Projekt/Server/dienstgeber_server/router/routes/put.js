var router = express.Router();

//[OK]
//Trägt einen neuen Anime in die DB ein.
router.put('/anime', jsonParser, function( req, res){
    var newAnime = req.body;
    db.set('anime:'+newAnime.name.toLowerCase().replace(/ /g,'-'), JSON.stringify(newAnime), function(err, rep) {
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


/*
///////// PUT GENRE ONLY ONCE /////////////////
router.put('/genre', jsonParser, function( req, res ){

    var genre = require('./input/genre.json');
    genre = genre.genre;
    genre.forEach(function(val){
        db.rpush(['genre', JSON.stringify(val)]);
    })
    res.status(201).type('text').send('added');
});
///////////////////////////////////////////////

///////// PUT REFS ONLY ONCE //////////////////
router.put('/refs', jsonParser, function( req, res ){

    var refs = require('./input/references.json');
    refs = refs.reference;
    refs.forEach(function(val){
        db.set('refs:' + val.ref_id, JSON.stringify(val));
    })
    res.status(201).type('text').send('added');
});
///////////////////////////////////////////////

//////// PUT ANIME ONLY ONCE //////////////////
router.put('/animes', jsonParser, function( req, res ){
    var animes = require('./input/anime.json');
    animes = animes.anime;

    animes.forEach(function(val){
        console.log(val.name.toLowerCase().replace(/ /g,'-'));
        db.set('anime:' + val.name.toLowerCase().replace(/ /g,'-'), JSON.stringify(val));
    })
    res.status(201).type('text').send('added');
})
///////////////////////////////////////////////

//////// PUT STATS ONLY ONCE //////////////////
router.put('/stats', jsonParser, function( req, res ){
    var stats = require('./input/stats.json');
    db.set('stats:1', JSON.stringify(stats));
    res.status(201).type('text').send('added');
})
///////////////////////////////////////////////
*/
console.log('loaded put.js.')
module.exports = router;
