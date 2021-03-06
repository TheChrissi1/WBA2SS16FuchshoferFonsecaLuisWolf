var fs = require('fs');
var chalk = require('chalk');

function printTower(data){
	for(var i = 0; i < data.wolkenkratzer.length ;i++){
		console.log('Name:  ' + chalk.red(data.wolkenkratzer[i].name));
		console.log('Stadt: ' + chalk.red(data.wolkenkratzer[i].stadt));
		console.log('Höhe:  ' + chalk.red(data.wolkenkratzer[i].hoehe));
		console.log('--------------------------');
	};
};
var data = fs.readFile('./wolkenkratzer.json', function(err, data) {
	if(err) throw err;
	data = JSON.parse(data);
	data.wolkenkratzer.sort(function(a, b){
		return b.hoehe - a.hoehe;
	});
	var data_stringified = JSON.stringify(data);
	fs.writeFile('./wolkenkratzer_sortiert.json',data_stringified,function(err){
		if(err) throw err;
	});
	printTower(data);
});
