/*
*@author : Armen ARISTAKESYAN, Florian BOUCHUT
*/

var port;
var text;

/*
*@brief : Fonction qui permet de récuperer le nom d'utilisateur depuis le label
*/
function getUsername(){
	return document.getElementById("username").value;
}

/*
*@brief : Fonction qui permet de récuperer le mot de passe depuis le label
*/
function getPassword(){
	return document.getElementById("userpwd").value;
}

/*
*@brief : Fonction qui permet faire une requete et recuperer le retour du script python
*/
function login() {
	var URL = "/htbin/login.py";
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var check = this.responseText;
			if(check.includes("invalides") || check.includes("vide")) {
				document.getElementById('response').style.color = 'red';
				document.getElementById('response').textContent = check;
				login_status = false;
			} else if(check.includes("Bonjour")){
				document.getElementById('response').style.color = 'green';
				document.getElementById('response').textContent = check;
				login_status = true;
			}
		}
	}
	ajax.open("POST", URL);
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
	ajax.send("username=" + getUsername() + "&userpwd=" + getPassword());
}

/*
*Ajout d'un gestionnaire d'évenements sur l'element qui a l'ID 'login-btn'
*/
var loginButton = document.getElementById("login-btn");
loginButton.addEventListener('click', function(event) {
	login();
	event.preventDefault();
});

