var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var server = express();

//Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());

server.get('/test', function(req, res){
	res.send('Test test!');
});

server.listen(port, function(){
	console.log('Now listening on port....', port);
});
