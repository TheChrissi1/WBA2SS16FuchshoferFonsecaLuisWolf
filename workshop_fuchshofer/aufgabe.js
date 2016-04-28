var fs = require('fs');



function towerAusgeben(data) {
    for (var i=0; i< data.wolkenkratzer.length; i++) {
        console.log("Name: " + data.wolkenkratzer[i].name);
        console.log("Stadt: " + data.wolkenkratzer[i].stadt);
        console.log("Hoehe: " + data.wolkenkratzer[i].hoehe);
        console.log("___________________________________________");
        };
    };





var data = fs.readFile("./wolkenkratzer.json", function(err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    towerAusgeben(data);
});
    