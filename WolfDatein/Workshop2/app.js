var express = require('express');
var app = express();

var serverPort = 1337;

var users = [
    {name: "Hans", age: 21, studiengang: "Medieninformatik"},
    {name: "Peter", age: 26, studiengang: "Wirtschaftsinformatik"},
    
];

app.get('/users', function(req, res){
    
    if (req.query.age !== undefined) {
        
        res.json(users.fliter(function(e, i, arr) {
            return e.age == req.query.age
        }));
    } else {
        res.json(users);
    }
});

app.listen(serverPort, function(){
    console.log('App listens on Port ' + serverPort);
});