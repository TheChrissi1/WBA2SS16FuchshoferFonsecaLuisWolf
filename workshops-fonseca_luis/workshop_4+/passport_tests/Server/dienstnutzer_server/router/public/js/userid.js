var edit_user_link = document.getElementById('edit_user');
var cookie = document.cookie;
if(cookie != ""){
  var c1 = cookie.split(';');
  var cookie_value = c1[3].split('=');
  if(cookie_value[1] == 1){
    edit_user_link.style.visibility = "visible";
  } else {
    edit_user_link.style.visibility = "hidden";
  }
} else {
  edit_user_link.style.visibility = "hidden";
}
