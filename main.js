var checked = 0;

var colourRed   = "246";
var colourGreen = "226";
var colourBlue  = "0";

var lChecked = 0;
var lRed =   ["255", "255"];
var lGreen = ["0"  , "255"];
var lBlue =  ["0"  , "0"];
var lPerc =  ["0"  , "100"]; //percentages
var langle =  "90";

function generate() {
	document.getElementById("overlay").className    = "capture";
	document.getElementById("overlay").height       = "1200";
	document.getElementById("background").className = "capture";
	document.getElementById("image").className      = "capture";

	// console.log(document.getElementById("overlay")   );
	// console.log(document.getElementById("background"));
	// console.log(document.getElementById("image")     );
	html2canvas(document.getElementById("image")).then(canvas => {
		// var linkdiv = document.createElement("div");
		// document.getElementById("options").appendChild(linkdiv);
		// linkdiv.className = "button";
		// linkdiv.id        = "downloadbutton";

		// var link = document.createElement("a");
		// linkdiv.appendChild(link);
		// link.href = canvas.toDataURL();
		// link.onclick = download;
		// link.innerHTML = "Download";
		// link.download = 'trench';

		// var url = canvas.toDataURL().replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
		// window.open(url);

		//window.open(canvas.toDataURL());

		download(canvas.toDataURL(), "trench.png");
	});
	setTimeout(function () {
		document.getElementById("overlay").className    = "overlay";
		document.getElementById("overlay").height       = "480";
		document.getElementById("background").className = "background";
		document.getElementById("image").className      = "image";
	}, 1);
}

function newcolourstop() {
	lRed.push("255");
	lGreen.push("0");
	lBlue.push("0");
	lPerc.push("100");
	document.getElementsByClassName("lstopradio")[lChecked].checked = false;
	lChecked = lRed.length-1;
	var stopradio   = document.createElement("input");
	document.getElementById("lstopdiv").appendChild(stopradio);
	stopradio.type  = "radio";
	stopradio.name  = "radio2";
	stopradio.id    = "lstopradio" + (lRed.length-1);
	stopradio.value = "lstopradio" + (lRed.length-1);
	stopradio.className = "lstopradio";
	stopradio.checked = true;
	if (lChecked < 2) {
		document.getElementById("delbutton").style.background = "url(greytape.svg)"
		document.getElementById("delbuttontext").onclick = "";
	} else {
		document.getElementById("delbutton").style.background = "url(tape.svg)"
		document.getElementById("delbuttontext").onclick = "delcolourstop";
	}
}

function delcolourstop() {
	lRed.splice(lChecked, 1);
	lGreen.splice(lChecked, 1);
	lBlue.splice(lChecked, 1);
	lPerc.splice(lChecked, 1);
	document.getElementById("lstopdiv").removeChild(document.getElementsByClassName("lstopradio")[lChecked]);
	if (lChecked === lRed.length) {
		lChecked--;
	}
	document.getElementsByClassName("lstopradio")[lChecked].checked = true;
}

function updateAngleSlider() {
	langle = document.getElementById("angleslider").value;
	if (langle !== "361") {
		document.getElementById("angleslidertext").innerHTML = document.getElementById("angleslider").value + "deg";
	} else {
		document.getElementById("angleslidertext").innerHTML = "Radial";
	}
}

function updateRGBSliders() {
	var redhex = toHex(parseInt(document.getElementById("redslider").value));
	var greenhex = toHex(parseInt(document.getElementById("greenslider").value));
	var bluehex = toHex(parseInt(document.getElementById("blueslider").value));

	document.getElementById("redslider").style.background = "linear-gradient(to right, #00" + greenhex + bluehex + ", #FF" + greenhex + bluehex + ")";
	document.getElementById("greenslider").style.background = "linear-gradient(to right, #" + redhex + "00" + bluehex + ", #" + redhex + "FF" + bluehex + ")";
	document.getElementById("blueslider").style.background = "linear-gradient(to right, #" + redhex + greenhex + "00, #" + redhex + greenhex + "FF)";

	document.getElementById("redslidertext").innerHTML    = document.getElementById("redslider").value   + " " + redhex;
	document.getElementById("greenslidertext").innerHTML  = document.getElementById("greenslider").value + " " + greenhex;
	document.getElementById("blueslidertext").innerHTML   = document.getElementById("blueslider").value  + " " + bluehex;

	var bkgc = "#" + redhex + greenhex + bluehex;
	document.getElementById("background").style.background = bkgc;
	document.getElementById("preview").style.background = bkgc;

	if (document.getElementById("percslider") !== null) {
		document.getElementById("percslidertext").innerHTML = document.getElementById("percslider").value + "%";
	}
}

function createRGBSliders(parent, r, g, b, p) {
	var redslider = document.createElement("input");
	document.getElementById(parent).appendChild(redslider);
	redslider.type = "range";
	redslider.min  = "0";
	redslider.max  = "255";
	redslider.value = r;
	redslider.className = "slider";
	redslider.id = "redslider";

	var redslidertext = document.createElement("p");
	document.getElementById(parent).appendChild(redslidertext);
	redslidertext.id = "redslidertext";
	redslidertext.className = "inlinep";

	var br1 = document.createElement("br");
	document.getElementById(parent).appendChild(br1);

	var greenslider = document.createElement("input");
	document.getElementById(parent).appendChild(greenslider);
	greenslider.type = "range";
	greenslider.min  = "0";
	greenslider.max  = "255";
	greenslider.value = g;
	greenslider.className = "slider";
	greenslider.id = "greenslider";

	var greenslidertext = document.createElement("p");
	document.getElementById(parent).appendChild(greenslidertext);
	greenslidertext.id = "greenslidertext";
	greenslidertext.className = "inlinep";

	var br2 = document.createElement("br");
	document.getElementById(parent).appendChild(br2);

	var blueslider = document.createElement("input");
	document.getElementById(parent).appendChild(blueslider);
	blueslider.type = "range";
	blueslider.min  = "0";
	blueslider.max  = "255";
	blueslider.value = b;
	blueslider.className = "slider";
	blueslider.id = "blueslider";
	
	var blueslidertext = document.createElement("p");
	document.getElementById(parent).appendChild(blueslidertext);
	blueslidertext.id = "blueslidertext";
	blueslidertext.className = "inlinep";

	var br3 = document.createElement("br");
	document.getElementById(parent).appendChild(br3);

	if (p !== undefined) {
		var percslider = document.createElement("input");
		document.getElementById(parent).appendChild(percslider);
		percslider.type = "range";
		percslider.min  = "0";
		percslider.max  = "100";
		percslider.value = p;
		percslider.className = "slider";
		percslider.id = "percslider";
		
		var percslidertext = document.createElement("p");
		document.getElementById(parent).appendChild(percslidertext);
		percslidertext.id = "percslidertext";
		percslidertext.className = "inlinep";

		var br4 = document.createElement("br");
		document.getElementById(parent).appendChild(br4);
	}
}

function updateoptions() {
	var optionsdiv = document.getElementById("options");
	while (optionsdiv.firstChild) {
		optionsdiv.removeChild(optionsdiv.firstChild);
	}

	var preview = document.createElement("div");
	document.getElementById("options").appendChild(preview);
	preview.className = "preview";
	preview.id = "preview";

	if (checked === 0) {
		createRGBSliders("options", colourRed, colourGreen, colourBlue);
	} else if (checked === 1) {
		var angleslider = document.createElement("input");
		document.getElementById("options").appendChild(angleslider);
		angleslider.type = "range";
		angleslider.min  = "0";
		angleslider.max  = "361";
		angleslider.value = langle;
		angleslider.className = "slider";
		angleslider.id = "angleslider";

		var angleslidertext = document.createElement("p");
		document.getElementById("options").appendChild(angleslidertext);
		angleslidertext.id = "angleslidertext";
		angleslidertext.className = "inlinep";

		var br1 = document.createElement("br");
		document.getElementById("options").appendChild(br1);

		var stopdiv = document.createElement("div");
		document.getElementById("options").appendChild(stopdiv);
		stopdiv.id = "lstopdiv";

		for (var i = 0; i < lRed.length; i++) {
			var stopradio   = document.createElement("input");
			stopdiv.appendChild(stopradio);
			stopradio.type  = "radio";
			stopradio.name  = "radio2";
			stopradio.id    = "lstopradio" + i;
			stopradio.value = "lstopradio" + i;
			stopradio.className = "lstopradio";
			if (i === lChecked) {
				stopradio.checked = true;
			}
		}
		var rgbdiv = document.createElement("div");
		document.getElementById("options").appendChild(rgbdiv);
		rgbdiv.id = "rgbdiv";
		createRGBSliders("rgbdiv", lRed[lChecked], lGreen[lChecked], lBlue[lChecked], lPerc[lChecked]);

		var newbutton = document.createElement("div");
		document.getElementById("options").appendChild(newbutton);
		newbutton.className = "button largebutton";

		var newbuttontext = document.createElement("p");
		newbutton.appendChild(newbuttontext);
		newbuttontext.innerHTML = "New Colour Stop";
		newbuttontext.onclick = newcolourstop;

		var delbutton = document.createElement("div");
		document.getElementById("options").appendChild(delbutton);
		delbutton.className = "button largebutton";
		delbutton.id = "delbutton";

		var delbuttontext = document.createElement("p");
		delbutton.appendChild(delbuttontext);
		delbuttontext.innerHTML = "Delete Colour Stop";
		delbuttontext.onclick = delcolourstop;
		delbuttontext.id = "delbuttontext";

		if (lChecked < 2) {
			document.getElementById("delbutton").style.background = "url(greytape.svg)"
			document.getElementById("delbuttontext").onclick = "";
		} else {
			document.getElementById("delbutton").style.background = "url(tape.svg)"
			document.getElementById("delbuttontext").onclick = "delcolourstop";
		}
	}
}

function toHex(d) {
	return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}

function frame() {
	var newchecked = 0;
	if (document.getElementById("lgrad").checked) {
		newchecked = 1;
	}
	if (checked !== newchecked) {
		checked = newchecked;
		updateoptions();
	}

	if (checked === 0) {
		colourRed = document.getElementById("redslider").value;
		colourGreen = document.getElementById("greenslider").value;
		colourBlue = document.getElementById("blueslider").value;
		updateRGBSliders();
	} else if (checked === 1) {
		updateAngleSlider();
		var newlChecked = 0;
		for (var i = 1; i < lRed.length; i++) {
			if (document.getElementById("lstopradio" + i).checked) {
				newlChecked = i;
				break;
			}
		}
		if (newlChecked !== lChecked) {
			lChecked = newlChecked;
			var rgbdiv = document.getElementById("rgbdiv");
			while (rgbdiv.firstChild) {
				rgbdiv.removeChild(rgbdiv.firstChild);
			}
			createRGBSliders("rgbdiv", lRed[lChecked], lGreen[lChecked], lBlue[lChecked], lPerc[lChecked]);
			if (lChecked < 2) {
				document.getElementById("delbutton").style.background = "url(greytape.svg)"
				document.getElementById("delbuttontext").onclick = "";
			} else {
				document.getElementById("delbutton").style.background = "url(tape.svg)"
				document.getElementById("delbuttontext").onclick = "delcolourstop";
			}
		}

		lRed[lChecked]   = document.getElementById("redslider").value;
		lGreen[lChecked] = document.getElementById("greenslider").value;
		lBlue[lChecked]  = document.getElementById("blueslider").value;
		lPerc[lChecked]  = document.getElementById("percslider").value;

		updateRGBSliders();

		if (langle !== "361") {
			var linearGradient = "linear-gradient(";
			linearGradient += langle + "deg";
			for (var i = 0; i < lRed.length; i++) {
				linearGradient += ", rgb(";
				linearGradient += lRed[i] + ", ";
				linearGradient += lGreen[i] + ", ";
				linearGradient += lBlue[i] + ") ";
				linearGradient += lPerc[i] + "%"
			}
			linearGradient += ")";
			document.getElementById("preview").style.background = linearGradient;
			document.getElementById("background").style.background = linearGradient;
		} else {
			var radialGradient = "radial-gradient(ellipse";
			for (var i = 0; i < lRed.length; i++) {
				radialGradient += ", rgb(";
				radialGradient += lRed[i] + ", ";
				radialGradient += lGreen[i] + ", ";
				radialGradient += lBlue[i] + ") ";
				radialGradient += lPerc[i] + "%"
			}
			radialGradient += ")";
			document.getElementById("preview").style.background = radialGradient;
			document.getElementById("background").style.background = radialGradient;
		}
	}
}

updateoptions();

window.setInterval(frame, 33);