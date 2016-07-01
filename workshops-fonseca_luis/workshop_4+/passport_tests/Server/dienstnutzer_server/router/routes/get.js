var router = express.Router();

//Wird bei Serverstart erzeugt und mit der Zeit mit Vorschlägen gefüllt.
var suggestions = {
    'data':[]
}


//Funktion zum überprüfen ob ein Vorschlag bereits vorhanden ist.
function check (data, newData) {
    var anime = data;
    var value = 1;
    for (var i = 0; i < anime.data.length; i++) {
        //Ist der Anime-Vorschlag schon vorhanden?
        if (anime.data[i].name == newData.name && anime.data.length != 0) {
            value = 0;
            break;
        }
    }
    return value;
}

//Funktion zum überprüfen ob ein Anime bereits vorhanden ist (anime-filter).
function checkFilter (data, newData) {
    var anime = data;
    var value = 1;
    for (var i = 0; i < anime.length; i++) {
        //Ist der Anime-Vorschlag schon vorhanden?  
        if (anime[i].name == newData && anime.length != 0) {
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
});

//[OK]
//Gibt eine Liste aller Animes aus.
router.get('/anime', function(req, res){

    console.log('GET /anime');

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/anime',
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }

    var exReq = http.request(options, function(exRes){
        if(exRes.statusCode == 200){
            exRes.on('data', function(chunk){
                var animeList = JSON.parse(chunk);
                //Zusätzlich zur Animeliste wird die Vorschlagliste gerendert.
                res.render('pages/anime',{animeList:animeList,suggestions:suggestions});
                res.end();
            });

            console.log('OK');

        //Falls keine Animes vorhanden sind wird eine leere Seite ausgegeben.
        } else {
            exRes.on('data', function(chunk){
                var animeList = [];
				res.render('pages/anime',{animeList:animeList,suggestions:suggestions});
				res.end();
            });

            console.log('OK - no content');
        }
    });
    exReq.end();
});

//[OK]
//Gibt eine Spezifizierung der Animeliste aus.
router.get('/anime/filter:para', function(req, res) {
    
    console.log('GET /anime/filter' + req.params.para);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/anime',
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }

    var tmp;
    var query = req.params.para;
    var queryL = query.length;

    var filter = ['episodes', 'genre', 'name', 'maxEpisodes', 'minEpisodes'];
    var count =  [0,          0,       0,      0,             0            ];
    
    //Überprüft den querystring und schreibt die Anzahl der jeweiligen Filter fest
    for (var i = 0; i<filter.length; i++) {
        
        var pos = 0;
        tmp = query;
        
        for (var j = 0; j < tmp.length; j++ ) {
            tmp = tmp.substr(pos+j,tmp.length);
            pos = tmp.indexOf(filter[i]);
            
            if (pos == -1) {
                break;
            } else {
                count[i] = count[i]+1;
            }
        }
    }   

    //Entfernt das '?' an pos[0] aus dem string
    query = query.substr(1,query.length);

    //Parst den querystring in ein Objekt
    var erg = queryString.parse(query);

    //Request auf den Dienstgeber

    //Da im 'erg'-Objekt sowohl arrays als auch normale variablenzuweisungen vorkommen können, muss über die Anzahl
    //der im querystring vorkommenden Filter (countEpisodes, count...) auf den Wert der Parameter zugegriffen werden.

    var exReq = http.request(options, function(exRes){

        exRes.on('data', function(chunk){

            //Animeliste aus dem Dienstgeber
            var exAnimeList = JSON.parse(chunk);
            //Neue Animeliste
            var animeList = [];
            
            // Überprüfen ob Filter 'Episodes' mit mindestens einem Anime übereinstimmt.
            if (count[0] == 1) {
                    for (var i=0; i<exAnimeList.length; i++) {
                        if (exAnimeList[i].episodes == erg.episodes) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                            if (checkFilter(animeList, exAnimeList[i].name) == 1) {
                                   animeList.push(exAnimeList[i]);
                               }
                        }
                    }
            } else if (count[0] > 1) {
                for (var j=0; j<=count[0]; j++) {
                    for (var k=0; k<exAnimeList.length; k++) {
                        if (exAnimeList[k].episodes == erg.episodes[j]) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                            if (checkFilter(animeList, exAnimeList[k].name) == 1) {
                                   animeList.push(exAnimeList[k]);
                               }
                        }
                    }
                }
            }
        
            
            // Überprüfen ob Filter 'Genre' mit mindestens einem Anime übereinstimmt.
            if (count[1] == 1) {
                    for (var m=0; m<exAnimeList.length; m++) {
                        if (exAnimeList[m].genre.toLowerCase().indexOf(erg.genre.toLowerCase()) > -1) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                            if (checkFilter(animeList, exAnimeList[m].name) == 1) {
                                   animeList.push(exAnimeList[m]);
                               }
                        }
                    }

            } else if (count[1] > 1) {
                for (var n=0; n<=count[1]; n++) {
                    for (var o=0; o<exAnimeList.length; o++) {
                        if (exAnimeList[o].genre.toLowerCase().indexOf(erg.genre[n].toLowerCase()) > -1) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                            if (checkFilter(animeList, exAnimeList[o].name) == 1) {
                                   animeList.push(exAnimeList[o]);
                               }
                        }
                    }
                }
            }

            // Überprüfen ob Filter 'name' mit mindestens einem Anime übereinstimmt.
            if (count[2] == 1) {
                    for (var m=0; m<exAnimeList.length; m++) {
                        //Alle 3 möglichen Namen eines Animes werden verglichen
                        if (exAnimeList[m].name.toLowerCase().indexOf(erg.name.toLowerCase()) > -1 || exAnimeList[m].name_en.toLowerCase().indexOf(erg.name.toLowerCase()) > -1 ||      exAnimeList[m].name_de.toLowerCase().indexOf(erg.name.toLowerCase()) > -1){
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                            if (checkFilter(animeList, exAnimeList[m].name) == 1) {
                                   animeList.push(exAnimeList[m]);
                               }
                        }
                    }

            } else if (count[2] > 1) {
                for (var n=0; n<=count[2]; n++) {
                    for (var o=0; o<exAnimeList.length; o++) {
                        //Alle 3 möglichen Namen eines Animes werden verglichen
                        if (exAnimeList[o].name.toLowerCase().indexOf(erg.name[n].toLowerCase()) > -1 || exAnimeList[o].name_en.toLowerCase().indexOf(erg.name[n].toLowerCase()) > -1 || exAnimeList[o].name_de.toLowerCase().indexOf(erg.name[n].toLowerCase()) > -1) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                            if (checkFilter(animeList, exAnimeList[o].name) == 1) {
                                   animeList.push(exAnimeList[o]);
                               }
                        }
                    }
                }
            }
   
            //Überprüft ob Filter 'maxEpisodes' vorhanden ist und filtert die Liste danach
            if (count[3] == 1 && count[4] == 0) {
                    for (var a=0; a<exAnimeList.length; a++) {
                        if (exAnimeList[a].episodes <= erg.maxEpisodes) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                            if (checkFilter(animeList, exAnimeList[a].name) == 1) {
                                animeList.push(exAnimeList[a]);
                            }         
                        }
                    }
            }
            
            //Überprüft ob Filter 'minEpisodes' vorhanden ist und filtert die Liste danach
            if (count[3] == 0 && count[4] == 1) {
                    for (var b=0; b<exAnimeList.length; b++) {
                        if (exAnimeList[b].episodes >= erg.minEpisodes) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                               if (checkFilter(animeList, exAnimeList[b].name) == 1) {
                                   animeList.push(exAnimeList[b]);
                               }
                        }
                    }
            }
        
            //Überprüft ob Filter 'minEpisodes' und 'maxEpisodes' vorhanden ist und filtert die Liste danach
            if (count[3] == 1 && count[4] == 1) {
                    for (var b=0; b<exAnimeList.length; b++) {
                        //Speichert nur die Animes ein die zwischen minEpisodes und maxEpisodes liegen.
                        if (exAnimeList[b].episodes >= erg.minEpisodes && exAnimeList[b].episodes <= erg.maxEpisodes) {
                            
                            //Überprüft ob ein Anime bereits in der Ergebnisliste vorhanden ist.
                               if (checkFilter(animeList, exAnimeList[b].name) == 1) {
                                   animeList.push(exAnimeList[b]);
                               }
                        }
                    }
            }

            //Wurde kein Ergebnis zum Filter gefunden:
            if (animeList.length == 0) {
                res.render('pages/noResult');
                res.statusCode = 204; //204 weil Anfrage erfolgreich war, aber kein Ergebnis gefunden wurde.
                res.end();

                console.log('NO CONTENT');

            //Rendert die Filter-Ergebnis Seite
            } else {
                res.render('pages/anime',{animeList:animeList,suggestions:suggestions});
                res.end();

                console.log('OK');

            }
        });
    });
    exReq.end();
});

//[OK]
//Gibt einen Anime anhand seines Namens (request-parameter) zurück.
router.get('/anime/:anime_name', function(req, res){

    console.log('GET /anime/' +req.params.anime_name);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/anime/' + req.params.anime_name,
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }

    var refData = [];
    var exReq = http.request(options, function(exRes){
        if( exRes.statusCode != 404 ){

            var animeData;
            var refData = [];
            exRes.on('data', function(chunk){
                animeData = JSON.parse(chunk);
                var refs = animeData.refs;

                exRes.on('end', function(){
                    var ref_ids = [];
                    var tmp = 0;
                    for(var index = 0; index<refs.length; index++){
                        if(refs[index] == '|'){
                            ref_ids.push(refs.substring(tmp,index));
                            tmp = index + 1;
                        }
                    }
                    //Überprüft ob Vorschlag bereits existiert, sonst wird er eingetragen
                    if (check(suggestions, {'name':animeData.name}) == 1) {
                        suggestions.data.push({'name':animeData.name});
                    }
                    refData = ref_ids;
				    res.render('pages/animeID',{animeData:animeData, refData:refData,suggestions:suggestions});
                    res.end();
                });
            });

            console.log('OK');
            
        }else {
            res.statusCode = 404;
            res.render('pages/error');
            res.end();

            console.log('NOT FOUND');

        }
    });
    exReq.end();
});

//[OK]
//Gibt eine Liste aller Benutzer aus.
router.get('/user', function(req, res){

    console.log('GET /user');

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/user',
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }

    var exReq = http.request(options, function(exRes){
        exRes.on('data', function(chunk){
            
            if(exRes.statusCode != 404){
                var userList = JSON.parse(chunk);
                res.render('pages/user',{userList:userList});
                res.end();

                console.log('OK');

            //Wenn keine User in Redis vorhanden sind wird eine leere Seite ausgegeben.
            } else {
                var userList = [];
				res.render('pages/user',{userList:userList});
				res.end();

                console.log('OK - no content');

            }
        });
    });
    exReq.end();
});

//[OK]
//Gibt einen Benutzer anhand seiner ID (request-parameter) zurück.
router.get('/user/:user_id', function(req, res) {

    console.log('GET /user/' +req.params.user_id);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/user/' + req.params.user_id,
        method: 'GET',
        headers:{
            accept:'application/json'
        }
    }

    var exReq = http.request(options, function(exRes){

			if( exRes.statusCode == 200 ){
                exRes.on('data', function(chunk){
                    var userData = JSON.parse(chunk);
                    res.render('pages/userID',{userData:userData});
                    res.end();

                    console.log('OK');

                });
			} else {
                    res.statusCode = 404;
					res.render('pages/error');
					res.end();

                    console.log('NOT FOUND');

			}
    });
    exReq.end();

});

//[OK]
//Gibt die Statistik eines Benutzers aus.
router.get( '/user/:user_id/stats', function(req, res) {

    console.log('GET /user/' + req.params.user_id + '/stats');

	var options = {
			host: 'localhost',
			port: 3000,
			path: '/user/' + req.params.user_id + '/stats',
			method:'GET',
			headers:{
					accept:'application/json'
			}
	}

	var statData;
	var data = '';
	var exReq = http.request(options, function(exRes){
		if ( exRes.statusCode == 200 ){
          exRes.on('data', function(chunk){
                data = chunk;
			});
			exRes.on('end', function(){
                statData = JSON.parse(data);
                res.render('pages/stats',{statData:statData});
				res.end();
            });

            console.log('OK');

		} else {
            res.statusCode = 404;
            res.render('pages/error');
            res.end();

            console.log('NOT FOUND');

		}
    });
    exReq.end();

});

//[OK]
//Gibt eine Liste aller Genres aus.
router.get('/genre', function(req, res) {

    console.log('GET /genre');

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/genre',
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }

    var exReq = http.request(options, function(exRes){
        if( exRes.statusCode == 200 ){
            exRes.on('data', function(chunk){
                var genreList = JSON.parse(chunk);
                res.render('pages/genre',{genreList:genreList});
                res.end();
            });

            console.log('OK');

        } else {
            res.statusCode = 404;
            res.render('pages/error');
            res.end();

            console.log('NOT FOUND');

        }
    });
    exReq.end();
});

//[OK]
//Gibt eine Liste aller Referenzen aus.
router.get('/ref', function(req, res) {

    console.log('GET /ref');

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/ref',
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }

    var exReq = http.request(options, function(exRes) {
        if (exRes.statusCode == 200) {
            exRes.on('data', function(chunk){
                var refList = JSON.parse(chunk);
                res.render('pages/ref',{refList:refList});
                res.end();
            });

            console.log('OK');

        } else {
            res.statusCode = 404;
            res.render('pages/error');
            res.end();

            console.log('NOT FOUND');

        }
    });
    exReq.end();
});

//[OK]
//Öffnet das Formular zur Registrierung.
router.get('/signup', function(req, res){
    console.log('GET /signup');

	res.render('pages/signup');
	res.end();

    console.log('OK');
});

//[OK]
//Überprüft bei der Registrierung ob ein Username bereits vorhanden ist.
router.get('/signup/:user_name', function(req, res){

    console.log('GET /signup/' +req.params.user_name);

	var options = {
		host: 'localhost',
		port: 3000,
		path: '/signup/' + req.params.user_name,
		method: 'GET'
	}

	var exReq = http.request(options, function(exRes){
        res.status(exRes.statusCode).type('json').send();
		res.end();
	});
	exReq.end()

    console.log(res.statusText);
});

//[OK]
//Ruft die Seite zum einloggen auf.
router.get('/login', function(req, res){

    console.log('GET /login');

	res.render('pages/login');
	res.end();

    console.log('OK');
});

//[OK]
//Ruft die Seite zum ausloggen auf (löscht alle von der Seite gesetzten Cookies).
router.get('/logout', function( req, res){

    console.log('GET /logout');

    res.clearCookie('username');
	res.clearCookie('user_id');
    res.clearCookie('active');
    res.clearCookie('authority');
	res.render('pages/index');

    console.log('OK');
});

//[OK]
//Ruft die Seite zum erstellen eines neuen Animes auf.
router.get('/addanime', function( req, res ){

    console.log('GET /addanime');

	var options = {
			host: 'localhost',
			port: 3000,
			path: '/genre',
			method:'GET',
			headers:{
					accept:'application/json'
			}
	}

	var exReq = http.request(options, function(exRes){
		if( exRes.statusCode == 200 ){
            exRes.on('data', function(chunk){
                var genreList = JSON.parse(chunk);

                options.path = '/ref'; //Options Pfad auf '/ref' gesetzt um weiteren Request abzusetzen
                var exReqRef = http.request(options, function( exResRef ){
                    if( exResRef.statusCode == 200 ){
                        exResRef.on('data', function(chunk){
                            var refList = JSON.parse(chunk);
                            res.render('pages/addanime',{genreList:genreList, refList:refList});
                            res.end();
                        });

                        console.log('OK');

                    } else {
                        res.statusCode = 404;
                        res.render('pages/error');
                        res.end();

                        console.log('NOT FOUND');
                    }
                });
                exReqRef.end();
            });
		} else {
            res.statusCode = 404;
            res.render('pages/error');
            res.end();

            console.log('NOT FOUND');

		}
	});
	exReq.end();
});

//[OK]
//Ruft die Seite zum editieren eines spezifischen Animes auf.
router.get('/editanime/:anime_name', function( req, res ){

    console.log('GET /edit/' +req.params.anime_name);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/anime/' + req.params.anime_name,
        method: 'GET',
        headers:{
            accept:'application/json'
        }
  }

    var exReq = http.request(options, function(exRes){
        if( exRes.statusCode == 200 ) {

            var animeData;
            exRes.on('data', function(chunk){
                animeData = JSON.parse(chunk);

                options.path = '/genre'; //Options Pfad auf '/genre' gesetzt um weiteren Request abzusetzen
                var exReqGenre = http.request(options, function(exResGenre){

            		if( exResGenre.statusCode == 200 ){

                        exResGenre.on('data', function(chunk){
            						var genreList = JSON.parse(chunk);

            						options.path = '/ref'; //Options Pfad auf '/ref' gesetzt um weiteren Request
            						var exReqRef = http.request(options, function( exResRef ){

            							if( exResRef.statusCode == 200 ) {
                                            exResRef.on('data', function(chunk){
                                                var refList = JSON.parse(chunk);
            									res.render('pages/editanime',{animeData:animeData, genreList:genreList, refList:refList});
            									res.end();
            								});
                                            console.log('OK');
            							} else {
                                            res.statusCode = 404;
                                            res.render('pages/error');
                                            res.end();

                                            console.log('NOT FOUND');

                                        }
            						});
            						exReqRef.end();
            				});

            		} else {

                        res.statusCode = 404;
                        res.render('pages/error');
                        res.end();

                        console.log('NOT FOUND');

            		}
            	});
            exReqGenre.end();
          });

        } else {

            res.statusCode = 404;
            res.render('pages/error');
            res.end();

            console.log('NOT FOUND');
      }
  });
  exReq.end();
});

//[OK]
//Ruft die Seite zum editieren der Userinformationen auf.
router.get('/edituser/:user_id', function( req, res ){

  console.log('GET /edit/user/' + req.params.user_id);

  var options = {
      host: 'localhost',
      port: 3000,
      path: '/user/' + req.params.user_id,
      method: 'GET',
      headers:{
          accept:'application/json'
      }
}

  var exReq = http.request(options, function(exRes){
      if( exRes.statusCode == 200 ) {

          var userData;
          exRes.on('data', function(chunk){
              userData = JSON.parse(chunk);
              res.render('pages/edituser',{userData:userData});
              res.end();
          });

          console.log('OK');

      } else {

          res.statusCode = 404;
          res.render('pages/error');
          res.end();

          console.log('NOT FOUND');
    }
  });
  exReq.end();

})

//[OK]
//Ruft die seite für die Filtereingabe auf
router.get('/filterform', function(req, res){
  res.render('pages/filter');
  res.end();
})

//[OK]
//Gibt die Anzahl der gesehenen Folgen eines betstimmten Anime aus.
router.get('/user/:user_id/stats/:anime_name', function(req, res){

      console.log('GET /user/' + req.params.user_id + '/stats/' + req.params.anime_name);

  	var options = {
  			host: 'localhost',
  			port: 3000,
  			path: '/user/' + req.params.user_id + '/stats',
  			method:'GET',
  			headers:{
  					accept:'application/json'
  			}
  	}
    var seen_episode = 0;
    var seen_string;
  	var statData = '';
  	var data = '';
  	var exReq = http.request(options, function(exRes){
  		if ( exRes.statusCode == 200 ){
            exRes.on('data', function(chunk){
                  data = JSON.parse(chunk).stats;

  			});
  			exRes.on('end', function(){
          for(var i = 1; i<data.length; i++){
            if( data[i].name.toLowerCase().replace(/ /g, '-') == req.params.anime_name){
              seen_episode = data[i].episodes;
            }
          }
          seen_string += seen_episode;
  				res.send({'seen_episode':seen_episode});
          res.end();
        });

              console.log('OK');

  		} else {

              res.statusCode = 404;
              res.render('pages/error');
              res.end();

              console.log('NOT FOUND');

  		}
      });
      exReq.end();

});

console.log('loaded get.js');
module.exports = router;
