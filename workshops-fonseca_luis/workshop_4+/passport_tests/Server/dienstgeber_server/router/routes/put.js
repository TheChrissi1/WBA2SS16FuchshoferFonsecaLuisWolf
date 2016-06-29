var router = express.Router();
var bcrypt = require('bcryptjs');
var Q = require('q');

passport.use('/', require('./passport_configure'));


//[OK]
//Trägt einen neuen Anime in die DB ein.
router.put('/anime', jsonParser, function( req, res){


    var newAnime = req.body;

    db.set('anime:'+newAnime.name.toLowerCase().replace(/ /g,'-'), JSON.stringify(newAnime), function(err, rep) {

        //res.status(201).type('text').send('new anime: ' +newAnime.name);
        res.status(201).type('json').send({"name":newAnime.name});

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
				res.status(200).type('json').send({"name":updatedAnime.name});
			});
		} else {
			res.status(404).type('text').send('Anime not exists!');
        }

	});
});

//[OK]
//Trägt einen neuen Benutzer in die DB ein.
router.put('/user', jsonParser, function(req, res){

  var User = req.body;
  // // // console.log(User);
  var newUser = {
    "user_id":0,
    "name":User.name,
    "lastname":User.lastname,
    "username":User.username,
    "authority":3,
    "email":User.email,
    "gender":User.gender,
    "birthdate":User.birthdate,
    "active":true
  }
   // // console.log(newUser);
  db.incr('user_id:user', function (err, rep) {

		newUser.user_id = rep;
		db.set('user:'+newUser.user_id, JSON.stringify(newUser), function(err, rep) {
      // // // console.log("New User with ID: " + newUser.user_id);
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
      if( err ) throw err;
        // // // console.log('new statistic for user: ' + newUser.user_id);
    });
    res.status(201).type('text').send({"user_id":newUser.user_id});
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

  db.exists('stats:'+req.params.user_id, function(err, rep){
    if(rep == 1){
      db.get('stats:'+req.params.user_id, function(err, rep2) {
    		if (rep2) {
          var exists = 0;
          rep2 = JSON.parse(rep2);
          for(var i = 1; i<rep2.stats.length; i++){
            if(rep2.stats[i].name == req.body.name) exists = i;
          }
          if( exists > 0 ){
            if(rep2.stats[exists].episodes > req.body.episodes){
              var differenz = (rep2.stats[exists].episodes-req.body.episodes);
              rep2.stats[exists].episodes = req.body.episodes;
              rep2.stats[0].seen_ep -= differenz;
              rep2.stats[exists].max_ep = req.body.max_ep;
            } else {
              var tmp = rep2.stats[exists].episodes;
              rep2.stats[exists].episodes = req.body.episodes;
              rep2.stats[0].seen_ep += (req.body.episodes-tmp);
              rep2.stats[exists].max_ep = req.body.max_ep;
            }
          } else if (exists == 0){
            rep2.stats.push(req.body);
            rep2.stats[0].seen_ep += req.body.episodes;
            rep2.stats[0].seen_anime += 1;
          }
          db.set('stats:' + req.params.user_id, JSON.stringify(rep2), function(err, rep) {
    				res.status(200).type('json').send(rep2);
    			});
    		} else {
    			res.status(404).type('text').send();
    		}
    	});
    }
  });
});

router.put('/signup', function(req, res){
  console.log("IN SIGNUP");
  var newUser = req.body;
  var hash = bcrypt.hashSync( newUser.password, 8 );
  var user = {
    "username" : newUser.username,
    "password": hash
  };
  console.log(user);
  db.get('auth:' + user.username, function( result ){
    console.log("in db.get auth");
    if( result ){
      console.log("Username taken!");
      res.sendStatus(422);
    } else {
      db.set('auth:' + user.username , user.password, function ( err ){
        console.log("in db.set auth");
        if( err ){
          console.log("Unexpected Error!");
          res.sendStatus(500);
        } else {
          console.log("Successfull");
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put('/login', jsonParser, function(req, res){
  console.log(req.body);
  var User = req.body;
  db.get('auth:' + User.username, function( err, result ){
    console.log(err);
    if( result ){
      console.log('Found User');
      var hash = result;
      if( bcrypt.compareSync( User.password, hash )){
        res.sendStatus(200);
      } else {
        console.log('Wrong Password');
        res.sendStatus(423);
      }
    } else {
      console.log( 'Could not find User');
      res.sendStatus(404);
    }
  });
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
        // // // console.log(val.name.toLowerCase().replace(/ /g,'-'));
        db.set('anime:' + val.name.toLowerCase().replace(/ /g,'-'), JSON.stringify(val));
    })
    res.status(201).type('text').send('added');
})

///////////////////////////////////////////////

//////// PUT STATS ONLY ONCE //////////////////
router.put('/stats', jsonParser, function( req, res ){
    // // // console.log("IN PUT STATS");
    var stat = require('./input/stats.json');
    // // // console.log(stat);
    db.set('stats:1', JSON.stringify(stat));
    res.status(201).type('text').send('added');
})
///////////////////////////////////////////////
*/
// // // console.log('loaded put.js.')
module.exports = router;
