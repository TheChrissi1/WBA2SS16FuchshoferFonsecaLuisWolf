var bool = true;
var genreNum = 0;

function sendAnime(){
  var genres = document.getElementsByClassName('genre-select')
  var genre_erg = "";
  var tmp = 0;
  for(var i = 0; i<genres.length; i++){
    if(genres[i].checked == 1){
      if(tmp!=0){
        genre_erg += ", ";
      }
      genre_erg += genres[i].value;
      tmp++;
    }
  }
  var references = document.getElementsByClassName('refs-select');
  var ref_erg = "";
  for(var i = 0; i<references.length; i++){
    if(references[i].checked == 1){
      ref_erg += references[i].value;
      ref_erg += "|"
    }
  }
  var anime = {
      "name": document.getElementById('name_jp').value,
      "name_en": document.getElementById('name_en').value,
      "name_de": document.getElementById('name_ger').value,
      "genre": genre_erg,
      "episodes": document.getElementById('episodes').value,
      "description": document.getElementById('description').value,
      "release_jp": document.getElementById('release_jp').value,
      "release_en": document.getElementById('release_en').value,
      "release_de": document.getElementById('release_de').value,
      "status": document.getElementById('status').value,
      "dub": document.getElementById('dub').value,
      "sub": document.getElementById('sub').value,
      "license": document.getElementById('license').value,
      "refs": ref_erg,
      "checked":false
  }
  var request = new XMLHttpRequest();
  request.open("PUT", 'http://localhost:8080/anime', true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify(anime));
}
