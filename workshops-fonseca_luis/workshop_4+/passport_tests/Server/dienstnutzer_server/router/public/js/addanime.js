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
  var anime = {
      "name":document.getElementsById('name').value,
      "name_en":document.getElementsById('name_en').value,
      "name_de":document.getElementsById('name_ger').value,
      "genre":"",
      "episodes":document.getElementsById('episodes').value,
      "release_jp":document.getElementsById('release_jp').value,
      "release_en":document.getElementsById('release_en').value,
      "release_de":document.getElementsById('release_de').value,
      "status":document.getElementsById('status').value,
      "dub":document.getElementsById('dub').value,
      "sub":document.getElementsById('sub').value,
      "license":document.getElementsById('license').value,
      "refs":document.getElementsById('refs').value
  }
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
