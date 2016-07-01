var router = express.Router();



//[OK]
//Fügt einen neuen Anime hinzu.
router.put('/anime', jsonParser, function( req, res){
  console.log('PUT /anime');
  var newAnime = req.body;
  var available = true;
  db.keys('anime:*', function(err, rep){
    if(err) throw err;
    for(var i = 0; i<rep.length; i++){
      if( rep[i] == 'anime:' + newAnime.name.toLowerCase().replace(/ /g,'-')){
        available = false;
      }
    }
    if(available){
      db.set('anime:'+newAnime.name.toLowerCase().replace(/ /g,'-'), JSON.stringify(newAnime), function(err, rep) {
        if(err) throw err;

        res.status(201).type('json').send({'name':newAnime.name});

        console.log('CREATED');

      });
    } else {
      res.status(422).type('text').send('Anime does already exist');

      console.log('UNPROCESSABLE ENTITY');

    }
  });
});

//[OK]
//Ändert die Daten eines Animes.
router.put( '/anime/:anime_name', jsonParser, function(req, res){

  console.log('PUT /anime/' + req.params.anime_name);

	db.exists('anime:'+req.params.anime_name, function(err, rep) {
    if(err) throw err;
		if (rep == 1) {
			var updatedAnime = req.body;

			db.set('anime:' + req.params.anime_name, JSON.stringify(updatedAnime), function(err, rep) {
        if(err) throw err;
        res.status(200).type('json').send({'name':updatedAnime.name});

        console.log('OK');

			});
		} else {
			res.status(404).type('text').send('Anime does not exists!');

      console.log('NOT FOUND');

    }
	});
});

//[OK]
//Fügt einen neuen Benutzer hinzu.
router.put('/user', jsonParser, function(req, res){

  console.log('PUT /user');

  var User = req.body;
  var newUser = {
    user_id:0,
    'name':User.name,
    'lastname':User.lastname,
    'username':User.username,
    'authority':3,
    'email':User.email,
    'gender':User.gender,
    'birthdate':User.birthdate,
    'active':true
  }
  var available = true;
  db.keys('user:*' , function(err, rep){
    if(err) throw err;
    var result = rep;
    if(result.length > 0){
      db.mget(result, function(err, rep){
        if(err) throw err;
        rep.forEach(function(val){
          if(JSON.parse(val).username == User.username){
            available = false;
          }
        });
        if(available){
          db.incr('user_id:user', function (err, rep) {
            if(err) throw err;

            newUser.user_id = rep;
            db.set('user:'+newUser.user_id, JSON.stringify(newUser), function(err, rep) {
              if(err) throw err;
            });
            var newStat = {
                'stats':[
                  {
                    'user_id':newUser.user_id,
                    'username':newUser.username,
                    'seen_ep':0,
                    'seen_anime':0,
                  }
                ]
            };
            db.set('stats:'+newUser.user_id, JSON.stringify(newStat), function(err, rep) {
              if( err ) throw err;
            });
            res.status(201).type('json').send({'user_id':newUser.user_id});

            console.log('CREATED');

          });
        } else {
          res.status(422).type('text').send('Username already taken');

          console.log('UNPROCESSABLE ENTITY');

        }
      });
    } else {
      db.incr('user_id:user', function (err, rep) {
        if(err) throw err;

        newUser.user_id = rep;
        db.set('user:'+newUser.user_id, JSON.stringify(newUser), function(err, rep) {
          if(err) throw err;
        });
        var newStat = {
            'stats':[
              {
                'user_id':newUser.user_id,
                'username':newUser.username,
                'seen_ep':0,
                'seen_anime':0,
              }
            ]
        };
        db.set('stats:'+newUser.user_id, JSON.stringify(newStat), function(err, rep) {
          if( err ) throw err;
        });
        res.status(201).type('json').send({'user_id':newUser.user_id});

        console.log('CREATED');
      });
    }
  });
});

//[OK]
//Ändert die Daten eines Benutzers.
router.put( '/user/:user_id', jsonParser, function(req, res){

  console.log('PUT /user/' + req.params.user_id);

  db.exists('user:'+req.params.user_id, function(err, rep) {
    if(err) throw err;
		if (rep == 1) {
			var updatedUser = req.body;

			updatedUser.user_id = parseInt(req.params.user_id, 10);

			db.set('user:' + req.params.user_id, JSON.stringify(updatedUser), function(err, rep) {
        if(err) throw err;

				res.status(200).type('json').send(updatedUser);

        console.log('OK');

			});
		} else {
			res.status(404).type('text').send('User already exists!');

      console.log('NOT FOUND');

		}
	});
});

//[OK]
//Ändert die Statistik eines Nutzers.
router.put( '/user/:user_id/stats', jsonParser, function(req, res){

  console.log('PUT /user/' + req.params.user_id + '/stats');

  db.exists('stats:'+req.params.user_id, function(err, rep){
    if(err) throw err;
    if(rep == 1){
      db.get('stats:'+req.params.user_id, function(err, rep) {
        if(err) throw err;
        var exists = 0;
        rep = JSON.parse(rep);
        for(var i = 1; i<rep.stats.length; i++){
          if(rep.stats[i].name == req.body.name) exists = i;
        }
        if( exists > 0 ){
          if(rep.stats[exists].episodes > req.body.episodes){
            var differenz = (rep.stats[exists].episodes-req.body.episodes);
            rep.stats[exists].episodes = req.body.episodes;
            rep.stats[0].seen_ep -= differenz;
            rep.stats[exists].max_ep = req.body.max_ep;
          } else {
            var tmp = rep.stats[exists].episodes;
            rep.stats[exists].episodes = req.body.episodes;
            rep.stats[0].seen_ep += (req.body.episodes-tmp);
            rep.stats[exists].max_ep = req.body.max_ep;
          }
        } else if (exists == 0){
          rep.stats.push(req.body);
          rep.stats[0].seen_ep += req.body.episodes;
          rep.stats[0].seen_anime += 1;
        }
        db.set('stats:' + req.params.user_id, JSON.stringify(rep), function(err, rep) {
          if(err) throw err;
  				res.status(200).type('json').send(rep);

          console.log('OK');

  			});
    	});
    } else {
      res.status(404).type('text').send('Statistic does not exists');

      console.log('NOT FOUND');

    }
  });
});

//[OK]
//Registriert einen neuen Benutzer namen.
router.put('/signup', jsonParser, function(req, res){

  console.log('PUT /signup');

  var newUser = req.body;
  var hash = bcrypt.hashSync( newUser.password, 8 );
  var user = {
    'username' : newUser.username,
    'password': hash
  };
  db.get('auth:' + user.username, function(err, rep){
    if(err) throw err;
    if( !rep ){
      db.set('auth:' + user.username , user.password, function ( err ){
        if( err ) throw err;
        res.sendStatus(204);

        console.log('OK');

      });
    } else {
      res.sendStatus(422);

      console.log('UNPROCESSABLE ENTITY');

    }
  });
});

//[OK]
//Logged einen Benutzer ein.
router.put('/login', jsonParser, function(req, res){

  console.log('PUT /login');

  var User = req.body;
  db.get('auth:' + User.username, function( err, rep ){
    if(err) throw err;
    if( rep ){
      var hash = rep;
      if( bcrypt.compareSync( User.password, hash )){
        res.sendStatus(204);

        console.log('OK');

      } else {
        res.sendStatus(423);

        console.log('LOCKED')

      }
    } else {
      res.sendStatus(404);

      console.log('NOT FOUND')

    }
  });
});

console.log('loaded put.js.')
module.exports = router;
