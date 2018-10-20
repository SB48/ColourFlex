document.getElementById("submit").addEventListener("click", function(){

	var request = new XMLHttpRequest();
	var text = document.getElementById('textfield').value;
	console.log(text);
	var url = 'https://apicloud-colortag.p.mashape.com/tag-url.json?url=' + text;

	request.open('GET', url, true);
	request.setRequestHeader("X-Mashape-Key", "jFhD0TiArsmshNSteVQKuPcNs2dGp1CY7tZjsnBLu38ZKsIBrY");
	request.setRequestHeader("X-Mashape-Host", "apicloud-colortag.p.mashape.com");


	// [[42, 41, 48], [90, 83, 84], [191, 157, 175], [188, 138, 125], [215, 170, 66]]
	// note that the input colors have changed as well, by a small amount

	request.onload = function() {
			// Begin accessing JSON data here
			var data = JSON.parse(this.response);
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

			//https://media.boingboing.net/wp-content/uploads/2018/02/button-gone.jpg

			http.open("POST", url2, true);
			http.send(JSON.stringify(dataInput));

			var data2 = JSON.parse(JSON.stringify(dataInput));
			console.log(data2);


});



function hexToRgb(hex) {
var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
	} : null;
}

alert( hexToRgb("#0033ff").g ); // "51";
