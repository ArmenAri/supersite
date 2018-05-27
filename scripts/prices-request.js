/*
*@author : Armen ARISTAKESYAN
*@api : https://min-api.cryptocompare.com/
*@request / sec : 0.5
*/

/*
* Déclaration des variables
*/
const updateInterval = 10;
const url = "https://min-api.cryptocompare.com/data/price?";
const params = ["fsym", "tsyms"]
var currencies = ['BTC', 'ETH', 'NXS', 'LTC', 'XMR', 'NEO'];
var changes = ['EUR', 'USD'];

var prevValues = [];
var keys = getKeys(JSONFormater(createRequestArray()));
var values = getValues(JSONFormater(createRequestArray()));
var prevValues = values;

/*
* @brief : Envoi de la requete vers le site https://min-api.cryptocompare.com/
*/
function request(url) {
	const req = new XMLHttpRequest();
	req.open('GET', url, false); 
	req.send(null);
	if (req.status === 200) {
    	return req.responseText;
	} else {
		console.log(req.status + " : " + req.statusText);
		return -1;
	}
}

/*
* @brief : Creation d'un tableau avec les données à envoyer
*/
function createRequestArray() {
	var array;
	var to = '';
	for(var i = 0; i < changes.length - 1; i++){
		to += changes[i] + ',';
	}
	to += changes[changes.length - 1];
	for(var i = 0; i < currencies.length; i++) {
		var req = request(url + params[0] + '=' + currencies[i] + '&' + params[1] + '=' + currencies[i] + ',' + to) + ',';
		if(req != -1){
			array += req;
		} else {
			console.log("Request Error !");
		}
		
	}
	return array.split(",");
}

/*
* @brief : Transformation du JSON reçu après la requete
*/
function JSONFormater(array) {
	array[0] = array[0].substring(9, array[0].length);
	var JSONArray = [];
	for(var i = 0; i < array.length - changes.length; i += changes.length + 1){
		obj = JSON.parse(array[i] + "," + JSONCorrector(array, i));
		JSONArray.push(obj);
	}
	return JSONArray;
}


function JSONCorrector(array, nb) {
	var str;
	array[0] = array[0].substring(9, array[0].length);
	for(var j = nb; j < changes.length + nb; j += 1){
		str += array[j + 1] + ",";
	}
	return str.substring(9, str.length - 1);
}

/*
* @brief : Récuperation des clés JSON
*/
function getKeys(array) {
	properties = [];
	for(var i = 0; i < array.length; i++){
		properties.push(Object.getOwnPropertyNames(array[i]));
	}
	return properties;
}

/*
* @brief : Récuperation des valeurs JSON
*/
function getValues(array) {
	values = [];
	for(var i = 0; i < array.length; i++){
		values.push(Object.values(array[i]));
	}
	return values;
}

/*
* @brief : Ajout du cryptomonnaies saisie par l'utilisateur
*/
function addToBoard() {
    var val = document.getElementById("addtotab").value;
    var canAdd = true;
    for(var i = 0; i < currencies.length; i++) {
    	if(currencies[i] == val){
    		canAdd = false;
    	}
    }
    if(canAdd){
 	   	currencies.push(val.toUpperCase());
 	   	keys = getKeys(JSONFormater(createRequestArray()));
		values = getValues(JSONFormater(createRequestArray()));
		prevValues = values;
	}
	displayTable();
}

/*
* @brief : Affichage du tableau HTML avec les prix des cryptomonnaies
*/
function displayTable() {
	var values = getValues(JSONFormater(createRequestArray()));
	var str = "<table> \n ";
	var countDiff = 0;
	str += "<td>\ " + "" + "</td>\ ";
	for(var i = 0; i < changes.length; i++) {
		str += "<td>\ " + "<center><strong>\ " + changes[i] + "</td>\ ";
	}
	for(var i = 0; i < keys.length; i++) {
		str += "<tr>\ ";
		for(var j = 0; j < values.length - (currencies.length - changes.length - 1); j++) {
			if(values[i][j] === 1){
				str += "<td>\ " + "<strong>" + keys[i][j] + "</td>\ ";
			} else {
				if(prevValues[i][j] < values[i][j]){
					str += "<td>\ " + "<font color=#1abc9c>" + "<strong>" + values[i][j] + "</font>\ " + "</td>\ ";
				} else {
					str += "<td>\ " + "<font color='red'>" + values[i][j] + "</font>\ " + "</td>\ ";
				}
			}
		}
		str += "</tr>\ ";
	}
	str+="</table>\ ";
	document.getElementById("prices").innerHTML = str;
	for(var i = 0; i < keys.length; i++){
		for(var j = 0; j < values.length - (currencies.length - changes.length - 1); j++) {
			if(values[i][j] != prevValues[i][j]){
				countDiff++;
			}
		}
	}
	if(countDiff >= currencies.length * changes.length){
		prevValues = values;
	}
}


displayTable();
setInterval(displayTable, 1000 * updateInterval);

/*
* Ajout d'un gestionnaire d'evenements sur l'element avec l'ID 'addtotab-btn'
*/
var cryptoAddingButton = document.getElementById("addtotab-btn");
cryptoAddingButton.addEventListener("click", addToBoard, false);

