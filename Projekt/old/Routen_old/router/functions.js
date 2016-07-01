var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var path = require('path'),__parentdirectory=path.dirname(process.mainModule.filename);



    
//Gibt einen Benutzer anhand seiner ID (querry parameter) zurück.
function returnUser (string) {
    
    var data = loadUser();
    
    var erg = 0;
    for (i=0; i<data.user.length; i++) {

        if (data.user[i].uID == string) {
            var erg = data.user[i];
            return erg;
        }
    }
    return erg;
    
}





















































module.exports = router;