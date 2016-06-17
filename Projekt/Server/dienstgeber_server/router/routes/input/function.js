///////// PUT GENRE ONLY ONCE /////////////////
/*router.put('/genre', jsonParser, function( req, res ){
    
    var genre = require('./genre.json');
    genre = genre.genre;
    genre.forEach(function(val){
        db.rpush(['genre', JSON.stringify(val)]);
    })
    res.status(201).type('text').send('added');
});*/
///////////////////////////////////////////////
///////// PUT REFS ONLY ONCE /////////////////
router.put('/refs', jsonParser, function( req, res ){
    
    var refs = require('./references.json');
    refs = refs.reference;
    refs.forEach(function(val){
        db.set('refs:' + val.name, JSON.stringify(val), function(err, rep) {
				res.status(200).type('json').send(val);
        });
    })
    res.status(201).type('text').send('added');
});
///////////////////////////////////////////////