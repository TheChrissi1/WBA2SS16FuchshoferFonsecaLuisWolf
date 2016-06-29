var router = express.Router();

//[OK]
//Löscht einen Anime aus der DB.
router.delete( '/anime/:anime_name', jsonParser, function(req, res){
	console.log('DELETE /anime/' + req.params.anime_name);
	db.del('anime:'+req.params.anime_name, function(err, rep){
		if(err) throw err;
		if (rep == 1){
			res.sendStatus(410);

			console.log('GONE');

		}  else {
			res.status(404).type('text').send('Anime not found!');

			console.log('NOT FOUND');

		}
	});
});

//[OK]
//Löscht einen User aus der DB.
//--> Inkrement der uID wird nicht gelöscht!! Nach vollständigem löschen wird trotzdem ab letzter uID weitergezählt.
router.delete( '/user/:user_id', jsonParser, function(req, res){
	console.log('DELETE /user/' + req.params.user_id);
  db.get('user:'+req.params.user_id, function(err, rep) {
		if(err) throw err;
      if (rep) {
          var user = JSON.parse(rep);
          user.active = false;
          db.set('user:' +req.params.user_id, JSON.stringify(user), function(err) {
						if(err) throw err;
            res.sendStatus(423);

						console.log('LOCKED');

          });

          //res.status(200).type('text').send('User deactivated!');
      } else {
          res.status(404).type('text').send('User not found!');

					console.log('NOT FOUND');

      }
  })
});


// // console.log('loaded delete.js')


module.exports = router;
