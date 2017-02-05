angular.module('tshirt-weather.controllers', ['ionic', 'ngCordova'])

    .constant('eb049bc3aa34712e2762d3ba63e9c93d', 'eb049bc3aa34712e2762d3ba63e9c93d')
    .controller('WeatherCtrl', function($scope, $state, Weather, DataStore, GeoLocation, HourlyCalculator) {

        GeoLocation
            .then(function(position) {
                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;

                Weather.getCurrentWeather($scope.latitude, $scope.longitude)
                    .then(function(resp) {
                        $scope.current = resp.data;
                        console.log('GOT CURRENT', $scope.current);
                        // return true
                        //debugger;
                    }, function(error) {
                        alert('Unable to get current conditions');
                        console.error(error);
                    });
            });
        $scope.city = DataStore.city;

        $scope.isTshirtWeather = function() {
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.isTshirtWeather();
                }, 500); // Try to submit form after timeout
            } else {
                var temp = HourlyCalculator.getAverage($scope.current, 'temperature', 5);
                var cloud = HourlyCalculator.getMax($scope.current, 'cloudCover', 5);
                var boolean = temp > 18 ? true : false;
            }
            return boolean
        }

    });
