window.onload = sendRequest; 

var currentKeywords = [];
var speed = 100;
var ansarr = [] ;

function typeWriter(typeindex, txt, currentId, currentKeyword) {
	// console.log(typeindex, txt, currentId);
	if (typeindex < txt.length) {
		document.getElementById(currentId).innerHTML += txt.charAt(typeindex);
		setTimeout(typeWriter, speed, typeindex + 1, txt, currentId, currentKeyword);
	}
	else {
		document.getElementById(currentId).classList.remove("highlight");
		for( var i = 0; i < currentKeywords.length; i++){
			if (currentKeywords[i] === currentKeyword) {
				currentKeywords.splice(i, 1);
			}
		}
	}
}

function changeKeyword() {
	var location = window.location.protocol + "//" + window.location.hostname + ":8080/sendData";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			if (xhttp.responseText==="0"){
				console.log("Failed to login");
				signOut();
			} else {
				var currentKeyword = Math.floor(Math.random() * (ansarr.length - 1));
				while(currentKeywords.indexOf(currentKeyword) >= 0) {
					currentKeyword = Math.floor(Math.random() * (ansarr.length - 1));
				}
				ansarr = JSON.parse(xhttp.responseText);
				var txt = " " + ansarr[currentKeyword] + " / ";
				var currentId = currentKeyword.toString();
				document.getElementById(currentId).classList.add("highlight");
				document.getElementById(currentId).innerHTML = "";
				currentKeywords.push(currentKeyword);
				setTimeout(typeWriter, speed, 0, txt, currentId, currentKeyword); 
				setTimeout(changeKeyword, 3000);
			}
		}
	};
	xhttp.open("POST", location, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();

}

function printData(data) {
	ansarr = JSON.parse(data);
	var txt = "";
	for (index = 0; index < ansarr.length; index++) { 
		txt += "<span id = '" + index + "'> " + ansarr[index] + " / </span>";
	} 
	$("#main").html(txt);
	txt = ""; 
	setTimeout(changeKeyword, 1000);
	setTimeout(changeKeyword, 1000);
	setTimeout(changeKeyword, 1000);
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
