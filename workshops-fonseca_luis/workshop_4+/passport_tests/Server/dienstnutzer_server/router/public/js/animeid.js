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
  button.id = i;
  button.setAttribute("onclick", "updateStats("+ button.id+ ")");


  li.appendChild(button);
  d.appendChild(button);
}

function getUserID(){
  var cookie = document.cookie;
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
  var url = 'http://192.168.2.108:8080/user/'+user_id+'/stats';
  request.open("PUT", url, true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify(newStats));
};
