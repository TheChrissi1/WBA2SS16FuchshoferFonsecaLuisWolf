var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var user = [
  {name: 'Hans Holz', age: 23},
  {name: 'Peter Putzer', age: 27},
  {name: 'Anton Ameise', age: 43}
]


app.get('/', function(req, res){
 res.render('index',{user: "Great User",title:"homepage"});
 });

app.listen(8080);
console.log('Server listens');
