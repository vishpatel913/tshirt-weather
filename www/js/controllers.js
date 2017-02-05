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

        $scope.calculateAverageTemp = function() {
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.calculateAverageTemp();
                }, 500); // Try to submit form after timeout
            } else {
                // var average = HourlyCalculator.getAverage($scope.current, 'temperature', 5);
                var average = HourlyCalculator.calculateAverage($scope.current, 'temperature', 5);
            }
            return average;
        };

        $scope.calculateMaxClouds = function() {
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.calculateMaxClouds();
                }, 500); // Try to submit form after timeout
            } else {
                var max = HourlyCalculator.getMax($scope.current, 'cloudCover', 5);
            }
            return max;
        };

        $scope.calculateMinClouds = function() {
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.calculateMinClouds();
                }, 500); // Try to submit form after timeout
            } else {
                var min = HourlyCalculator.getMin($scope.current, 'cloudCover', 5);
            }
            return min;
        };

    });
