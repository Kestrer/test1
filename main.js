var circles = [];
var collision = true;
var eating = false;
var constant = -1;
document.getElementById("startingsize").value = 5;
document.getElementById("tcrate").value       = 10;

function toggleConstant() {
	if (constant === -1) {
		constant = 0;
		document.getElementById("tc").innerHTML = "Turn Constantly Making Circles Off";
	} else {
		constant = -1;
		document.getElementById("tc").innerHTML = "Turn Constantly Making Circles On";
	}
}

function collisionToggle() {
	if (collision) {
		collision = false;
		document.getElementById("ct").innerHTML = "Turn Collision On";
	} else {
		collision = true;
		document.getElementById("ct").innerHTML = "Turn Collision Off";
	}
}

function eatingToggle() {
	if (eating) {
		eating = false;
		document.getElementById("eat").innerHTML = "Turn Eating On";
	} else {
		eating = true;
		document.getElementById("eat").innerHTML = "Turn Eating Off";
	}
}

function newCircle() {
	circles.push(createCircle(document.getElementById("startingsize").value));
	updateCircle(circles.length-1);
}

function deleteCircles() {
	for (var i = 0; i < circles.length; i++) {
		circles[i].dom.parentNode.removeChild(circles[i].dom);
	}
	circles = [];
}

function updateCircle(i) {
	if (eating) {
		for (var j = 0; j < circles.length; j++) {
			if (j !== i && Math.sqrt(Math.pow(circles[i].x-circles[j].x, 2) + Math.pow(circles[i].y-circles[j].y, 2)) <= (circles[i].size/2)+(circles[j].size/2)) {
				if (circles[i].size >= circles[j].size) {
					circles[j].dom.parentNode.removeChild(circles[j].dom);
					circles[i].size = 2*Math.sqrt(Math.pow(circles[j].size/2, 2) + Math.pow(circles[i].size/2, 2));
					circles.splice(j, 1);
					if (i > j) {
						i--;
					}
				} else if (circles[j].size > circles[i].size) {
					circles[i].dom.parentNode.removeChild(circles[i].dom);
					circles[j].size = 2*Math.sqrt(Math.pow(circles[j].size/2, 2) + Math.pow(circles[i].size/2, 2));
					circles.splice(i, 1);
					return;
				}
			}
		}
	}
	if (circles[i].size >= 300) {
		circles[i].shrinking = true;
	}
	if (circles[i].shrinking) {
		circles[i].size = Math.sqrt(Math.pow(circles[i].size, 2)-400);
		circles.push(createCircle(5));
		updateCircle(circles.length-1);
		if (circles[i].size <= 20) {
			circles[i].shrinking = false;
		}
	}
	if (circles[i].x === (circles[i].size/2) || circles[i].x === 500-(circles[i].size/2) || circles[i].y === (circles[i].size/2) || circles[i].y === 500-(circles[i].size/2)) {
		while (circles[i].nX() <= (circles[i].size/2) || circles[i].nX() >= 500-(circles[i].size/2) || circles[i].nY() <= (circles[i].size/2) || circles[i].nY() >= 500-(circles[i].size/2)) {
			circles[i].angle = Math.random() * Math.PI * 2;
		}
	}
	if (collision && !eating) {
		for (var j = 0; j < circles.length; j++) {
			if (j !== i && Math.sqrt(Math.pow(circles[i].x-circles[j].x, 2) + Math.pow(circles[i].y-circles[j].y, 2)) <= (circles[i].size/2)+(circles[j].size/2)) {
				var counter = 0;
				while (Math.sqrt(Math.pow(circles[i].nX()-circles[j].x, 2) + Math.pow(circles[i].nY()-circles[j].y, 2)) <= (circles[i].size/2)+(circles[j].size/2) || (circles[i].nX() <= (circles[i].size/2) || circles[i].nX() >= 500-(circles[i].size/2) || circles[i].nY() <= (circles[i].size/2) || circles[i].nY() >= 500-(circles[i].size/2))) {
					circles[i].angle = Math.random() * Math.PI * 2;
					counter++;
					if (counter > 1000) {
						break;
					}
				}
				// if (counter > 1000) {
				// }
			}
		}
	}
	circles[i].y = circles[i].nY();
	circles[i].x = circles[i].nX();
	// console.log(circles[i].x + " " + circles[i].nX());
	if (circles[i].x <  (circles[i].size/2)) {circles[i].x =  (circles[i].size/2);}
	if (circles[i].x > 500-(circles[i].size/2)) {circles[i].x = 500-(circles[i].size/2);}
	if (circles[i].y <  (circles[i].size/2)) {circles[i].y =  (circles[i].size/2);}
	if (circles[i].y > 500-(circles[i].size/2)) {circles[i].y = 500-(circles[i].size/2);}
	circles[i].dom.style.left = Math.floor(circles[i].x)-(circles[i].size/2) + "px";
	circles[i].dom.style.top  = Math.floor(circles[i].y)-(circles[i].size/2) + "px";
	circles[i].dom.style.width  = Math.floor(circles[i].size) + "px";
	circles[i].dom.style.height = Math.floor(circles[i].size) + "px";
}

function updateAll() {
	document.getElementById("numberOfCircles").innerHTML = circles.length;
	for (var i = 0; i < circles.length; i++) {
		updateCircle(i);
	}
}

function frame() {
	if (constant > -1) {
		constant++;
	}
	if (constant >= document.getElementById("tcrate").value) {
		constant = 0;
		newCircle();
	}
	updateAll();
}

setInterval(frame, 10);

