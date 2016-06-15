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
router.delete( '/user/:uID', jsonParser, function(req, res){
     
    db.del('user:'+req.params.uID, function(err, rep){
		if (rep == 1){
			res.status(200).type('text').send('User successfully deleted');
		}  else {
			res.status(404).type('text').send('User not found!');
		}
	});
	
});


console.log('loaded delete.js')


module.exports = router;