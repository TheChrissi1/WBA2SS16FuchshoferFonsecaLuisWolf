var router = express.Router();

var querystring = require('querystring');



//[OK]
//Eintragen eines neuen Animes in Redis.
router.put('/anime', jsonParser, function( req, res){

    console.log('PUT /anime');

    var newAnime = req.body;
    var bodyString = JSON.stringify(newAnime);

    newAnime.checked = false;

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/anime',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var resBody;
    var data;
    var exReq = http.request(options, function (exRes) {
        exRes.on('data', function (chunk) {
            //resBody = {'name':JSON.parse(chunk).name};
            data = chunk;
        });

        if (exRes.statusCode == 201) {
            exRes.on('end', function(){
                resBody = {'name':JSON.parse(data).name};
                res.status(201).type('json').send(resBody);
            });

            console.log('CREATED');

        } else {
            exRes.on('end', function() {
                res.status(422).type('text').send('Anime does already exist');
            });

            console.log('UNPROCESSABLE ENTITY');
        }
    });
    exReq.write(bodyString);
    exReq.end();

});

//[OK]
// Ändert die Daten eines Animes.
router.put( '/anime/:anime_name', jsonParser, function(req, res){

    console.log('PUT /anime/' +req.params.anime_name);

    var editAnime = req.body;
    var bodyString = JSON.stringify(editAnime);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/anime/'+req.params.anime_name,
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var resBody;
    var exReq = http.request(options, function (exRes) {
        exRes.on('data', function (chunk) {
        });

        //Wenn Anime existiert:
        if (exRes.statusCode == 200) {
            exRes.on('data', function (chunk) {
                resBody = {'anime name':JSON.parse(chunk).name};
            });
            exRes.on('end', function() {
                res.status(200).type('json').send(resBody);
            });
            console.log('OK');

        //Falls Anime nicht existiert:
        } else {
            exRes.on('data', function (chunk) {
            });

            exRes.on('end', function() {
                res.status(404).type('text').send('Anime does not exists');
            });

            console.log('NOT FOUND');
        }
    });
    exReq.write(bodyString);
    exReq.end();
});

//[OK]
//Eintragen eines neuen Benutzers in Redis.
router.put('/user', jsonParser, function(req, res){

    console.log('PUT /user');

    var bodyString = JSON.stringify(req.body);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/user',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var resBody;
    var exReq = http.request(options, function (exRes) {

        exRes.on('data', function (chunk) {
            data = chunk;
        });

        if (exRes.statusCode == 201) {
            exRes.on('end', function() {
                resBody = {'user_id':JSON.parse(data).user_id};
                res.status(201).type('json').send(resBody);
            });

            console.log('CREATED');

        } else {
            exRes.on('end', function() {
                res.status(422).type('text').send('User does already exist');
            });

            console.log('UNPROCESSABLE ENTITY');
        }

    });
    exReq.write(bodyString);
    exReq.end();
});

//[OK]
//Ändert die Daten eines Benutzers.
router.put( '/user/:user_id', jsonParser, function(req, res){

    console.log('PUT /user/' +req.params.user_id);

    var editUser = req.body;
    var bodyString = JSON.stringify(editUser);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/user/'+req.params.user_id,
        method: 'PUT',
        headers: {
             'Content-Type': 'application/json'
        }
    };

    var resBody;
    var exReq = http.request(options, function (exRes) {

        //Wenn User existiert:
        if (exRes.statusCode == 200) {
            exRes.on('data', function (chunk) {
                resBody = {'user id':JSON.parse(chunk).id};
            });

            exRes.on('end', function(){
                res.status(204).type('json').send(resBody);
            });

            console.log('NO CONTENT');

        //Falls User nicht existiert:
        } else {
            exRes.on('data', function (chunk) {
                resBody = 'error: ' +chunk;
            });

            exRes.on('end', function() {
                res.status(404).type('json').send(resBody);
            });

            console.log('NOT FOUND');

        }
    });
    exReq.write(bodyString);
    exReq.end();

});

//[OK]
//Ändert die Statistik eines Nutzers.
router.put( '/user/:user_id/stats', jsonParser, function(req, res){

    console.log('PUT /user'+req.params.user_id +'/stats');

    var newStat = JSON.stringify(req.body);

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/user/' + req.params.user_id + '/stats',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': newStat.length
        }
    };

  var statReq = http.request(options, function( statRes ){
      statRes.on('data', function(chunk){

      });
      statRes.on('end', function(){
          res.sendStatus(200);
      });

      console.log('OK');

  });
  statReq.write(newStat);
  statReq.end();
});

//[OK]
//Speichert das Passwort eines neuen Benutzers in Redis.
router.put('/signup', jsonParser, function(req, res){

    console.log('PUT /signup');

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/signup',
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        }
    };

    var exReq = http.request(options, function(exRes){

        exRes.on('data', function (chunk){

        });
        res.sendStatus(exRes.statusCode);
        console.log(exRes.statusText);
    });
    exReq.write(req.body);
    exReq.end();
});

//[OK]
//Verifiziert einen Benutzer für den Zugriff auf sein Profil (Statistik)
router.put('/login', jsonParser, function(req, res){

    console.log('PUT /login');

    var tmp = 0;
    var active = false;
    var authority = 4;
    var newAuth = {
        'username': req.body.username,
        'password': req.body.password,
        'user_id': tmp
    };

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/user',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };


    var exReqUser = http.request(options, function( exResUser ) {

        if(exResUser.statusCode == 200) {
            exResUser.on('data', function(chunk) {
                var userList = JSON.parse(chunk);
                for(var i = 0; i<userList.length;i++) {
                    if(userList[i].username == req.body.username) {
                        tmp = userList[i].user_id;
                        active = userList[i].active;
                        authority = userList[i].authority;
                    }
                }
            });
            exResUser.on('end',function() {
                newAuth.user_id = tmp;
                var postData = querystring.stringify({
                    username: newAuth.username,
                    password: newAuth.password
                });

                options.path = '/login'; //Options Pfad auf '/login' gesetzt um weiteren Request abzusetzen
                options.method = 'PUT';  //Options Methode auf 'PUT' gesetzt um weiteren Request abzusetzen

                var exReqLogin = http.request(options, function(exResLogin){
                    exResLogin.on('data', function (chunk){

                    });

                    exResLogin.on('end', function(){
                        if(exResLogin.statusCode != 404){
                            if(active == true){
                                res.cookie('username', newAuth.username);
                                res.cookie('user_id', tmp);
                                res.cookie('active', active);
                                res.cookie('authority', authority);
                                res.status(200).end();

                                console.log('OK');

                            } else {
                                res.status(423).end('Account deactivated!');

                                console.log('LOCKED');

                            }
                        } else if(exResLogin.statusCode == 423){
                            res.status(401).end('Wrong password!');

                            console.log('UNAUTHORIZED');

                        } else if(exResLogin.statusCode == 404){
                            res.status(404).end('User not found!');

                            console.log('NOT FOUND1234');
                        }
                        exReqLogin.end();
                    });
                });
                exReqLogin.end(JSON.stringify(newAuth));
            });
        } else {
            res.sendStatus(404);
            console.log('NOT FOUND');
        }
    });
    exReqUser.end();
});


console.log('loaded put.js.')
module.exports = router;
