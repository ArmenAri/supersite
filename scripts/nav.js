function navButtonHaut() {
	var x = document.getElementById("barreNavHaut");
	if (x.className === "barreNavHaut") {
		x.className += " responsive";
	} else {
		x.className = "barreNavHaut";
	}
}

var iconHaut = document.getElementById('iconhaut')
iconHaut.addEventListener('click', navButtonHaut);

function navButtonBas() {
	var x = document.getElementById("barreNavBas");
	if (x.className === "barreNavBas") {
		x.className += " responsive";
	} else {
		x.className = "barreNavBas";
	}
}

var iconBas = document.getElementById('iconbas')
iconBas.addEventListener('click', navButtonBas);
