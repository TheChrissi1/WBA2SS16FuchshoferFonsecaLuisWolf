function validateEmail() {
    var email = document.getElementById("e-mail").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      document.getElementById("e-mail").style.color = "#12d40b";
    } else {
      document.getElementById("e-mail").style.color = "#c50000";
    }
    return re.test(email);
};

var userIsValid = 0;

function getJSON(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.setRequestHeader('accept', 'application/json');
  if(xhr.readyState == 4){
    return xhr.status;
  }
  xhr.send(null);
  return JSON.parse(xhr.status);
};

function validateUsername(){
  var string = document.getElementById("username").value;
  var return_value = 0;
  var url = 'http://192.168.2.108:8080/registration/' + string.toLowerCase();
  var result = getJSON(url);
  return result;
};

function inputUsername(){
  if(document.getElementById("username").value != null){
    userIsValid = validateUsername();
    if(userIsValid == 422){
      document.getElementById("username").style.color = "#c50000";
      alert("Username already Taken");
    } else if( userIsValid == 200){
      document.getElementById("username").style.color = "#12d40b";
    }
  }
};

var user_id;
function putUser(){
  var user = {
    "name":document.getElementById('firstName').value,
    "lastname":document.getElementById('lastName').value,
    "email":document.getElementById('e-mail').value,
    "username":document.getElementById('username').value,
    "password":document.getElementById('password').value,
    "gender":"",
    "birthdate":""
  }
  alert(JSON.stringify(user));
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", 'http://192.168.2.108:8080/user', false);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('Content-Length', JSON.stringify(user).length);
  xhr.setRequestHeader('Connection', 'close');
  xhr.send(JSON.stringify(user));
  //alert("Status: " + xhr.status);
  //alert("User ID: " + JSON.parse(xhr.responseText).user_id);
  user_id = JSON.parse(xhr.responseText).user_id;
  openProfile();
};

function register(){
  if(userIsValid == 200){
      if(validateEmail()){
        window.alert("ADDING USER");
        putUser();
    } else {
      window.alert("incorrect Email");
    }
  } else if(userIsValid == 422){
    window.alert("USER TAKEN");
  } else {
    alert("ELSE");
  }
};

function openProfile(){
  //alert("HI");
  var url = 'http://192.168.2.108:8080/user/' + user_id + '/stats';
  //window.location.href="http://192.168.2.108:8080/user/3/stats"
  window.location = url;
  alert('Loading User-Profile');
}

//document.getElementById("save_button").addEventListener("click", openProfile);
