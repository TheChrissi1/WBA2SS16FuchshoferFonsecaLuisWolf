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
    var exReq = http.request(options, function(exRes){

        exRes.on("data", function(chunk){

            //wird nich automatisch geparst!??
            var animeList = JSON.parse(chunk);
            res.render('pages/anime',{animeList:animeList});
            res.end();
        });
    });
    exReq.end();


});

//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
//[NOT OK]
//Gibt eine spezifizierung der Animetabelle aus.
router.get('/anime/filter:para', jsonParser, function(req, res) {

    //Anhand der querry parameter kann die profil.json nach bestimmten 
    //kriterien wie genre, anzahl folgen etc. durchsucht werden.
    // localhost.de/anime/filter/?genre=action&folgen=500
    // genre=name, episodes=zahl, name, release?date, dub, sub
    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime",
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
      
    var query = req.params.para;
    var queryL = query.length;
    //console.log(query);
    query = query.substring(1, query.length);
    //console.log(query);
    var erg = queryString.parse(query);

    
    var exReq = http.request(options, function(exRes){
        
        exRes.on("data", function(chunk){
            
            var exAnimeList = JSON.parse(chunk);
            var animeList = [];
            
            if (erg.episodes == null) {    
            } else {
                for (var h=0; h<erg.episodes.length; h++) {
                    
                    for (var i=0; i<exAnimeList.length; i++) {
                    
                        if (exAnimeList[i].episodes == erg.episodes[h]) {
                            animeList.push(exAnimeList[i]);
                        }
                    }
                }
            }
            
            if (erg.genre == null) {    
            } else {
                for (var h=0; h<erg.genre.length; h++) {
                    
                    for (var i=0; i<exAnimeList.length; i++) {
                    
                        if (exAnimeList[i].genre == erg.genre[h]) {
                            animeList.push(exAnimeList[i]);
                        }
                    }
                }
            }
            if (animeList == '') {
                res.render('pages/noResult');
                res.end;
            } else {
                res.render('pages/anime',{animeList:animeList});
                res.end();
            }
        });
    });
    exReq.end(); 
});


router.get('/anime/:anime_name', jsonParser, function(req, res){
    var anime_error = {"name":req.params.anime_name};
    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime/" + req.params.anime_name,
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
    var exReq = http.request(options, function(exRes){
        if( exRes.statusCode == 404 ){
            res.statusCode = 404;
            res.render('pages/error');
            res.end();
        }else {
                exRes.on("data", function(chunk){
                //Ist schon geparst??!
                var animeData = JSON.parse(chunk);
                var refs = animeData.refs;
                var refData = [];
                var i = -1;
                while( refs.indexOf("|"+(i+1)+"|") > -1 ){
                    i++;
                    if( i == 0 ){
                        refData.push({"name":refs.substring(0, refs.indexOf("|"+(0)+"|"))});;
                    } else if( i > 0){
                        var str1 = refs.indexOf("|"+(i-1)+"|");
                        var str2 = refs.indexOf("|"+(i)+"|");
                        refData.push({"name":refs.substring(str1 + 3, str2)});
                    }
                };
                res.render('pages/animeID',{animeData:animeData, refData:refData});
                res.end();
            });
        }
    });
    exReq.end();

});

//[OK] - kein json format?
//Gibt eine Liste aller Benutzer aus.
router.get('/user', jsonParser, function(req, res){

     var options = {
        host: "localhost",
        port: 3000,
        path: "/user",
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
    var exReq = http.request(options, function(exRes){
        exRes.on("data", function(chunk){

            //wird nich automatisch geparst!??
            var userList = JSON.parse(chunk);
            res.render('pages/user',{userList:userList});
            res.end();
        });
    });
    exReq.end();
});

//[OK]
//Gibt einen Benutzer anhand seiner ID (querry-parameter) zurück.
router.get('/user/:uID', jsonParser, function(req, res){
    
    var options = {
        host: "localhost",
        port: 3000,
        path: "/user/" + req.params.uID,
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
    var exReq = http.request(options, function(exRes){
			if( exRes.statusCode == 404 ){
					res.statusCode = 404;
					res.render('pages/error');
					res.end();
			}else {
        exRes.on("data", function(chunk){
            //Ist schon geparst??!
            var userData = JSON.parse(chunk);
            res.render('pages/userID',{userData:userData});
            res.end();
        });
			}
    });
    exReq.end();

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
router.get('/genre', jsonParser, function(req, res){
    
    var options = {
        host: "localhost",
        port: 3000,
        path: "/genre",
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
    var exReq = http.request(options, function(exRes){
			if( exRes.statusCode == 404 ){
					res.statusCode = 404;
					res.render('pages/error');
					res.end();
			}else {
                exRes.on("data", function(chunk){
                    //wird nich automatisch geparst!??
                    var genreList = JSON.parse(chunk);
                    res.render('pages/genre',{genreList:genreList});
                    res.end();
                });
			}
    });
    exReq.end();

});

//[NOT OK]
//Gibt eine Liste der Referenzen aus.
router.get('/ref', jsonParser, function(req, res) {
    var options = {
        host: "localhost",
        port: 3000,
        path: "/ref",
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
    var exReq = http.request(options, function(exRes){
        if( exRes.statusCode == 404 ){
					res.statusCode = 404;
					res.render('pages/error');
					res.end();
        }else {
            exRes.on("data", function(chunk){

                //wird nich automatisch geparst!??
                var refList = JSON.parse(chunk);
                res.render('pages/ref',{refList:refList});
                res.end();
            });
        }
    });
    exReq.end();
    
});





console.log('loaded get.js');
module.exports = router;
