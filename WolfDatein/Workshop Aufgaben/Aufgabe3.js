var fs = require('fs');
var chalk = require('chalk');

function printTower(data){
    for (var i=0; i < data.wolkenkratzer.length; i++){
        console.log(chalk.blue("Name: ") + chalk.blue(data.wolkenkratzer[i].name));
        console.log(chalk.red("Stadt: ") + chalk.red(data.wolkenkratzer[i].stadt));
        console.log(chalk.green("Höhe: ") + chalk.green(data.wolkenkratzer[i].hoehe));
        console.log("--------------------");
    };
};


var data = fs.readFile('./wolkenkratzer.json', function(err, data) {
    if (err) throw err;
    data = JSON.parse(data);

    
    data.wolkenkratzer.sort(function (a, b) {
            return b.hoehe - a.hoehe;
        });
    
    var data_sotiert = JSON.stringify(data);
    fs.writeFile('./wolkenkratzer_sotiert.json',data_sotiert,function(err){
    if (err) throw err;
    });
     
    printTower(data);
});


                                                            
                                                                 