var router = express.Router();
var http = require('http');

//Wird bei Server start erzeugt und mit der Zeit mit Vorschlägen gefüllt
var suggestions = {
    "data":[]
}

function isAuthenticated( req, res, next){
	// console.log(req.isAuthenticated);
	if(req.isAuthenticated){
		return next();
	} else {
		router.get('/index');
	}
};

//Funktion zum überprüfen ob ein Vorschlag bereits vorhanden ist
function check (data, newData) {
    var anime = data;
    var value = 1;
    for (var i = 0; i < anime.data.length; i++) {
        //Ist der Anime-Vorschlag schon vorhanden?
        if (anime.data.length == 0) {
            value = 0;
        }
        if (anime.data[i].name == newData.name && anime.data.length != 0) {
            value = 0;
            break;
        }
    }
    return value;
}

//[OK]
//Index

router.get('/', function(req, res){
	res.render('pages/index');
    // // console.log('Projekt der TH Köln, Medieninformatik 4. Semester.');
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
        console.log("in get");
			if(exRes.statusCode != 404){
        exRes.on("data", function(chunk){
            //wird nich automatisch geparst!??
            var animeList = JSON.parse(chunk);
            res.render('pages/anime',{animeList:animeList});
            res.end();
        });
			} else {
				exRes.on("data", function(chunk){
					var animeList = [];
					res.render('pages/anime',{animeList:animeList});
					res.end();
				});
			}
    });
    exReq.end();


});

//[NOT OK]
//Gibt eine spezifizierung der Animetabelle aus.
router.get('/anime/filter:para', jsonParser, function(req, res) {

    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime",
        method:"GET",
        headers:{
            accept:"application/json"
        }
    }

    var tmp = 0;
    var countEpisodes = 0;
    var countGenre = 0;
    var countName = 0;
    var countMax = 0;
    var countMin = 0;
    var query = req.params.para;
    var queryL = query.length;

    //Bestimmt die Anzahl vom substring "episodes"
    var tmpEpisodes = query;
    for (var t=0; t<tmpEpisodes.length; t++ ) {
        var posEpi;
        tmpEpisodes = tmpEpisodes.substr(posEpi+t,tmpEpisodes.length);
        posEpi = tmpEpisodes.indexOf("episodes");
        if (posEpi == -1) {
            break;
        } else {
            countEpisodes++;
        }
    }

    //Bestimmt die Anzahl vom substring "genre"
    var tmpGenre = query;
    for (var u=0; u<tmpGenre.length; u++ ) {
        var posGen;
        tmpGenre = tmpGenre.substr(posGen+u,tmpGenre.length);
        posGen = tmpGenre.indexOf("genre");
        if (posGen == -1) {
            break;
        } else {
            countGenre++;
        }
    }

     //Bestimmt die Anzahl vom substring "name"
    var tmpName = query;
    for (var t=0; t<tmpName.length; t++ ) {
        var posName;
        tmpName = tmpName.substr(posName+t,tmpName.length);
        posName = tmpName.indexOf("name");
        if (posName == -1) {
            break;
        } else {
            countName++;
        }
    }

    //Bestimmt die Anzahl vom substring "maxEpisodes"
    var tmpMax = query;
    for (var t=0; t<tmpMax.length; t++ ) {
        var posMax;
        tmpMax = tmpMax.substr(posMax+t,tmpMax.length);
        posMax = tmpMax.indexOf("maxEpisodes");
        if (posMax == -1) {
            break;
        } else {
            countMax++;
        }
    }

    //Bestimmt die Anzahl vom substring "minEpisodes"
    var tmpMin = query;
    for (var t=0; t<tmpMin.length; t++ ) {
        var posMin;
        tmpMin = tmpMin.substr(posMin+t,tmpMin.length);
        posMin = tmpMin.indexOf("minEpisodes");
        if (posMin == -1) {
            break;
        } else {
            countMin++;
        }
    }

    //console.log('cEpi: ' +countEpisodes);
    //console.log('cGen: ' +countGenre);
    //console.log('cName: ' +countName);
    //console.log('cMax: ' +countMax);
    //console.log('cMin: ' +countMin);

    //Entfernt das "?" an pos[0] aus dem string
    query = query.substr(1,query.length);

    //Parst den querystring in ein Objekt
    var erg = queryString.parse(query);


    //Request auf den Dienstgeber

    //Da im "erg"-Objekt sowohl arrays als auch normale variablenzuweisungen vorkommen können, muss über die Anzahl
    //der im querystring vorkommenden Parameter (countEpisodes, count...) auf den Wert der Parameter zugegriffen werden.
    var exReq = http.request(options, function(exRes){

        exRes.on("data", function(chunk){

            //Animeliste aus dem Dienstgeber
            var exAnimeList = JSON.parse(chunk);
            //Neue Animeliste
            var animeList = [];

            // Überprüfen ob Filter "Episodes" mit mindestens einem Anime übereinstimmt.
            if (countEpisodes == 1) {
                    for (var i=0; i<exAnimeList.length; i++) {
                        if (exAnimeList[i].episodes == erg.episodes) {
                            animeList.push(exAnimeList[i]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[i].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[i].name});
//                            }
                        }
                    }
            } else if( countEpisodes > 1) {
                for (var j=0; j<=countEpisodes; j++) {
                    for (var k=0; k<exAnimeList.length; k++) {
                        if (exAnimeList[k].episodes == erg.episodes[j]) {
                            animeList.push(exAnimeList[k]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[k].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[k].name});
//                            }
                        }
                    }
                }
            }

            //Überprüft ob Filter "maxEpisodes" vorhanden ist und filtert die Liste danach
            if (countMax == 1) {
                    for (var a=0; a<exAnimeList.length; a++) {
                        if (exAnimeList[a].episodes <= erg.maxEpisodes) {
                            animeList.push(exAnimeList[a]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[a].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[a].name});
//                            }
                        }
                    }
            }

            //Überprüft ob Filter "minEpisodes" vorhanden ist und filtert die Liste danach
            if (countMin == 1) {
                    for (var b=0; b<exAnimeList.length; b++) {
                        if (exAnimeList[b].episodes >= erg.minEpisodes) {
                            animeList.push(exAnimeList[b]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[b].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[b].name});
//                            }
                        }
                    }
            }


            // Überprüfen ob Filter "Genre" mit mindestens einem Anime übereinstimmt.
            if (countGenre == 1) {
                    for (var m=0; m<exAnimeList.length; m++) {
                        if (exAnimeList[m].genre.indexOf(erg.genre) > -1) {
                            animeList.push(exAnimeList[m]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[m].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[m].name});
//                            }
                        }
                    }

            } else if (countGenre > 1) {
                for (var n=0; n<=countGenre; n++) {
                    for (var o=0; o<exAnimeList.length; o++) {
                        if (exAnimeList[o].genre.indexOf(erg.genre[n]) > -1) {
                            animeList.push(exAnimeList[o]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[o].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[o].name});
//                            }
                        }
                    }
                }
            }

            // Überprüfen ob Filter "Name" mit mindestens einem Anime übereinstimmt.
            if (countName == 1) {
                    for (var m=0; m<exAnimeList.length; m++) {
                        //Alle 3 möglichen Namen eines Animes werden verglichen
                        if (exAnimeList[m].name.indexOf(erg.name) > -1 || exAnimeList[m].name_en.indexOf(erg.name) > -1 ||      exAnimeList[m].name_de.indexOf(erg.name) > -1){
                            animeList.push(exAnimeList[m]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[m].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[m].name});
//                            }
                        }
                    }

            } else if (countName > 1) {
                for (var n=0; n<=countName; n++) {
                    for (var o=0; o<exAnimeList.length; o++) {
                        //Alle 3 möglichen Namen eines Animes werden verglichen
                        if (exAnimeList[o].name.indexOf(erg.name[n]) > -1 || exAnimeList[o].name_en.indexOf(erg.name[n]) > -1 || exAnimeList[o].name_de.indexOf(erg.name[n]) > -1) {
                            animeList.push(exAnimeList[o]);

//                            //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
//                            if (check(suggestions, {"name":exAnimeList[o].name}) == 1) {
//                                suggestions.data.push({"name":exAnimeList[o].name});
//                            }
                        }
                    }
                }
            }

            if (animeList == '') {
                res.render('pages/noResult');
                res.end;
            } else {
                //Wirklich auf /anime rendern?? Eventuell neue .ejs mit /anime/filter machen??
                res.render('pages/anime',{animeList:animeList,suggestions:suggestions});
                res.end();
            }
        });
    });
    exReq.end();
});

//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
router.get('/anime/:anime_name', jsonParser, function(req, res){
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
            // // console.log("IN IF");
            res.statusCode = 404;
            res.render('pages/error');
            res.end();

        }else {
            // // console.log("IN ELSE");
            var animeData;
            var refData = [];
            exRes.on("data", function(chunk){
                //Ist schon geparst??!
                animeData = JSON.parse(chunk);
                var refs = animeData.refs;


            exRes.on("end", function(){
								var ref_ids = [];
								var tmp = 0;
								for(var index = 0; index<refs.length; index++){
									if(refs[index]=='|'){
										ref_ids.push(refs.substring(tmp,index));
										tmp = index + 1;
									}
								}

                //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
                if (check(suggestions, {"name":animeData.name}) == 1) {
                    suggestions.data.push({"name":animeData.name});
                }

								refData = ref_ids;
								res.render('pages/animeID',{animeData:animeData, refData:refData,suggestions:suggestions});
								res.end();
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
					if(exRes.statusCode != 404){
            //wird nich automatisch geparst!??
            var userList = JSON.parse(chunk);
            res.render('pages/user',{userList:userList});
            res.end();
					} else {
						var userList = [];
						res.render('pages/user',{userList:userList});
						res.end();
					}
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
router.get( '/user/:user_id/stats', function(req, res){

	// // console.log("Stats for ID: " + req.params.user_id);
	var options = {
			host: "localhost",
			port: 3000,
			path: "/user/" + req.params.user_id + "/stats",
			method:"GET",
			headers:{
					accept:"application/json"
			}
	}
	var statData;
	var data = "";
	var exReq = http.request(options, function(exRes){
		if( exRes.statusCode == 404 ){
				res.statusCode = 404;
				res.render('pages/error');
				res.end();
		}else {
			exRes.on("data", function(chunk){
				data = chunk;
			});
			exRes.on("end", function(){
					//if Abfrage verhindert, dass der Dienstnutzer-server abstürzt, wenn zu viele Anfragen gestellt werden
					// console.log("CHUNK: " + data);
					if(data == "}"){
						// console.log("Server ist tot");
					} else {
						statData = JSON.parse(data);
					}
				res.render('pages/stats',{statData:statData});
				res.end();
			})
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
		res.status(exRes.statusCode).type('json').send();
		res.end();
	});
	exReq.end()
})

router.get('/login', jsonParser, function(req, res){
	res.render('pages/login');
	res.end();
})

router.get('/logout', jsonParser, function( req, res){
	var options = {
			host: "localhost",
			port: 3000,
			path: "/signout",
			method:"GET",
			headers:{
			}
	}
	var exReq = http.request(options);
	exReq.end();
	res.clearCookie('username');
	res.clearCookie('user_id');
  res.clearCookie('active');
  res.clearCookie('authority');
	res.render('pages/index');
});
// // console.log('loaded get.js');

router.get('/addanime', jsonParser, function( req, res ){
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
						options.path = "/ref";
						var otherReq = http.request(options, function( otherRes ){
							if( otherRes.statusCode != 404 ){
								otherRes.on("data", function(chunk){
									var refList = JSON.parse(chunk);
									res.render('pages/addanime',{genreList:genreList, refList:refList});
									res.end();

								});
							}
						});
						otherReq.end();
				});
		}
	});
	exReq.end();
})

router.get('/edit/:anime_name', jsonParser, function( req, res ){
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
          // // console.log("IN IF");
          res.statusCode = 404;
          res.render('pages/error');
          res.end();

      }else {
          // // console.log("IN ELSE");
          var animeData;
          exRes.on("data", function(chunk){
              //Ist schon geparst??!
              animeData = JSON.parse(chunk);
              options.path = "/genre";
              var genreReq = http.request(options, function(genreRes){
            		if( genreRes.statusCode == 404 ){
            				res.statusCode = 404;
            				res.render('pages/error');
            				res.end();
            		}else {
            				genreRes.on("data", function(chunk){
            						//wird nich automatisch geparst!??
            						var genreList = JSON.parse(chunk);
            						options.path = "/ref";
            						var otherReq = http.request(options, function( otherRes ){
            							if( otherRes.statusCode != 404 ){
            								otherRes.on("data", function(chunk){
            									var refList = JSON.parse(chunk);
            									res.render('pages/editanime',{animeData:animeData, genreList:genreList, refList:refList});
            									res.end();

            								});
            							}
            						});
            						otherReq.end();
            				});
            		}
            	});
            genreReq.end();
          });
      }
  });
  exReq.end();
});

module.exports = router;
