/*
*@author : Armen ARISTAKESYAN, Florian BOUCHUT
*/

var port;
var text;

function getUsername(){
	return document.getElementById("username").value;
}

function getPassword(){
	return document.getElementById("userpwd").value;
}

function login() {
	var URL = "/htbin/login.py";
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var check = this.responseText;
			alert(check);
		}
	}
	ajax.open("POST", URL);
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
	ajax.send("username=" + getUsername() + "&userpwd=" + getPassword());
}

var loginButton = document.getElementById("login-btn");
loginButton.addEventListener('click', function(event) {
	login();
	event.preventDefault();
});

