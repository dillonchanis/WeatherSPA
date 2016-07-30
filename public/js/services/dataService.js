(function() {

    angular.module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$q', '$http'];

    function dataService($q, $http) {

        return {
            getWeatherData: getWeatherData
        }

        function getWeatherData(city) {
            return $http({
                method: 'POST',
                url: '/',
                data: { 'city': city },
                headers : { 'Content-Type': 'application/json' }
            })
            .then(weatherDataSuccess)
            .catch(weatherDataError);
        }

        function weatherDataSuccess(response) {
            return response.data;
        }

        function weatherDataError(response) {
            return $q.reject('Error ' + response.status);
        }


    }

}());
