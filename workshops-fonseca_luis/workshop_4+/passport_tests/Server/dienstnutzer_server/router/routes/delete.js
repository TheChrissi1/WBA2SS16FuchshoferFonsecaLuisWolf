var router = express.Router();

//[OK]
//Löscht einen Anime über den Dienstgeber.
router.delete( '/anime/:anime_name', jsonParser, function(req, res){


    var options = {
        host: "localhost",
        port: 3000,
        path: "/anime/"+req.params.anime_name,
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    };

   
    var resBody;
    var delete_req = http.request(options, function (delete_res) {
        
        //Falls Anime nicht existiert:
        if (delete_res.statusCode != 200) {
            delete_res.on("data", function (chunk) {
                resBody = "error: " +chunk;
            });

            delete_res.on("end", function() {
                res.status(404).type('json').send(resBody);
            });

        //Wenn Anime existiert:
        } else {
            delete_res.on("data", function (chunk) {
                //resBody = {"anime name":JSON.parse(chunk).name};
                resBody = "success: " +chunk;
            });

            delete_res.on("end", function(){
                //Anfrage war erfolgreich, Response enthält aber bewusst keine Daten!
                res.status(204).type('json').send(resBody);
            });
        }
    });
    //put_req.write(bodyString);
    delete_req.end();

});

//[OK]
//Löscht einen User aus der DB.
//--> Inkrement der uID wird nicht gelöscht!! Nach vollständigem löschen wird trotzdem ab letzter uID weitergezählt.
router.delete( '/user/:user_id', jsonParser, function(req, res){
   
    var options = {
        host: "localhost",
        port: 3000,
        path: "/user/"+req.params.user_id,
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    };
  
    var resBody;
    var delete_req = http.request(options, function (delete_res) {
        
        //Falls User nicht existiert:
        if (delete_res.statusCode != 200) {
            delete_res.on("data", function (chunk) {
                resBody = "error: " +chunk;
            });

            delete_res.on("end", function() {
                res.status(404).type('json').send(resBody);
            });

        //Wenn Anime existiert:
        } else {
            delete_res.on("data", function (chunk) {
                //resBody = {"user id":JSON.parse(chunk).id};
                resBody = "success: " +chunk;
            });

            delete_res.on("end", function(){
                //Anfrage war erfolgreich, Response enthält aber bewusst keine Daten!
                res.status(204).type('json').send(resBody);
            });
        }
    });
    //put_req.write(bodyString);
    delete_req.end();

/*    
    db.del('user:'+req.params.user_id, function(err, rep){
		if (rep == 1){
			res.status(200).type('text').send('User successfully deleted');
		}  else {
			res.status(404).type('text').send('User not found!');
		}
	});
*/

});


// // console.log('loaded delete.js')


module.exports = router;
