var bool = true;
var genreNum = 0;

function sendAnime(){
  alert("HI");
  var anime = {
      "name":"",
      "name_en":"",
      "name_de":"",
      "genre":"",
      "episodes":0,
      "release_jp":"",
      "release_en":"",
      "release_de":"",
      "status":"",
      "dub":"",
      "sub":"",
      "license":"",
      "refs":""
  }
  alert(JSON.stringify(anime));
  var tmp = document.getElementsByClassName('genre-param')
  var erg = "";
  for(var i = 0; i<tmp.length-1; i++){
    if(tmp[i].checked == 1){
      erg += tmp[i].value;
      erg += ", ";
    }
  }
  erg += tmp[tmp.length].value;
  alert(erg);
}
function genreToggle(){
  var tmp = document.getElementsByClassName('genre-param')
  genreNum = tmp.length;
  if(bool == true){
    for(var i = 0; i<tmp.length; i++){
      tmp[i].style.visibility="visible"
      tmp[i].style.display="";
    }
    bool = false;
  } else {
    for(var i = 0; i<tmp.length; i++){
      tmp[i].style.visibility="hidden"
      tmp[i].style.display="none";
    }
    bool = true;
  }
}
