
var express = require('express'),
	app = express(); // express app object

//console.log('Root : '+__dirname);

//setting up the static content directory
app.use(express.static(__dirname));

// starting an express server to host the app
app.listen(3000, function(){
	console.log('Sports App staretd at http://localhost:3000/');
});
