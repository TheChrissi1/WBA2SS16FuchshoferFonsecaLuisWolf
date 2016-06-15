global.express = require('express');
var app = express();

app.set('view engine', 'ejs');
global.redis = require( 'redis' );
global.db = redis.createClient(); //Creates a new Client

global.bodyParser = require('body-parser');
global.jsonParser = bodyParser.json();

app.set('port', 8080);

console.log('*************************************');
console.log('***** Dienstnutzer Server (EJS) *****');
console.log('*************************************');



app.listen(app.get('port'), function() {
    console.log('ALL FILES LOADED');
    console.log( 'EJS ready on http://127.0.0.1:' + app.get('port'));
});

 db.on('connect', function(){
		console.log('Redis DB connected');
        console.log('--------------------------------------');
 });

 
router = require('./router')(app);


// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;