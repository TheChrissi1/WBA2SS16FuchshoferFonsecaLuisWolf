//Aufgabe 1
var fs = require('fs');
function printTower(data){
	for(var i = 0; i < data.wolkenkratzer.length ;i++){
		console.log('Name: ' + data.wolkenkratzer[i].name);
		console.log('Stadt: ' + data.wolkenkratzer[i].stadt);
		console.log('Höhe: ' + data.wolkenkratzer[i].hoehe);
		console.log('--------------------------');
	};
};
var data = fs.readFile('./wolkenkratzer.json', function(err, data) {
	if(err) throw err;
	data = JSON.parse(data);
	data.wolkenkratzer.sort(function(a, b){
		return b.hoehe - a.hoehe;
	});
	printTower(data);
});
