(function () {

    angular.module('app')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['dataService'];

    function WeatherController(dataService) {
        var vm = this;

        vm.date = Date.now();

        vm.city = '';

        /**
         * On submit passes vm.city to the dataService.
         * Dataservice gets coords for that city and passes to weather API.
         */
        vm.getWeather = function (city) {
            if (city) {
                dataService.getWeatherData(city)
                    .then(getWeatherSuccess)
                    .catch(getWeatherError);
            }
        }

        function getWeatherSuccess(response) {
            response = JSON.parse(response);

            console.log(response);

            vm.currently = {
                apparentTemp: response.currently.apparentTemperature,
                humidity: response.currently.humidity * 100,
                icon: response.currently.icon,
                temperature: response.currently.temperature,
                summary: response.currently.summary,
                precipProb: response.currently.precipProbability,
                windSpeed: response.currently.windSpeed
            };


            vm.hourlySummary = [];
            vm.hourlyTemp = [];
            vm.hourlyTime = [];
            for (var i = 0; i < 5; i++) {
                vm.hourlyTime.push(response.hourly.data[i].time);
                vm.hourlySummary.push(response.hourly.data[i].summary);
                vm.hourlyTemp.push(response.hourly.data[i].temperature);
            }


            var day1 = response.currently.icon,
                day2 = response.daily.data[1].icon,
                day3 = response.daily.data[2].icon,
                day4 = response.daily.data[3].icon,
                day5 = response.daily.data[4].icon;

            var skycons = new Skycons({
                "color": "#f16275"
            });

            skycons.add("icon1", day1);
            skycons.add("icon2", day2);
            skycons.add("icon3", day3);
            skycons.add("icon4", day4);
            skycons.add("icon5", day5);
            skycons.add("wind", Skycons.WIND);

            skycons.play();

        };

        function getWeatherError(response) {
            console.log('Error');
        }

    };

}());
