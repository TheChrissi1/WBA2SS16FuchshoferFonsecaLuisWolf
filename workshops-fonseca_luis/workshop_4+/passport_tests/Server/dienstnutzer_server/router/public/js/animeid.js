var statRequest = new XMLHttpRequest();
var cookie_user_id = document.cookie.split(';');
var cookie_user_id_value = cookie_user_id[1].split('=');
var seen_episode = 0;
if(cookie_user_id_value[1] != 0){
  statRequest.open('GET', 'http://localhost:8080/user/' +  cookie_user_id_value[1] + '/stats/' + document.getElementById('anime_name_head').innerHTML.toLowerCase().replace(/ /g, '-'), false);
  statRequest.send(null);
  seen_episode = JSON.parse(statRequest.responseText).seen_episode;
}
var d = document.getElementById('episode_list');
var value = document.getElementById('episode_number').value;
var episodes = parseInt(value, 10);
for(var i = episodes ; i>0; i--){
  var li = document.createElement("li");
  var div = document.createElement("div");
  var button = document.createElement("button");
  var span = document.createElement("span");


  button.class = "episode_button";
  span.innerHTML = "Episode: <br>"
  button.innerHTML = span.innerHTML + i;
  if(i <= seen_episode){
    button.style.background = "#2DEC56";
  }
  button.id = i;
  button.setAttribute("onclick", "return updateStats("+ button.id+ ")");


  li.appendChild(button);
  d.appendChild(button);
}


var edit_anime_link = document.getElementById('edit_anime');
var cookie = document.cookie;
if(cookie != ""){
  var c1 = cookie.split(';');
  var cookie_value = c1[3].split('=');
  if(cookie_value[1] == 1 || cookie_value[1] == 2){
    edit_anime_link.style.visibility = "visible";
  } else {
    edit_anime_link.style.visibility = "hidden";
  }
} else {
  edit_anime_link.style.visibility = "hidden";
}


function getUserID(){
  var value = document.cookie;
  var c1 = cookie.split(';');
  var value = c1[1].split('=');
  if(value[1] != 0){
      return value[1];
  } else {
    alert("You are not Logged In");
    window.location = '/login';
  }
};


function updateStats( id ){
  var max_ep = '';
  var anime_status = document.getElementById('anime_status').innerHTML;
  if( anime_status.toLowerCase() == 'finished'){
    max_ep = value;
  } else {
    max_ep = '--';
  }
  var newStats = {
    "name":document.getElementById('anime_name_head').innerHTML,
    "episodes":id,
    "max_ep":max_ep
  };
  var user_id = getUserID();
  var request = new XMLHttpRequest();
  var url = 'http://localhost:8080/user/'+user_id+'/stats';
  request.open("PUT", url, true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify(newStats));

  location.reload();
  return false;
};
