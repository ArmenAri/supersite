/*
*@author : Armen ARISTAKESYAN, Florian BOUCHUT
*/

/*
* Expression regulieres utilisés pour verifier la validité des entrées de l'utilisateur
*/
var regexPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
var regexMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;

var validPWD = false;
var validMail = false;
var validUsername = false;

/*
* @brief : Recuperation des saisies par l'utilisateur
*/
function getLastName(){
	return document.getElementById("lastname").value;
}

function getFirstName(){
	return document.getElementById("firstname").value;
}

function getUserName(){
	return document.getElementById("username").value;
}

function getPassword(){
	return document.getElementById("userpwd").value;
}

function getEMail(){
	return document.getElementById("useremail").value;
}

function getBirthDate(){
	return document.getElementById("birthdate").value;
}

function setDisabled(b){
	document.getElementById("register-btn").disabled = b;
}

/*
* @brief : Recuperation des elements HTML depuis leurs IDs
*/
document.getElementById("username").addEventListener('input', checkInfos);
document.getElementById("userpwd").addEventListener('input', checkInfos);
document.getElementById("useremail").addEventListener('input', checkInfos);
document.getElementById("firstname").addEventListener('input', checkInfos);
document.getElementById("lastname").addEventListener('input', checkInfos);

/*
* @brief : Verification de la validités des saisies
*/
function checkInfos() {
	var array = [getLastName(), getFirstName(), getUserName(), getPassword(), getEMail(), getBirthDate()];
	document.getElementById("firstname").style.color = 'green';
	document.getElementById("lastname").style.color = 'green';
	if(array[2].length < 6) {
		document.getElementById("username").style.color = 'red';
		validUsername = false;
	} else {
	    document.getElementById("username").style.color = 'green';
	    validUsername = true;
	}
	if(regexPwd.test(array[3])){
	    document.getElementById("userpwd").style.color = 'green';
	    validPWD = true;
	} else {
	    document.getElementById("userpwd").style.color = 'red';
	    validPWD = false;
	}
	if(regexMail.test(array[4])){
	    document.getElementById("useremail").style.color = 'green';
	    validMail = true;
	} else {
	    document.getElementById("useremail").style.color = 'red';
	    validMail = false;
	}
	  
	if(validMail && validPWD && validUsername){
	    setDisabled(false);
	} else {
	    setDisabled(true);
	}
}
