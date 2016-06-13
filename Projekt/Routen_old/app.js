//// Starten des www.js Servers aus der app.js herraus
//var server = require('./bin/www.js');
//
//server.start();


var express = require('express');
var app = express();
app.set('port', 3000);
var fs = require('fs');











    app.listen(app.get('port'), function() {
        console.log('ALL FILES LOADED');
        console.log( 'Express ready on http://127.0.0.1:' + app.get('port'));
        console.log('--------------------------------------');
    });

 
router = require('./router')(app);


// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;