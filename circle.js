/*
circle structure:

-dom, the html dom element
-x (0 to 480 inclusive)
-y (0 to 480 inclusive)
-angle, every frame move 10 pixels in that angle (radians)

*/

var colours = ["red", "orange", "yellow", "lime", "aqua", "blue", "fuchsia", "white"];

function createCircle(sizetemp) {
	var circle = {};
	circle.dom = document.createElement("div");
	document.getElementById("frame").appendChild(circle.dom);
	circle.dom.className = "circle";
	circle.dom.style.backgroundColor = colours[Math.floor(Math.random()*colours.length)];
	circle.size = sizetemp;
	circle.dom.style.width  = Math.floor(circle.size) + "px";
	circle.dom.style.height = Math.floor(circle.size) + "px";
	circle.x = Math.random() * 495;
	circle.y = Math.random() * 495;
	circle.angle = Math.random() * Math.PI * 2;
	circle.shrinking = false;

	circle.nX = function() { //new X
		return circle.x + 2*Math.cos(circle.angle);
	};
	circle.nY = function() { //new Y
		return circle.y + 2*Math.sin(circle.angle);
	};
	return circle;
}
