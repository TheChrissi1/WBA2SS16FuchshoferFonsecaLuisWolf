var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


var serverPort = 1337;

var anime = require('./profil.json');
var anime = anime.anime;
console.log(anime[0].name);
