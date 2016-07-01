var edit_user_auth = document.getElementById('user_authority_all');
var cookie = document.cookie;
if(cookie != ""){
  var c1 = cookie.split(';');
  var cookie_value = c1[3].split('=');
  if(cookie_value[1] == 1){
    edit_user_auth.style.visibility = "visible";
    edit_user_auth.style.display = "block";
  } else {
    edit_user_auth.style.visibility = "hidden";
    edit_user_auth.style.display = "none";
  }
} else {
  edit_user_auth.style.visibility = "hidden";
  edit_user_auth.style.display = "none";
}


function sendUser(){
  var user = {
    "user_id": parseInt(document.getElementById('user_id').innerHTML, 10),
    "name": document.getElementById('user_name').value,
    "lastname":document.getElementById('user_lastname').value,
    "username":document.getElementById('username').innerHTML,
    "authority":document.getElementById('user_authority').value,
    "email":document.getElementById('user_email').value,
    "gender":document.getElementById(document.getElementById('user_gender').value).innerHTML,
    "birthdate":document.getElementById('user_birthdate').value,
    "active": true,
  }
  var request = new XMLHttpRequest();
  request.open("PUT", 'http://localhost:8080/user/'+ user.user_id, true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify(user));

  window.location = 'http://localhost:8080/user/'+ user.user_id;
  return false;
};
