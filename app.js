var express = require('express');
var app = express();
var request = require('request');

var bodyParser = require('body-parser');

var apiKeys = require('./config')();

app.use(express.static('public'));
app.use(express.static('src/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.city + '&key' + apiKeys.mapKey, function (err, response1, body) {
        if (!err && response1.statusCode == 200) {
            /** GET Long/Lat of city **/
            var lat = JSON.parse(body).results[0].geometry.location.lat;
            var lng = JSON.parse(body).results[0].geometry.location.lng;

            /** GET Weather Data **/
            request('https://api.forecast.io/forecast/' + apiKeys.weatherKey + '/' + lat + ',' + lng, function (err, response2, body) {
                if (!err && response2.statusCode == 200) {
                    res.json(body);
                }
            })

        }
    })
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
