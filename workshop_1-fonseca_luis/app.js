var data = require('./wolkenkratzer.json');

data.wolkenkratzer.sort(function(a, b){
	return b.hoehe - a.hoehe;
});

for(var i = 0; i < data.wolkenkratzer.length ;i++){
	console.log('Name: ' + data.wolkenkratzer[i].name);
	console.log('Stadt: ' + data.wolkenkratzer[i].stadt);
	console.log('Höhe: ' + data.wolkenkratzer[i].hoehe);
	console.log('--------------------------');
};
