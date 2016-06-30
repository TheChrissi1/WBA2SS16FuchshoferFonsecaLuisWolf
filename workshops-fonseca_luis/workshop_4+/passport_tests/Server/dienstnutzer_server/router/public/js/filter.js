var istoggled = false;
var ep_count = 1;
var genre_count = 1;

var ep_field = document.getElementById('filter_episode');
var genre_field = document.getElementById('filter_genre');


function toggle(id){
  var choice1 = document.getElementById('select1');
  var choice2 = document.getElementById('select2');
  if(id=='0'){
    istoggled = false;
    choice1.style.visibility="visible";
    choice1.style.display="block";
    choice2.style.visibility="hidden";
    choice2.style.display="none";
  } else {
    istoggled = true;
    choice1.style.visibility="hidden";
    choice1.style.display="none";
    choice2.style.visibility="visible";
    choice2.style.display="block";
  }
}

function addEpisode(){
  var new_ep_field = document.createElement('input')
  new_ep_field.type="text";
  new_ep_field.className="filter_episodes";
  ep_field.parentNode.insertBefore(new_ep_field, ep_field.nextSibling);
}
function addGenre(){
  var new_genre_field = document.createElement('input')
  new_genre_field.type="text";
  new_genre_field.className="filter_genres";
  genre_field.parentNode.insertBefore(new_genre_field, genre_field.nextSibling);

}


function sendFilter(){
  var count = 0;
  var episodes = document.getElementsByClassName('filter_episodes')
  var genre = document.getElementsByClassName('filter_genres');
  var query = "filter%3F";
  if(istoggled){
    if(document.getElementById('filter_min').value != '' && document.getElementById('filter_max').value != '' ){
      query += "minEpisodes=" + document.getElementById('filter_min').value + "&maxEpisodes=" + document.getElementById('filter_max').value;
      count += 2;
    }
  }
  if(episodes.length != 0){
    for(var i = 0; i<episodes.length; i++){
      if(episodes[i].value != ''){
        if( count == 0 ){
          query += "episodes=" + episodes[i].value;
        } else {
          query += "&episodes=" + episodes[i].value;
        }
        count++;
      }
    }
  }
  if(genre.length != 0){
    for(var i = 0; i<genre.length; i++){
      if(genre[i].value != ''){
        if( count == 0 ){
          query += "genre=" + genre[i].value;
        } else {
          query += "&genre=" + genre[i].value;
        }
        count++;
      }
    }
  }
  if(document.getElementById('filter_name').value != ''){
    if(count != 0){
      query += "name=" + document.getElementById('filter_name').value;
      count++;
    } else {
      query += "&name=" + document.getElementById('filter_name').value;
    }
  }
  window.location = 'http://localhost:8080/anime/' + query;
  return false;
}
