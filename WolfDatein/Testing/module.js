var express = require('express');

var app = express();


var users = [
    {name: "Christian Wolf", age: 21},
    {name: "Peter Fuchs", age: 28}
];

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/users', function(req, res) {
    
    if (req.query.age !== undefined) {
        
        res.json(Users,filter(function(e, i, arr) {
            return e.age == req.query.age          
        }));
    } else {
        res.json(users);
    }
    
});

app.get('/', function(req, res) {
    res.send('ok');
});

module.exports = app;

console.log('module.js loaded');
