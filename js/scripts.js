

var request = new XMLHttpRequest();

request.open('GET', 'https://apicloud-colortag.p.mashape.com/tag-url.json?url=http://apicloud.me/assets/colortag/image1.jpg', true);
request.setRequestHeader("X-Mashape-Key", "jFhD0TiArsmshNSteVQKuPcNs2dGp1CY7tZjsnBLu38ZKsIBrY");
request.setRequestHeader("X-Mashape-Host", "apicloud-colortag.p.mashape.com");



request.onload = function() {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);

		//data.forEach(movie => {
		  // Log each movie's title
		  //console.log(movie.title);
		//});
		console.log(data);
}

request.send();

