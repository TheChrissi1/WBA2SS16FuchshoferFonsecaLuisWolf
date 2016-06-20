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
  // console.log("IN USER PUT");
  // console.log("req.body: " + JSON.stringify(req.body));
  // console.log('');
  var newUser = req.body;
  //
  var bodyString = JSON.stringify(newUser);
  //
  var options = {
      host: "localhost",
      port: 3000,
      path: "/user",
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
      }
  };
  var resBody;
  var put_req = http.request(options, function (put_res) {
    put_res.on("data", function (chunk) {
        console.log('Response: ' + chunk);
        console.log('StatusCode: ' + put_res.statusCode);
        console.log('StatusText: ' + JSON.parse(chunk).user_id);
        resBody = {"user_id":JSON.parse(chunk).user_id};
        console.log(resBody);
        console.log('--------------------------------------');
    });
    put_res.on("end", function(){
      res.status(201).type('json').send(resBody);
    })
  });
  put_req.write(bodyString);
  put_req.end();
});
  //Inkrement wird nicht zurückgesetzt wenn bspw. alle User gelöscht werden!!!
// 	db.incr('user_id:user', function (err, rep) {
//
// 		newUser.user_id = rep;
// 		db.set('user:'+newUser.user_id, JSON.stringify(newUser), function(err, rep) {
// 			res.status(201).type('text').send('new user: ' +newUser.user_id);
// 		});
// 	});
// });

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
