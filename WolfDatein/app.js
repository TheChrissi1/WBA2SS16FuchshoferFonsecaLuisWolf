var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
    
    console.log('HTTP-Request gestartet');
    console.log('HTTP-Methode: ' + req.method);
    console.log('Pfad: ' + req.url);
    
    var body = '';
    
    req.on('data', function(data){
        body = body + data.toString();
    });
    
    req.on('end', function(){
        console.log('HTTP-Request beendet');
        
        var message = JSON.parse(body);
        
        res.writeHead(200, "OK", {'Content-Type' : 'text/plain'});
        res.write('Hallo ' + message.user + ', deine Nachricht wurde empfangen');
        res.end();
    });
});

server.listen(8888);