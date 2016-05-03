var http = require('http');
var serverPort = 3000;

var module = require('./module');

var server = http.createServer(function(request, response){
    console.log('Got a request!');

});

server.listen(serverPort, function(){
    console.log('App listens on Port ' + serverPort);
});