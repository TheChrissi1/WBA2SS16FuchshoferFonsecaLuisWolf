var router = express.Router();

//[OK]
//Löscht einen Anime aus der DB.
router.delete( '/anime/:anime_name', jsonParser, function(req, res){

	db.del('anime:'+req.params.anime_name, function(err, rep){
        
		if (rep == 1){
			res.status(200).type('text').send('Anime successfully deleted');
		}  else {
			res.status(404).type('text').send('Anime not found!');
		}
	});
});

//[OK]
//Löscht einen User aus der DB.
//--> Inkrement der uID wird nicht gelöscht!! Nach vollständigem löschen wird trotzdem ab letzter uID weitergezählt.
router.delete( '/user/:user_id', jsonParser, function(req, res){

    db.get('user:'+req.params.user_id, function(err, rep) {
        
        if (rep) {
            var user = JSON.parse(rep);
            user.active = false;
            db.set('user:' +req.params.user_id, JSON.stringify(user), function(err, rep) {
                res.status(200).type('text').send('User deactivated!');
            });
            
            //res.status(200).type('text').send('User deactivated!');
        } else {
            res.status(404).type('text').send('User not found!');
        }
    })


});


// // console.log('loaded delete.js')


module.exports = router;
