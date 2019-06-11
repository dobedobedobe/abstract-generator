window.onload = sendRequest; 

var typeindex = 0;
var currentKeyword = 0;
var currentId = "";
var txt = "";
var speed = 100;
var ansarr = [] ;

function typeWriter() {
	if (typeindex < txt.length) {
		document.getElementById(currentId).innerHTML += txt.charAt(typeindex);
		typeindex++;
		setTimeout(typeWriter, speed);
	}
	else {
		document.getElementById(currentId).classList.remove("highlight");
		typeindex = 0;
		txt = "";
		currentKeyword = 0;
		currentId = "";
		setTimeout(changeKeyword, 3000);
	}
}

function changeKeyword() {
	var location = window.location.protocol + "//" + window.location.hostname + ":8080/sendData";
	// console.log(location);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			if (xhttp.responseText==="0"){
				console.log("Failed to login");
				signOut();
			} else {
				currentKeyword = Math.floor(Math.random() * (ansarr.length - 1));
				ansarr = JSON.parse(xhttp.responseText);
				txt = " " + ansarr[currentKeyword] + " / ";
				currentId = currentKeyword.toString();
				document.getElementById(currentId).classList.add("highlight");
				document.getElementById(currentId).innerHTML = "";
				setTimeout(typeWriter, speed); 
			}
		}
	};
	xhttp.open("POST", location, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();

}

function printData(data) {
	ansarr = JSON.parse(data);
	for (index = 0; index < ansarr.length; index++) { 
		txt += "<span id = '" + index + "'> " + ansarr[index] + " / </span>";
	} 
	$("#main").html(txt);
	txt = "";
	setTimeout(changeKeyword, 1000);
}

function sendRequest() {
	var location = window.location.protocol + "//" + window.location.hostname + ":8080/sendData";
	// console.log(location);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			if (xhttp.responseText==="0"){
				console.log("Failed to login");
				signOut();
			} else {
				printData(xhttp.responseText);
			}
		}
	};
	xhttp.open("POST", location, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
};
