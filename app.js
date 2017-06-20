const express = require('express')
const app = express()


/* example route */
app.get('/', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	/* example sdk usage */
	console.log(req.query);
flickr
.request()
.media()
.search(req.query.searchString)
.get()
.then(function (response) {
		response.body.photos.photo.forEach(function (photo, index) {
			photo.url = "https://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}.jpg"
			.replace("{{farm}}", photo.farm)
			.replace("{{server}}", photo.server)
			.replace("{{id}}", photo.id)
			.replace("{{secret}}", photo.secret);
		});
		/* render template */
		res.send({
			photos: response.body.photos.photo,
			title: 'Search Example'
		});
	}, function (err) {
		res.status(500).send(err);
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


var Flickr = require('flickr-sdk');

var flickr = new Flickr({
	"apiKey":            "bd627a96e291eaa14cfc6d480ac9a136",
	"apiSecret":         "3cb5239d19061c72",
});


