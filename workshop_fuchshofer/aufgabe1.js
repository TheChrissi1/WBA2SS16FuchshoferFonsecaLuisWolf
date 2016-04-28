var fs = require('fs');

var chalk = require("chalk");


function towerAusgeben(data) {
    for (var i=0; i< data.wolkenkratzer.length; i++) {
        console.log("Name: " +  chalk.blue(data.wolkenkratzer[i].name));
        console.log("Stadt: " + chalk.green(data.wolkenkratzer[i].stadt));
        console.log("Hoehe: " + chalk.red(data.wolkenkratzer[i].hoehe));
        console.log("___________________________________________");
        };
    };






var data = fs.readFile("./wolkenkratzer.json", function(err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    towerAusgeben(data);
});
    