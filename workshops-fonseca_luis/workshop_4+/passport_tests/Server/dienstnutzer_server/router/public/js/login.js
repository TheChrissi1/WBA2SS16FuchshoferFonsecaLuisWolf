function login(){

  var auth = {
    "username":document.getElementById('username').value,
    "password":document.getElementById('password').value
  };
  alert(JSON.stringify(auth));
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", 'http://localhost:8080/login', false);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('Content-Length', JSON.stringify(auth).length);
  xhr.setRequestHeader('Connection', 'close');
  xhr.send(JSON.stringify(auth));

  window.location = '/';
  return false;
}
