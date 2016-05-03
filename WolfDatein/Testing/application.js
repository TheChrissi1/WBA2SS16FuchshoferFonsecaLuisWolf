var http = require('http');

var serverPort = 3000;

var server = http.createServer(function(request, response){
    console.log('Got a request!');
    response.write('Hello');
    response.end();  
});

server.listen(serverPort, function(){
    console.log('App listens on Port ' + serverPort);
});