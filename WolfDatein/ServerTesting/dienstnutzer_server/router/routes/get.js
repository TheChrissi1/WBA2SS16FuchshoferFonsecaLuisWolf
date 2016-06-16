var router = express.Router();

var ejs = require('ejs');
var fs = require('fs');
var http = require('http');


//[OK]
//Index

router.get('/', function(req, res){
	console.log('Richtig');
	res.render('pages/index.ejs');
    console.log('Projekt der TH Köln, Medieninformatik 4. Semester.');
});


//[OK]
//Gibt eine Liste aller Animes aus.
router.get('/anime', function(req, res){

	console.log('JOO');
	fs.readFile('views/pages/anime.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {

		var options = {
				host: 'localhost',
				port: 3000,
				path: '/anime',
				method:'GET',
				headers:{
						accept: 'application/json'
				}
		}
		console.log('JOO2');
		var externalRequest = http.request(options, function(externalResponse) {
				console.log('connected');
				externalResponse.on('data', function(chunks) {

						var animedata = JSON.parse(chunks);

						var html = ejs.render(filestring, animedata);
						res.setHeader('contet-type', 'text/html');
						res.writeHeader(200);
						res.write(html);
						res.end();

				});
		});
		externalRequest.end();
}
	});

});
//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
router.get('/anime/:anime_name', jsonParser, function(req, res){

    db.get('anime:'+req.params.anime_name, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('Anime not found!');
		}
	});

});

//[OK] - kein json format?
//Gibt eine Liste aller Benutzer aus.

router.get('/user', jsonParser, function(req, res){
	console.log('JOO');
	fs.readFile('./user.ejs', {encoding: 'uft-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {

		var options = {
				host: 'localhost',
				port: 3000,
				path: '/user',
				method:'GET',
				headers:{
						accept: 'application/json'
				}
		}
		console.log('JOO2');
		var externalRequest = http.request(options, function(externalResponse) {
				console.log('connected');
				externalResponse.on('data', function(chunks) {
						var anime = JSON.parse(chunks);

						var html = ejs.render(filestring, useredata);
						res.setHeader('contet-type', 'text/html');
						res.writeHeader(200);
						res.write(html);
						res.end();

				});
		});
		externalRequest.end();
}
	});

});

//[OK]
//Gibt einen Anime anhand seines Namens (querry-parameter) zurück.
router.get('/anime/:anime_name', jsonParser, function(req, res){

		db.get('anime:'+req.params.anime_name, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('Anime not found!');
		}
	});

});
//[OK]
//Gibt einen Benutzer anhand seiner ID (querry-parameter) zurück.
router.get('/user/:uID', jsonParser, function(req, res){

    db.get('user:'+req.params.uID, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('User not found!');
		}
	});

});

//[OK]
//Gibt die Statistik eines Benutzers aus.
router.get( '/user/:uID/stats', jsonParser, function(req, res){


    db.get('stats:'+req.params.uID, function(err, rep) {

		if (rep) {
			res.status(200).type('json').send(rep);
		} else {
			res.status(404).type('text').send('Stats/User not found!');
		}
	});


});

//[NOT OK]
//Gibt eine Liste der Genres aus.
router.get('/genre', jsonParser, function(req, res) {


});

//[NOT OK]
//Gibt eine Liste der Referenzen aus.
router.get('/ref', jsonParser, function(req, res) {


});

//[NOT OK]
//Gibt Informationen zu einer Referenz aus.
router.get('/ref/:refID', jsonParser, function(req, res) {


});

//[NOT OK]
//Gibt eine spezifizierung der Animetabelle aus.
router.get('/anime/filter/:para', jsonParser, function(req, res) {

    //Anhand der querry parameter kann die profil.json nach bestimmten
    //kriterien wie genre, anzahl folgen etc. durchsucht werden.
    // localhost.de/anime/filter/?genre=action&folgen=500

});


console.log('loaded get.js');
module.exports = router;
