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
	db.incr('user_id:user', function (err, rep) {

		newUser.user_id = rep;
		db.set('user:'+newUser.user_id, JSON.stringify(newUser), function(err, rep) {
			res.status(201).type('text').send('new user: ' +newUser.user_id);
		});
      var newStat = {
          "stats":[
            {
              "user_id":newUser.user_id,
              "username":newUser.username,
              "seen_ep":0,
              "seen_anime":0,
            }
          ]
      };
      db.set('stats:'+newUser.user_id, JSON.stringify(newStat), function(err, rep) {
          console.log('new statistic for user: ' +newUser.user_id);
      });
	});
});

//[OK]
//Ändert die Daten eines Benutzers.
router.put( '/user/:user_id', jsonParser, function(req, res){

    	db.exists('user:'+req.params.user_id, function(err, rep) {
		if (rep == 1) {
			var updatedUser = req.body;
			updatedUser.user_id = req.params.user_id;

			db.set('user:' + req.params.user_id, JSON.stringify(updatedUser), function(err, rep) {
				res.status(200).type('json').send(updatedUser);
			});
		} else {
			res.status(404).type('text').send('User already exists!');
		}
	});
});

//[NOT OK]
//Ändert die Statistik eines Nutzers.
router.put( '/user/:user_id/stats', jsonParser, function(req, res){



});






console.log('loaded put.js.')
module.exports = router;
