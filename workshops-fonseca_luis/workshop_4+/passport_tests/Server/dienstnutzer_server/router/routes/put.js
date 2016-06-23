var router = express.Router();
var querystring = require('querystring');

//[OK]
//Trägt einen neuen Anime in die DB ein.
router.put('/anime', jsonParser, function( req, res){

    var newAnime = req.body;
    db.set('anime:'+newAnime.name.toLowerCase().replace(/ /g,'-'), JSON.stringify(newAnime), function(err, rep) {
        res.status(201).type('text').send('new anime: ' +newAnime.name);
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
				res.status(200).type('json').send(updatedAnime);
			});
		} else {
			res.status(404).type('text').send('Anime not exists!');
        }

	});
});

//[OK]
//Trägt einen neuen Benutzer in die DB ein.
router.put('/user', jsonParser, function(req, res){
  console.log("IN USER PUT");
  console.log("req.body: " + JSON.stringify(req.body));
  console.log('');
  var newUser = req.body;
  //
  var bodyString = JSON.stringify(newUser);
  //
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
        console.log('Response: ' + chunk);
        console.log('StatusCode: ' + put_res.statusCode);
        console.log('StatusText: ' + JSON.parse(chunk).user_id);
        resBody = {"user_id":JSON.parse(chunk).user_id};
        console.log(resBody);
        console.log('--------------------------------------');
    });
    put_res.on("end", function(){
      res.status(201).type('json').send(resBody);
    })
  });
  put_req.write(bodyString);
  put_req.end();
});
  //Inkrement wird nicht zurückgesetzt wenn bspw. alle User gelöscht werden!!!
// 	db.incr('user_id:user', function (err, rep) {
//
// 		newUser.user_id = rep;
// 		db.set('user:'+newUser.user_id, JSON.stringify(newUser), function(err, rep) {
// 			res.status(201).type('text').send('new user: ' +newUser.user_id);
// 		});
// 	});
// });

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
});

router.put('/user_reg', jsonParser, function(req, res){

    var newAuth = req.body;
    console.log(newAuth);
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
      console.log("StatusCode for User Reqgistration: " + pwd_res.statusCode);
      pwd_res.on('data', function (chunk){
        result += chunk;
      });
      pwd_res.on('end', function(){
        console.log(result);
        pwd_req.end();
      });
      pwd_res.on('error', function(err){
        console.log(err);
      });
    });
    pwd_req.write(postData);
    pwd_req.end();
    res.sendStatus(200);
});

router.put('/login', jsonParser, function(req, res){


  var tmp = 0;
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
    user_id_res.on('data', function(chunk){
      var userList = JSON.parse(chunk);
      for(var i = 0; i<userList.length;i++){
        if(userList[i].username == req.body.username){
          console.log(userList[i].user_id);
          tmp = userList[i].user_id;
        }
      }
    });
    user_id_res.on('end',function(){
      console.log(tmp);
      newAuth.user_id = tmp;
      console.log(newAuth);
      var postData = querystring.stringify({
        username: newAuth.username,
        password: newAuth.password
      });
      console.log(postData);
      var options = {
        host: "localhost",
        port: 3000,
        path: "/login",
        method: "PUT",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };
      var pwd_req = http.request(options, function(pwd_res){
        var result = '';
        console.log("StatusCode: " + pwd_res.statusCode);
        pwd_res.on('data', function (chunk){
          result += chunk;
        });
        pwd_res.on('end', function(){
          console.log(result);
          pwd_req.end();
        });
        pwd_res.on('error', function(err){
          console.log(err);
        });
      });
      pwd_req.write(postData);
      pwd_req.end();
      res.cookie('username', newAuth.username);
      res.cookie('user_id', tmp);
      res.sendStatus(200);
    });
  });

  user_id_req.end();
});


console.log('loaded put.js.')
module.exports = router;
