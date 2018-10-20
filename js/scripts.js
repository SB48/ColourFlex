count=[];
function getCount(data, level) {
    level = level || 0;
    count[level] = count[level] || 0;
    for (var k in data) {
        data.hasOwnProperty(k) && count[level]++;
        typeof data[k] === 'object' && getCount(data[k], level + 1);
    }
}

function getColourNames(data) {
	var nestedKeys = JSON.stringify(count, 0, 1);
	var nestedKeysArray = nestedKeys.split(',');
	var numLoops = nestedKeysArray[1];

	var colourNames = new Array();

	for (i = 0; i < numLoops; i++) {
		colourNames[i] = data.tags[i].label;
	}
	return colourNames;
}

function getColourValues(data) {

	var nestedKeys = JSON.stringify(count, 0, 1)
	var numLoops = nestedKeys.charAt(7);

	var colourValues = new Array();
	for (i = 0; i < numLoops; i++) {
		colourValues[i] = data.tags[i].color;
	}
	return colourValues;
}

function setBackground(url) {
	document.getElementById('leftHalf').style.backgroundImage = "url("+url+")";
	document.getElementById('leftHalf').style.backgroundSize = "cover";
	document.getElementById('leftHalf').style.backgroundPosition = "center";
}

function updateColours(colourNamesArray, colourValuesArray) {

	/*for (i = 0; i < colourNamesArray.length; i++) {
		var elem = document.createElement('div');

		if (i%2 == 0) {
			elem.className += 'colours-left';
		} else {
			elem.className += 'colours-right';
		}

		console.log(colourNamesArray[i] + " " + colourValuesArray[i]);
		elem.style.cssText = 'z-index:100;background:' + colourValuesArray[i];


		document.getElementById('colourBlocks').appendChild(elem);
	}*/
	for (i = 0; i < colourNamesArray.length; i++) {
		var btn = document.createElement('Button');
		btn.setAttribute("id","btn");
		btn.addEventListener("click", function() {
					var colour = document.getElementById("btn").style.backgroundColor;


					var colourRGB = hexToRgb(colour);
					request.onload = function() {
								var url2 = "http://colormind.io/api/";
								var dataInput = {
									model : "default",
									input : [colourRGB , "N"]
								}

							var http = new XMLHttpRequest();

							http.onreadystatechange = function() {
								if(http.readyState == 4 && http.status == 200) {
									var palette = JSON.parse(http.responseText).result;
								}
							}

						//https://media.boingboing.net/wp-content/uploads/2018/02/button-gone.jpg

							http.open("POST", url2, true);
							http.send(JSON.stringify(dataInput));

							var data2 = JSON.parse(JSON.stringify(dataInput));
							console.log(data2);


			}
			request.send(JSON.stringify(dataInput));
		});

		if (i%2 == 0) {
			btn.className += 'colours-left';
		} else {
			btn.className += 'colours-right';
		}

		console.log(colourNamesArray[i] + " " + colourValuesArray[i]);
		btn.style.cssText = 'z-index:100;background:' + colourValuesArray[i];


		//document.getElementById('colourBlocks').appendChild(elem);
		document.getElementById('colourBlocks').appendChild(btn);

	}
}


function hexToRgb(hex) {
var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
	} : null;
}


document.getElementById("submit").addEventListener("click", function(){

	var request = new XMLHttpRequest();
	var txt = document.getElementById('textfield').value;
	var url = 'https://apicloud-colortag.p.mashape.com/tag-url.json?url=' + txt;

	request.open('GET', url, true);
	request.setRequestHeader("X-Mashape-Key", "jFhD0TiArsmshNSteVQKuPcNs2dGp1CY7tZjsnBLu38ZKsIBrY");
	request.setRequestHeader("X-Mashape-Host", "apicloud-colortag.p.mashape.com");



	request.onload = function() {
			// Begin accessing JSON data here
			var data = JSON.parse(this.response);
			console.log(data);

			getCount(data);

			var names = getColourNames(data);
			var values = getColourValues(data);

			setBackground(txt);
			updateColours(names, values);

			console.log(data);
	}

	request.send();


});
