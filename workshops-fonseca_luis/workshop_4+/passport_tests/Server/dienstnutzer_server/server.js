global.express = require('express');
var app = express();
//////////////
global.path = require('path');
/////////////
app.set('view engine', 'ejs');
global.redis = require( 'redis' );
global.db = redis.createClient(); //Creates a new Client

global.http = require('http');

global.bodyParser = require('body-parser');
global.jsonParser = bodyParser.json();

global.queryString = require('querystring');


// PASSPORT TESTS
//global.exphbs = require('express-handlebars');
global.logger = require('morgan');
global.cookieParser = require('cookie-parser');
global.methodOverride = require('method-override');
global.session = require('express-session');
global.passport = require('passport');
global.cookieSession = require('cookie-session');

// app.use(logger('combined'));
app.use(cookieParser('secret'));
app.use(cookieSession({
  secret: 'secret',
  cookie:{
    maxAge: 60000
  }
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret:'secret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

//{secret:'secret', saveUninitialized: true, resave: true}
//{ secret: 'okthxbye', key: 'user', cookie: { maxAge: 60000, secure: false }}

// app.use(function( req, res, next){
//   var err = req.session.error;
//   var msg = req.session.notice;
//   var success = req.session.success;
//
//   delete req.session.error;
//   delete req.session.success;
//   delete req.session.notice;
//
//   if( err ) res.locals.error = err;
//   if( msg ) res.locals.notice = msg;
//   if( success ) res.locals.success = success;
//
//   next();
// });



// --------------

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
