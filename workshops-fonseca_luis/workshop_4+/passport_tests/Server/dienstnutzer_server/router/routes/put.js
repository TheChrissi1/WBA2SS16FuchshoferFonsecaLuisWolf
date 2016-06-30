var router = express.Router();
var querystring = require('querystring');


//[OK]
//Eintragen eines neuen Animes über Dienstgeber
router.put('/anime', jsonParser, function( req, res){

    var newAnime = req.body;
    var bodyString = JSON.stringify(newAnime);

    newAnime.checked = false;

    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime",
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var resBody;
    var put_req = http.request(options, function (put_res) {
        put_res.on("data", function (chunk) {
        });

        if (put_res.statusCode != 201) {
            put_res.on("end", function() {
                res.status(422).type('text').send('Anime does already exist');
            });
        } else {
            put_res.on("end", function(){
                res.status(201).type('json').send('Anime added');
            });
        }
    });
    put_req.write(bodyString);
    put_req.end();

});

//[OK]
// Ändert die Daten eines Animes.
router.put( '/anime/:anime_name', jsonParser, function(req, res){

    var editAnime = req.body;
    var bodyString = JSON.stringify(editAnime);

    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime/"+req.params.anime_name,
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var resBody;
    var put_req = http.request(options, function (put_res) {
        put_res.on("data", function (chunk) {
        });

        //Falls Anime nicht existiert:
        if (put_res.statusCode != 200) {
            put_res.on("data", function (chunk) {
            });

            put_res.on("end", function() {
                res.status(404).type('text').send('Anime does not exists');
            });

        //Wenn Anime existiert:
        } else {
            put_res.on("data", function (chunk) {
                resBody = {"anime name":JSON.parse(chunk).name};
            });

            put_res.on("end", function(){
                //Anfrage war erfolgreich, Response enthält aber bewusst keine Daten!
                res.status(200).type('json').send(resBody);
            });
        }
    });
    put_req.write(bodyString);
    put_req.end();
});

//[OK]
//Trägt einen neuen Benutzer über den Dienstgeber ein.
router.put('/user', jsonParser, function(req, res){

    var newUser = req.body;
    var bodyString = JSON.stringify(newUser);

    var options = {
        host: "localhost",
        port: 3000,
        path: "/user",
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        }
    };

    var resBody;
    var put_req = http.request(options, function (put_res) {
        put_res.on("data", function (chunk) {
            resBody = {"user_id":JSON.parse(chunk).user_id};
        });

        put_res.on("end", function(){
            res.status(201).type('json').send(resBody);
        })
    });
    put_req.write(bodyString);
    put_req.end();
});


//[OK]
//Ändert die Daten eines Benutzers.
router.put( '/user/:user_id', jsonParser, function(req, res){

    var editUser = req.body;
    var bodyString = JSON.stringify(editUser);

    var options = {
        host: "localhost",
        port: 3000,
        path: "/user/"+req.params.user_id,
        method:"PUT",
        headers: {
             'Content-Type': 'application/json',
             'Content-Length': bodyString.length
        }
    };
    var resBody;
    var put_req = http.request(options, function (put_res) {

        //Falls User nicht existiert:
        if (put_res.statusCode != 200) {
            put_res.on("data", function (chunk) {
                resBody = "error: " +chunk;
            });

            put_res.on("end", function() {
                res.status(400).type('json').send(resBody);
            });
        //Wenn User existiert:
        } else {
            put_res.on("data", function (chunk) {
                resBody = {"user id":JSON.parse(chunk).id};
            });

            put_res.on("end", function(){
                //Anfrage war erfolgreich, Response enthält aber bewusst keine Daten!
                res.status(204).type('json').send(resBody);
            });
        }
    });
    put_req.write(bodyString);
    put_req.end();

});

//[NOT OK]
//Ändert die Statistik eines Nutzers.
router.put( '/user/:user_id/stats', jsonParser, function(req, res){
  // // console.log("Updated Stats for ID: " + req.params.user_id);
  var newStat = JSON.stringify(req.body);
  var url = '/user/'+req.params.user_id+'/stats';
  // // console.log(url);
  var options = {
      host: "localhost",
      port: 3000,
      path: "/user/" + req.params.user_id + "/stats",
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': newStat.length
      }
  };
  // // console.log(options);
  var statReq = http.request(options, function( statRes ){
    statRes.on("data", function(chunk){

    });
    statRes.on("end", function(){
      res.sendStatus(201);
    });
  });
  statReq.write(newStat);
  statReq.end();
});

router.put('/user_reg', jsonParser, function(req, res){
  console.log(req.body);
  var newAuth = req.body;
  // // console.log(newAuth);
  var postData = querystring.stringify({
    username: newAuth.username,
    password: newAuth.password
  });

  var options = {
    host: "localhost",
    port: 3000,
    path: "/signup",
    method: "PUT",
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };
  var pwd_req = http.request(options, function(pwd_res){
    var result = '';
    // // console.log("StatusCode for User Reqgistration: " + pwd_res.statusCode);
    pwd_res.on('data', function (chunk){
      result += chunk;
    });
    pwd_res.on('end', function(){
      console.log(result);
    });
    pwd_res.on('error', function(err){
      // // console.log(err);
    });
  });
  pwd_req.write(postData);
  pwd_req.end();
  res.sendStatus(200);
});

router.put('/login', jsonParser, function(req, res){


  var tmp = 0;
  var active = false;
  var authority = 4;
  var newAuth = {
    "username": req.body.username,
    "password": req.body.password,
    "user_id": tmp
  };
  var user_id_req = http.request({
    host: "localhost",
    port: 3000,
    path: "/user",
    method: "GET",
    headers: {
      accept: 'application/json'
    }
  }, function( user_id_res ){
    // // console.log(user_id_res.statusCode);
    if(user_id_res.statusCode != 404){
      user_id_res.on('data', function(chunk){
        var userList = JSON.parse(chunk);
        for(var i = 0; i<userList.length;i++){
          if(userList[i].username == req.body.username){
            // // console.log("UserID Found: " + userList[i].user_id);
            tmp = userList[i].user_id;
            active = userList[i].active;
            authority = userList[i].authority;
          }
        }
      });
      user_id_res.on('end',function(){
        // // console.log(tmp);
        newAuth.user_id = tmp;
        // // console.log(newAuth);
        console.log(active);
        // // console.log(postData);
        var options = {
          host: "localhost",
          port: 3000,
          path: "/login",
          method: "PUT",
          headers:{
            'Content-Type': 'application/json'
          }
        };
        var pwd_req = http.request(options, function(pwd_res){
          var result = '';
          // // console.log("StatusCode: " + pwd_res.statusCode);
          pwd_res.on('data', function (chunk){
            result += chunk;
          });
          pwd_res.on('end', function(){
            if(pwd_res.statusCode == 204){
              if(active == true){
                res.cookie('username', newAuth.username);
                res.cookie('user_id', tmp);
                res.cookie('active', active);
                res.cookie('authority', authority);
                res.status(200).end();
              } else {
                res.status(423).end("Account deactivated!");
              }
            } else if(pwd_res.statusCode == 423){
              res.status(401).end("Wrong Password!");
            } else if(pwd_res.statusCode == 404){
              res.status(404).end("User not found!");
            }
          });
          pwd_res.on('error', function(err){
            // // console.log(err);
          });
        });
        pwd_req.end(JSON.stringify(newAuth));
      });
    } else {
      res.sendStatus(404);
    }
  });

  user_id_req.end();
});


// // console.log('loaded put.js.')
module.exports = router;
