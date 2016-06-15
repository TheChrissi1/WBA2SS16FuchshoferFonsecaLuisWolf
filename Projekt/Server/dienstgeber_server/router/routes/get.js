var router = express.Router();

//[OK]
//Index
router.get('/', function(req, res){
	res.status(200).type('text').send('Projekt der TH Köln, Medieninformatik 4. Semester.');
    console.log('Projekt der TH Köln, Medieninformatik 4. Semester.');
});

//[OK]
//Gibt eine Liste aller Animes aus.
router.get('/anime', jsonParser, function(req, res){

    db.keys('anime:*',function(err,rep) {

		var anime = [];

		if (rep.length == 0) {
			
            console.log('keine animes vorhanden');
            res.status(404).type('text').send('no Animes found');
			
		} else if (rep.length > 0) {
            db.mget(rep, function(err,rep) {
                rep.forEach(function(val){
                    anime.push(JSON.parse(val));
			    });

                res.status(200).type('json').send(anime);
                //res.set("Content-Type", 'application/json').status(200).json(anime).end();
                
            });
        }
	});
 
});

//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
router.get('/anime/:anime_name', jsonParser, function(req, res){
    
    db.get('anime:'+req.params.anime_name, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('Anime not found!');
		}
	});

});

//[OK] - kein json format?
//Gibt eine Liste aller Benutzer aus.
router.get('/user', jsonParser, function(req, res){

    db.keys('user:*',function(err,rep) {

		var users = [];

		if (rep.length == 0) {
            console.log('keine user vorhanden');
            res.status(404).type('text').send('no user found');
		
        } else if (rep.length > 0) {
            db.mget(rep, function(err,rep) {
                rep.forEach(function(val){
				    users.push(JSON.parse(val));
			    });

              res.status(200).type('json').send(users);  
            });
        }
	});
});

//[OK]
//Gibt einen Benutzer anhand seiner ID (querry-parameter) zurück.
router.get('/user/:uID', jsonParser, function(req, res){

    db.get('user:'+req.params.uID, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('User not found!');
		}
	});
    
});

//[OK]
//Gibt die Statistik eines Benutzers aus.
router.get( '/user/:uID/stats', jsonParser, function(req, res){
    
  
    db.get('stats:'+req.params.uID, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('Stats/User not found!');
		}
	});


});

//[NOT OK]
//Gibt eine Liste der Genres aus.
router.get('/genre', jsonParser, function(req, res) {
    
    
});

//[NOT OK]
//Gibt eine Liste der Referenzen aus.
router.get('/ref', jsonParser, function(req, res) {
    
    
});


//[NOT OK]
//Gibt eine spezifizierung der Animetabelle aus.
router.get('/anime/filter/:para', jsonParser, function(req, res) {
    
    //Anhand der querry parameter kann die profil.json nach bestimmten 
    //kriterien wie genre, anzahl folgen etc. durchsucht werden.
    // localhost.de/anime/filter/?genre=action&folgen=500
    
});


console.log('loaded get.js');
module.exports = router;