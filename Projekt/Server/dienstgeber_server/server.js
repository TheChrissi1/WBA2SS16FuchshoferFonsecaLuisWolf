global.express = require('express');
var app = express();
global.redis = require( 'redis' );
global.db = redis.createClient(); //Creates a new Client


global.bodyParser = require('body-parser');
global.jsonParser = bodyParser.json();


global.cookieParser = require('cookie-parser');
global.bcrypt = require('bcryptjs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));


app.set('port', 3000);

console.log('**************************************');
console.log('**** Dienstgeber Server (Express) ****');
console.log('**************************************');



app.listen(app.get('port'), function() {
    console.log('ALL FILES LOADED');
    console.log( 'Express ready on http://127.0.0.1:' + app.get('port'));
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
