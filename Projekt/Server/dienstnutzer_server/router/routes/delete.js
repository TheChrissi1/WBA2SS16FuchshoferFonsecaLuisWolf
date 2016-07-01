var router = express.Router();

//[OK]
//Löscht einen Anime über den Dienstgeber.
router.delete( '/anime/:anime_name', jsonParser, function(req, res){

  console.log('DELETE /anime/' +req.params.anime_name);

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
        if (delete_res.statusCode != 410) {
            delete_res.on("data", function (chunk) {
            });

            delete_res.on("end", function() {
                res.status(404).type('text').send('Anime not Found');
            });

        //Wenn Anime existiert:
        } else {
            delete_res.on("data", function (chunk) {
            });

            delete_res.on("end", function(){
                //Anfrage war erfolgreich, Response enthält aber bewusst keine Daten!
                res.status(410).type('text').send('Anime deleted');

                console.log('GONE');

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
  console.log('DELETE /user/' + req.params.user_id);
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
        if (delete_res.statusCode != 423) {
            delete_res.on("data", function (chunk) {
            });

            delete_res.on("end", function() {
                res.status(404).type('text').send('User not found');

                console.log('NOT FOUND');

            });

        //Wenn Anime existiert:
        } else {
            delete_res.on("data", function (chunk) {
            });

            delete_res.on("end", function(){
                //Anfrage war erfolgreich, Response enthält aber bewusst keine Daten!
                res.status(423).type('text').send('User deactivated');

                console.log('LOCKED');

            });
        }
    });
    //put_req.write(bodyString);
    delete_req.end();


});



console.log('loaded delete.js')

module.exports = router;
