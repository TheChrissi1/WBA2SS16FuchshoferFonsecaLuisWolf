javascript var fs = require('fs');

var data fs.readFile("/wolkenkartzer.json", function(err, data) {
    if (err) throw err;
    console.log(data);
});

for (var i=0; i < data.lenght; i++) {
    
    console.log("Name: " + data[i].name);
    console.log("Stadt: " + data[i].stadt);
    console.log("Höhe: " + data[i].hoehe);
    console.log("--------------------");
}



                                                                 
                                                                 