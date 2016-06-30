function login(){

  var auth = {
    "username":document.getElementById('username').value,
    "password":document.getElementById('password').value
  };
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", 'http://localhost:8080/login', false);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(JSON.stringify(auth));
  var url = "http://localhost:8080/";
  if(xhr.status == 200){
  } else if( xhr.status == 404){
    alert("Account not Found! Please register");
    url += "registration";
  } else if( xhr.status == 423){
    alert("Account deactivated! For Reactivation please contact Support at: bla@test.de");
  }
  window.location = url;
  return false;
}
