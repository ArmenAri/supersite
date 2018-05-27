/*
*@author : Armen ARISTAKESYAN
*/

/*
* @brief : Menu déroulant après un click pour la barre de navigation du haut en mode Mobile
*/
function navButtonHaut() {
	var x = document.getElementById("barreNavHaut");
	if (x.className === "barreNavHaut") {
		x.className += " responsive";
	} else {
		x.className = "barreNavHaut";
	}
}

//Ajout d'un gestionnaire d'evenement pour le bouton d'en haut (menu déroulant)
var iconHaut = document.getElementById('iconhaut')
iconHaut.addEventListener('click', navButtonHaut);


/*
* @brief : Menu déroulant après un click pour la barre de navigation du bas en mode Mobile
*/
function navButtonBas() {
	var x = document.getElementById("barreNavBas");
	if (x.className === "barreNavBas") {
		x.className += " responsive";
	} else {
		x.className = "barreNavBas";
	}
}

//Ajout d'un gestionnaire d'evenement pour le bouton d'en bas (menu déroulant)
var iconBas = document.getElementById('iconbas')
iconBas.addEventListener('click', navButtonBas);
