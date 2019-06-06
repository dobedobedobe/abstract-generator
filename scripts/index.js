window.onload = sendRequest; 


function printData(data) {
	$("#main").text(data);
}

function sendRequest() {
	var location = window.location.protocol + "//" + window.location.hostname + ":8080/sendData";
	console.log(location);
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
