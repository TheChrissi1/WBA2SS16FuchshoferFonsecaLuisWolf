var router = express.Router();

//[OK]
//Index
router.get('/', function(req, res){

	console.log('GET /');

	res.status(200).type('text').send('Projekt der TH Köln, Medieninformatik 4. Semester.');

	console.log('OK');

});

//[OK]
//Gibt eine Liste aller Animes aus.
router.get('/anime',  function(req, res){

	console.log('GET /anime');

	db.keys('anime:*',function(err, rep) {
		if(err) throw err;
		var anime = [];
		var result = rep;
		if (result.length > 0) {
			db.mget(result, function(err, rep) {
				if(err) throw err;
				rep.forEach(function(val){
					anime.push(JSON.parse(val));
				});
				res.status(200).type('json').send(anime);
			});

			console.log('OK');

		}	else if (result.length == 0) {

		  res.status(404).type('text').send('No anime found');

			console.log('NOT FOUND');

		}
	});


});

//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
router.get('/anime/:anime_name',  function(req, res){

	console.log('GET /anime/' + req.params.anime_name);

  db.get('anime:'+req.params.anime_name, function(err, rep) {
		if(err) throw err;

		if (rep) {

			res.status(200).type('json').send( JSON.parse( rep ));

			console.log('OK');

		} else {

			res.status(404).type('text').send('This anime does not exist');

			console.log('NOT FOUND');

		}
	});
});

//[OK]
//Gibt eine Liste aller Benutzer aus.
router.get('/user',  function(req, res){

	console.log('GET /user');

	db.keys('user:*', function(err, rep) {
		if(err) throw err;
		var result = rep;
		var users = [];
		if (result.length > 0) {
      db.mget(result, function(err, rep) {
				if(err) throw err;
      	rep.forEach(function(val){
					users.push(JSON.parse(val));
				});
      	res.status(200).type('json').send(users);
    	});

			console.log('OK');

	  } else if (result.length == 0) {

 			res.status(404).type('text').send('No users found');

			console.log('NOT FOUND');

     }
	});
});

//[OK]
//Gibt einen Benutzer anhand seiner ID (querry-parameter) zurück.
router.get('/user/:user_id',  function(req, res){

	console.log('GET /user/'+ req.params.user_id);

  db.get('user:'+req.params.user_id, function(err, rep) {
		if(err) throw err;
		if (rep) {

			res.status(200).type('json').send(rep);

			console.log('OK');

		} else {

			res.status(404).type('text').send('This user does not exist');

			console.log('NOT FOUND');

		}
	});
});

//[OK]
//Gibt die Statistik/das Profil eines Benutzers aus.
router.get( '/user/:user_id/stats',  function(req, res){

	console.log('GET /user/' + req.params.user_id + '/stats');

	db.get('stats:'+req.params.user_id, function(err, rep) {
		if(err) throw err;
		if (rep) {

			res.status(200).type('json').send(rep);

			console.log('OK');

		} else {

			res.status(404).type('text').send('This user statistic does not exist');

			console.log('NOT FOUND');

		}
	});
});

//[OK]
//Gibt eine Liste der Genres aus.
router.get('/genre',  function(req, res) {

	console.log('GET /genre');

  var genre = [];
  db.lrange( 'genre', 0, -1, function( err, rep ){
    if( err ) throw err;
		if( rep.length > 0 ){
			rep.forEach( function( val ){
				genre.push( JSON.parse( val ));
			});

			res.status( 200 ).type( 'json' ).send( genre );

			console.log('OK');

		} else if( rep.length == 0 ){

     	res.status( 404 ).type( 'text' ).send( 'No genre found' );

			console.log('NOT FOUND');

     }
  });
});

//[OK]
//Gibt eine Liste der Referenzen aus.
router.get('/ref',  function(req, res) {

	console.log('GET /ref');

  db.keys('refs:*',function(err,rep) {
		if(err) throw err;

		var refs = [];
		var result = rep;
		if (result.length > 0) {
      db.mget(result, function(err, rep) {
				if(err) throw err;
        rep.forEach(function(val){
              refs.push(JSON.parse(val));
    		});

    		res.status(200).type('json').send(refs);

				console.log('OK');

      });
    } else if (result.length == 0) {

 			res.status(404).type('text').send('No refs found');

			console.log('NOT FOUND');

 		}
	});
});

//[OK]
//Gibt eine bestimmte Referenz aus.
router.get('/ref/:ref_name',  function(req, res){

	console.log('GET /ref/' + req.params.ref_name);

  db.keys('refs:' + req.params.ref_name ,function(err, rep) {
		if(err) throw err;
		if (rep.length > 0) {
      db.get('refs:' + req.params.ref_name, function(err, rep) {
				if(err) throw err;

        res.status(200).type('json').send(JSON.parse(rep));

				console.log('OK');

      });
    } else if (rep.length == 0) {

 			res.status(404).type('text').send('No refs found');

			console.log('NOT FOUND');

 		}
	});
});

//[OK]
//Gibt einen bestimmten Status Code zurück, wenn ein Username vergeben bzw. frei ist.
router.get('/signup/:user_name',  function(req, res){

	console.log('GET /signup/' + req.params.user_name);

	db.keys('user:*',function(err, rep) {
		if(err) throw err;
		var result = rep;
		var available = true;
		var user_id = -1;
		if (result.length == 0) {

			res.status(200).type('text').send('Username available');

			console.log('OK');

		} else if (result.length > 0) {
			db.mget(result, function(err, rep) {
				if(err) throw err;
				rep.forEach(function(val){
					if(JSON.parse(val).username.toLowerCase() == req.params.user_name.toLowerCase()){
						user_id = JSON.parse(val).user_id;
						available = false;
					}
				});
				if(available){
					res.status(200).type('text').send('Username available');

					console.log('OK');

				} else {
					res.status(422).type('text').send('Username already taken');

					console.log('UNPROCESSABLE ENTITY');

				}
			});
		}
	});
});


console.log('loaded get.js');
module.exports = router;
