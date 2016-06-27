document.onload(function(){
  var d = document.getElementById('episode-section');

  for(var i = document.getElementsById('episodes').value; i>0; i--){
    var c = document.createElement("div");
    var e = document.createElement("button");

    c.id = i + "-episode";
    e.innerHtml = i;

    c.appendChild(e);
    d.appendChild(c);
  }
})
