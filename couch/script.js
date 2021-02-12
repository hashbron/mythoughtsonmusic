document.addEventListener( "DOMContentLoaded", startup, false );

var mydata = JSON.parse(data);
var page = 0;
var num_pages = Math.ceil(mydata.length / 8);

function startup() {
	build_grid();
	refill_grid();
	hoverOn("triangle-right-container");
}

function build_grid() {
  // Get grid
  var grid = document.getElementById("grid");

  // Loop through to make 8 albums
  for (var i = 0; i < 8; i++) {
    // Make container
    var container = document.createElement("div"); // Create element
    container.className = "grid-item"; // Assign class

    // Make border
    var border = document.createElement("div");
    border.className = "border"; 
    border.id = "border" + i; // Add id for event listener
    border.addEventListener("click", fadeIn, false); // Add onclick event listener

    // Make image
    var image = document.createElement("img");
    image.id = "image" + i;

    // Make middle
    var middle = document.createElement("div");
    middle.className = "middle";

    // Make title
    var title = document.createElement("div");
    title.className = "title";
    title.id = "title" + i;
    var node = document.createTextNode("Placeholder Text");
    
    // Append all the children
    title.appendChild(node);
    middle.appendChild(title);
    border.appendChild(image);
    border.appendChild(middle);
    container.appendChild(border);
    grid.appendChild(container);
  }

}

function refill_grid() {
	// fill the grid with images based on the current page
	for (var i = 0; i < 8; i++) {

		index = i + (page * 8); // get index for grid content

		// get the img element from the id
		var image_id = "image" + (i);
		var image = document.getElementById(image_id);

		// get the title element from the id
		var title_id = "title" + (i);
		var title = document.getElementById(title_id);

		// set the image and title
		// turnary if on last page fill with blank image
		image.src = (index < mydata.length) ? "../album-artwork/" + mydata[index].image : "../album-artwork/blank.jpeg";
		title.innerHTML = (index < mydata.length) ? mydata[index].title : "Coming Soon";
	}
}

function hoverOn(id) {
	var triangle = document.getElementById(id);
	triangle.onmouseover = function() { this.style.opacity = "1"; }
	triangle.onmouseout  = function() { this.style.opacity = "0.3"; }
}

function hoverOff(id) {
	var triangle = document.getElementById(id);
	triangle.onmouseover = null;
	triangle.onmouseout = null;
	triangle.style.opacity = "0.3";
}

function rightArrow() {
	if (page < num_pages - 1) {
		page ++;
		hoverOn("triangle-left-container");
	}
	if (page == num_pages - 1) {
		hoverOff("triangle-right-container");
	}
	refill_grid();
}

function leftArrow() {
	if (page > 0) {
		page --;
		hoverOn("triangle-right-container");
	}
	if (page == 0) {
		hoverOff("triangle-left-container");
	}
	refill_grid();
}

function fadeIn() {
	var index = this.id.slice(-1); // get index from id
	var str = mydata[parseInt(index) + (page * 8)].link;
    document.getElementById("theframe").src = "../reviews/" + str;

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