var router = express.Router();
var http = require('http');

//[OK]
//Index

router.get('/', function(req, res){
	res.render('pages/index');
    console.log('Projekt der TH Köln, Medieninformatik 4. Semester.');
});


//[OK]
//Gibt eine Liste aller Animes aus.
router.get('/anime', function(req, res){
    
    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime",
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
    var externalRequest = http.request(options, function(externalResponse){

        externalResponse.on("data", function(chunk){

            var anime = JSON.parse(chunk);
            res.render('pages/anime',{anime:anime});
            res.end();
        });
    });
    externalRequest.end();

/*
     var externalRequest = http.request(options, function(externalResponse){

        externalResponse.on("data", function(chunk){

            var animeAll = JSON.parse(chunk);
            res.render('pages/anime',{animeAll:animeAll});
            res.end();
        });
    });
    externalRequest.end();
  */   
    

});

//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
router.get('/anime/:anime_name', jsonParser, function(req, res){
    
    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime/:anime_name",
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
 /*   
    db.get('anime:'+req.params.anime_name, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('Anime not found!');
		}
	});
    */

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
//Gibt Informationen zu einer Referenz aus.
router.get('/ref/:refID', jsonParser, function(req, res) {
    
    
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