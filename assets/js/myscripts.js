var i = 0;
var limit = 100;
var global_content_array;
var global_content_length;

function removeAll() {
  var element = document.getElementById('image_container')
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
function readSingleFile() {
  var file = document.getElementById('file-input').files[0]
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    var content_array = contents.split('\n');
    global_content_array = content_array;
    global_content_length = content_array.length;
    displayContents();
  };
  reader.readAsText(file);
}

function createImage(element, dir) {
  var div = document.createElement('DIV');
  div.setAttribute("id","image_caption_div")
  var image = document.createElement('IMG');
  var p = document.createElement('P');
  div.appendChild(image);
  div.appendChild(p);
  var str = global_content_array[i].split(" ");
  image.src = dir.concat(str[0]);
  p.innerHTML = str[1];
  element.appendChild(div);
}

function displayContents() {
  var element = document.getElementById('image_container');
  var dir = document.getElementById('file-directory').value;
  while ($(window).height()==$(document).height()) {
    createImage(element, dir)
    i++;
  }
}

function loadMore(contents){
  var element = document.getElementById('image_container');
  var dir = document.getElementById('file-directory').value;
  var upper = i + limit
  while(i<upper && i<global_content_length-1){
    createImage(element, dir)
    i++;
  }
  $(window).bind('scroll', bindScroll);
}

function displayDirectory(){
  var dir = document.getElementById('file-directory').value;
  var textbox3 = document.getElementById('textbox3');
  textbox3.value=dir.concat("sample.jpg");
}

function bindScroll(){
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  $(window).unbind('scroll');
  if (i<global_content_length){
    loadMore();
  }
}
}
$(window).scroll(bindScroll);