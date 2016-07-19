var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var $http = require('axios');
var port = process.env.PORT || 3000;
var apiKey = require('./config.js').apiKey;

var server = express();
var baseUrl = 'https://api.forecast.io/forecast/';

//Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());

//test route
server.get('/forecast/hourly/:lat,:lon', function(req, res){
	$http.get(baseUrl + apiKey + '/' + req.params.lat +',' + req.params.lon)
			.then(function(response){
				var resObj = {
					latitude: response.data.latitude,
					longitude: response.data.longitude,
					hourly: response.data.hourly,
				};
			res.json(resObj);
	}).catch(function(err){
		console.log(err);
		res.send('badddddd!!!');
	});
});

server.listen(port, function(){
	console.log('Now listening on port....', port);
});
