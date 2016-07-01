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
                res.render('pages/anime',{animeList:animeList,suggestions:suggestions});
                res.end();
            });

            console.log('OK');

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

    var tmp = 0;
    var countEpisodes = 0;
    var countGenre = 0;
    var countName = 0;
    var countMax = 0;
    var countMin = 0;
    var query = req.params.para;
    var queryL = query.length;

    //Bestimmt die Anzahl vom substring 'episodes'
    var tmpEpisodes = query;
    for (var t=0; t<tmpEpisodes.length; t++ ) {
        var posEpi;
        tmpEpisodes = tmpEpisodes.substr(posEpi+t,tmpEpisodes.length);
        posEpi = tmpEpisodes.indexOf('episodes');
        if (posEpi == -1) {
            break;
        } else {
            countEpisodes++;
        }
    }

    //Bestimmt die Anzahl vom substring 'genre'
    var tmpGenre = query;
    for (var u=0; u<tmpGenre.length; u++ ) {
        var posGen;
        tmpGenre = tmpGenre.substr(posGen+u,tmpGenre.length);
        posGen = tmpGenre.indexOf('genre');
        if (posGen == -1) {
            break;
        } else {
            countGenre++;
        }
    }

     //Bestimmt die Anzahl vom substring 'name'
    var tmpName = query;
    for (var t=0; t<tmpName.length; t++ ) {
        var posName;
        tmpName = tmpName.substr(posName+t,tmpName.length);
        posName = tmpName.indexOf('name');
        if (posName == -1) {
            break;
        } else {
            countName++;
        }
    }

    //Bestimmt die Anzahl vom substring 'maxEpisodes'
    var tmpMax = query;
    for (var t=0; t<tmpMax.length; t++ ) {
        var posMax;
        tmpMax = tmpMax.substr(posMax+t,tmpMax.length);
        posMax = tmpMax.indexOf('maxEpisodes');
        if (posMax == -1) {
            break;
        } else {
            countMax++;
        }
    }

    //Bestimmt die Anzahl vom substring 'minEpisodes'
    var tmpMin = query;
    for (var t=0; t<tmpMin.length; t++ ) {
        var posMin;
        tmpMin = tmpMin.substr(posMin+t,tmpMin.length);
        posMin = tmpMin.indexOf('minEpisodes');
        if (posMin == -1) {
            break;
        } else {
            countMin++;
        }
    }

    //Entfernt das '?' an pos[0] aus dem string
    query = query.substr(1,query.length);

    //Parst den querystring in ein Objekt
    var erg = queryString.parse(query);


    //Request auf den Dienstgeber

    //Da im 'erg'-Objekt sowohl arrays als auch normale variablenzuweisungen vorkommen können, muss über die Anzahl
    //der im querystring vorkommenden Parameter (countEpisodes, count...) auf den Wert der Parameter zugegriffen werden.

    var exReq = http.request(options, function(exRes){

        exRes.on('data', function(chunk){

            //Animeliste aus dem Dienstgeber
            var exAnimeList = JSON.parse(chunk);
            //Neue Animeliste
            var animeList = [];

            // Überprüfen ob Filter 'Episodes' mit mindestens einem Anime übereinstimmt.
            if (countEpisodes == 1) {
                    for (var i=0; i<exAnimeList.length; i++) {
                        if (exAnimeList[i].episodes == erg.episodes) {
                            animeList.push(exAnimeList[i]);


                        }
                    }
            } else if( countEpisodes > 1) {
                for (var j=0; j<=countEpisodes; j++) {
                    for (var k=0; k<exAnimeList.length; k++) {
                        if (exAnimeList[k].episodes == erg.episodes[j]) {
                            animeList.push(exAnimeList[k]);


                        }
                    }
                }
            }
            //Überprüft ob Filter 'maxEpisodes' vorhanden ist und filtert die Liste danach
            if (countMax == 1) {
                    for (var a=0; a<exAnimeList.length; a++) {
                        if (exAnimeList[a].episodes <= erg.maxEpisodes) {
                            animeList.push(exAnimeList[a]);


                        }
                    }
            }
            //Überprüft ob Filter 'minEpisodes' vorhanden ist und filtert die Liste danach
            if (countMin == 1) {
                    for (var b=0; b<exAnimeList.length; b++) {
                        if (exAnimeList[b].episodes >= erg.minEpisodes) {
                            animeList.push(exAnimeList[b]);


                        }
                    }
            }
            // Überprüfen ob Filter 'Genre' mit mindestens einem Anime übereinstimmt.
            if (countGenre == 1) {
                    for (var m=0; m<exAnimeList.length; m++) {
                        if (exAnimeList[m].genre.indexOf(erg.genre) > -1) {
                            animeList.push(exAnimeList[m]);


                        }
                    }

            } else if (countGenre > 1) {
                for (var n=0; n<=countGenre; n++) {
                    for (var o=0; o<exAnimeList.length; o++) {
                        if (exAnimeList[o].genre.indexOf(erg.genre[n]) > -1) {
                            animeList.push(exAnimeList[o]);


                        }
                    }
                }
            }

            // Überprüfen ob Filter 'Name' mit mindestens einem Anime übereinstimmt.
            if (countName == 1) {
                    for (var m=0; m<exAnimeList.length; m++) {
                        //Alle 3 möglichen Namen eines Animes werden verglichen
                        if (exAnimeList[m].name.indexOf(erg.name) > -1 || exAnimeList[m].name_en.indexOf(erg.name) > -1 ||      exAnimeList[m].name_de.indexOf(erg.name) > -1){
                            animeList.push(exAnimeList[m]);


                        }
                    }

            } else if (countName > 1) {
                for (var n=0; n<=countName; n++) {
                    for (var o=0; o<exAnimeList.length; o++) {
                        //Alle 3 möglichen Namen eines Animes werden verglichen
                        if (exAnimeList[o].name.indexOf(erg.name[n]) > -1 || exAnimeList[o].name_en.indexOf(erg.name[n]) > -1 || exAnimeList[o].name_de.indexOf(erg.name[n]) > -1) {
                            animeList.push(exAnimeList[o]);


                        }
                    }
                }
            }

            if (animeList == '') {
                res.statusCode = 204;
                res.render('pages/noResult');
                res.end();

                console.log('NO CONTENT');

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
