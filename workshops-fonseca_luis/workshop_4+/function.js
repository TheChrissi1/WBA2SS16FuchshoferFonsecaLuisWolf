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
