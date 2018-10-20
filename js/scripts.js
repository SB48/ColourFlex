function getColourNames(data) {
	var colourNames = new Array();
	
	for (i = 0; i < 6; i++) {
		colourNames[i] = data.tags[i].label;
	}
	return colourNames;
}

function getColourValues(data) {
	var colourValues = new Array();
	for (i = 0; i < 6; i++) {
		colourValues[i] = data.tags[i].color;
	}
	return colourValues;
}

function updateColours(colourNamesArray, colourValuesArray) {
	for (i = 0; i < colourNamesArray.length; i++) {
		var elem = document.createElement('div');
		
		if (i%2 == 0) {
			elem.className += 'colours-left';
		} else {
			elem.className += 'colours-right';
		}
		
		console.log(colourValuesArray[i]);
		elem.style.cssText = 'position:absolute;width:100%;height:20%;z-index:100;background:' + colourValuesArray[i];
		
		
		document.body.appendChild(elem);
	}
}


document.getElementById("submit").addEventListener("click", function(){   

	var request = new XMLHttpRequest();
	var text = document.getElementById('textfield').value;
	var url = 'https://apicloud-colortag.p.mashape.com/tag-url.json?url=' + text;

	request.open('GET', url, true);
	request.setRequestHeader("X-Mashape-Key", "jFhD0TiArsmshNSteVQKuPcNs2dGp1CY7tZjsnBLu38ZKsIBrY");
	request.setRequestHeader("X-Mashape-Host", "apicloud-colortag.p.mashape.com");



	request.onload = function() {
			// Begin accessing JSON data here
			var data = JSON.parse(this.response);
			
			var names = getColourNames(data);
			var values = getColourValues(data);

			updateColours(names, values);
			
			console.log(data);
	}

	request.send();
	
	var url2 = "http://colormind.io/api/";
	var dataInput = {
		model : "default",
		input : [[44,43,44],[90,83,82],"N","N","N"]
	}

	var http = new XMLHttpRequest();

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var palette = JSON.parse(http.responseText).result;
		}
	}
	
	
	http.open("POST", url2, true);
	http.send(JSON.stringify(dataInput));

	var data2 = JSON.parse(JSON.stringify(dataInput));
	console.log(data2);

});
