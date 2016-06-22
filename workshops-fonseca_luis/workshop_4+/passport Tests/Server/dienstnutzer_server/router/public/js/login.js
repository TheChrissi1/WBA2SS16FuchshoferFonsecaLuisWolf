function login(){

  var auth = {
    "username":document.getElementById('username'),
    "password":document.getElementById('password')
  };
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", 'http://192.168.2.108:8080/login', false);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('Content-Length', JSON.stringify(auth).length);
  xhr.setRequestHeader('Connection', 'close');
  xhr.send(JSON.stringify(auth));
}
