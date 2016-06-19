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

//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
router.get('/anime/:anime_name', jsonParser, function(req, res){
    console.log(req.params.anime_name);
    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime/" + req.params.anime_name,
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }
    var refData = [];
    var exReq = http.request(options, function(exRes){
        if( exRes.statusCode == 404 ){
            console.log("IN IF");
            res.statusCode = 404;
            res.render('pages/error');
            res.end();

        }else {
            console.log("IN ELSE");
            var animeData;
            var refData = [];
            exRes.on("data", function(chunk){
                //Ist schon geparst??!
                console.log(JSON.parse(chunk));
                animeData = JSON.parse(chunk);
                var refs = animeData.refs;
                var ref_ids = [];
                var index = 0;
                var i = -1;


            exRes.on("end", function(){
                while( refs.indexOf("|"+(i+1)+"|") > -1 ){
                    console.log("IN WHILE | INDEX: " + i);
                    i++;
                    if( i == 0 ){
                        options.path = "/ref/" + refs.substring(0, refs.indexOf("|"+(0)+"|"));
                        ref_ids.push(options.path);
                        var axReq = http.request(options, function(axRes){
                            axRes.setEncoding('utf8');
                            var content;
                            axRes.on("data", function(chunk){
                                content = chunk;
                            });
                            axRes.on("end", function(){
                                refData.push(JSON.parse(content));
                                index++;
                                if(index == ref_ids.length){
                                    exReq.end();
                                    res.render('pages/animeID',{animeData:animeData, refData:refData});
                                    res.end();
                                }
                            });
                        });
                        axReq.end();
                    } else if( i > 0){
                        var str1 = refs.indexOf("|"+(i-1)+"|");
                        var str2 = refs.indexOf("|"+(i)+"|");
                        options.path = "/ref/" + refs.substring(str1 + 3, str2);
                        ref_ids.push(options.path);

                        var axReq = http.request(options, function(axRes){
                            axRes.setEncoding('utf8');
                            var content;
                            axRes.on("data", function(chunk){
                                content = chunk;
                            });
                            axRes.on("end", function(){
                                refData.push(JSON.parse(content));
                                index++;
                                if(index == ref_ids.length){
                                    exReq.end();
                                    res.render('pages/animeID',{animeData:animeData, refData:refData});
                                    res.end();
                                }
                            });
                        });
                        axReq.end();
                    }
                };
            });
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
router.get('/user/:user_id', jsonParser, function(req, res){

    var options = {
        host: "localhost",
        port: 3000,
        path: "/user/" + req.params.user_id,
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
router.get( '/user/:user_id/stats', jsonParser, function(req, res){

	console.log("Stats for ID: " + req.params.user_id);
	var options = {
			host: "localhost",
			port: 3000,
			path: "/user/" + req.params.user_id + "/stats",
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
					var statData = JSON.parse(chunk);
					res.render('pages/stats',{statData:statData});
					res.end();
			});
		}
	});
	exReq.end();

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

//[NOT OK]
//Öffnet das Formular zur registrierung.
router.get('/registration', jsonParser, function(req, res){
	var options = {
			host: "localhost",
			port: 3000,
			path: "/registration",
			method:"GET",
			headers:{
			}
	}
	var exReq = http.request(options, function(exRes){
			if( exRes.statusCode == 404 ){
				res.statusCode = 404;
				res.render('pages/error');
				res.end();
			}else {
				res.render('pages/registration');
				res.end();
			}
	});
	exReq.end();
})

//[NOT OK]
//
router.get('/registration/:user_name', jsonParser, function(req, res){
	var options = {
		host: "localhost",
		port: 3000,
		path: "/registration/" + req.params.user_name,
		method: "GET",
		headers:{

		}
	}
	var exReq = http.request(options, function(exRes){
		console.log("Status Code: " + exRes.statusCode);
		res.status(exRes.statusCode).type('json').send();
		res.end();
	});
	exReq.end()
})



console.log('loaded get.js');
module.exports = router;
