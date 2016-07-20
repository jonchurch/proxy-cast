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
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.get('/forecast/hourly/:lat,:lon', function(req, res) {
    $http.get(baseUrl + apiKey + '/' + req.params.lat + ',' + req.params.lon)
        .then(function(response) {
            var resObj = {
                latitude: response.data.latitude,
                longitude: response.data.longitude,
                hourly: response.data.hourly
            };
            res.status(200).json(resObj);
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({
                msg: err
            });

        });
});

server.get('/forecast/daily/:lat,:lon', function(req, res) {
    $http.get(baseUrl + apiKey + '/' + requ.params.lat + ',' + req.params.lon)
        .then(function(response) {
            var overSummary = response.data.daily.summary;
            var overIcon = response.data.daily.icon;
            var dailyData = response.data.daily.data;
            var dailyArr = [];
            for (var i = 0; i < dailyData.length; i += 1) {
                var o = {
                    icon: dailyData[i].icon,
                    tempMax: dailyData[i].temperatureMax,
                    tempMin: dailyData[i].temperatureMin,
                    humidity: dailyData[i].humidity,
                    precipProb: dailydata[i].precipProbability
                };

                dailyArr.push(o);

                var resObj = {
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    summary: overSummary,
                    icon: overIcon,
                    daily: dailyArr
                };
                console.log(resObj);
                res.status(200).json(resObj);
            }
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json({
                msg: err
            });
        });
});

server.get('/forecast/minutely/:lat,:lon', function(req, res) {
    $http.get(baseUrl + apiKey + '/' + req.params.lat + ',' + req.params.lon)
        .then(function(response) {
            var resObj = {
                latitude: response.data.latitude,
                longitude: response.data.longitude,
                minutely: response.data.minutely
            };
            console.log(err);
            res.status(200).send(resObj);
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({
                msg: err
            });
        });
});

server.listen(port, function() {
    console.log('Now listening on port....', port);
});
