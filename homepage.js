// When the user clicks on div, open the popup
document.addEventListener( "DOMContentLoaded", fill_grid, false );

var mydata = JSON.parse(data);

function fill_grid() {

  // Get grid
  var grid = document.getElementById("grid");

  for (var i = 0; i < mydata.length; i++) {
    // Make container
    var container = document.createElement("div"); // Create element
    container.className = "container"; // Assign class

    // Make border
    var border = document.createElement("div");
    border.className = "border"; 
    border.id = i; // Add id for event listener
    border.addEventListener("click", fadeIn, false); // Add onclick event listener

    // Make image
    var image = document.createElement("img");
    image.src = "album-artwork/" + mydata[i].image; // Add image source

    // Make middle
    var middle = document.createElement("div");
    middle.className = "middle";

    // Make title
    var title = document.createElement("div");
    title.className = "title";

    // Make text
    if (mydata[i].title != null) {
      var node = document.createTextNode(mydata[i].title);
    } else {
      var node = document.createTextNode("No Title Found");
    }
    
    // Append all the children
    title.appendChild(node);
    middle.appendChild(title);
    border.appendChild(image);
    border.appendChild(middle);
    container.appendChild(border);
    grid.appendChild(container);
  }

}

function fadeIn() {

  var str = mydata[this.id].link;

  document.getElementById("theframe").src = "reviews/" + str;

  var _theframe = document.getElementById("theframe");
  _theframe.contentWindow.location.href = _theframe.src;

  window.setTimeout(openWindow(str), 500);
}

function openWindow(){
  document.getElementById("myOverlay").classList.toggle("show");
  document.getElementById("myPopup").classList.toggle("show");
  document.body.style.overflow = "hidden"; 
}

function fadeOut() {
  document.getElementById("myOverlay").classList.toggle("show");
  document.getElementById("myPopup").classList.toggle("show");
  document.body.style.overflow = "scroll"; 

  document.getElementById("theframe").src = "";
}
// Fix firefox bug of iFrame caching