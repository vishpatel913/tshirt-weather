angular.module('tshirt-weather.controllers', ['ionic', 'ngCordova'])

    .constant('eb049bc3aa34712e2762d3ba63e9c93d', 'eb049bc3aa34712e2762d3ba63e9c93d')
    .controller('WeatherCtrl', function($scope, $state, Weather, DataStore, GeoLocation) {

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

        $scope.calculateAverage = function(attr, hours) {

            var total = 0;
            var average = 0;
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.calculateAverage();
                }, 500); // Try to submit form after timeout
            } else {
                for (var i = 1; i < hours + 1; i++) {
                    var hourData = $scope.current.hourly.data[i];
                    var hourAttr = hourData[attr];
                    total += hourAttr;
                }
            }
            average = Math.round(total / hours * 100) / 100;

            return average;
        };

        $scope.calculateMax = function(attr, hours) {

            var total = 0;
            var highest = -Infinity;
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.calculateMax();
                }, 500); // Try to submit form after timeout
            } else {
                for (var i = 1; i < hours + 1; i++) {
                    var hourData = $scope.current.hourly.data[i];
                    var hourAttr = hourData[attr];
                    if (hourAttr >= highest) {
                        highest = hourAttr;
                    }

                }
            }

            return highest;
        };

        $scope.calculateMin = function(attr, hours) {

            var total = 0;
            var highest = Infinity;
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.calculateMin();
                }, 500); // Try to submit form after timeout
            } else {
                for (var i = 1; i < hours + 1; i++) {
                    var hourData = $scope.current.hourly.data[i];
                    var hourAttr = hourData[attr];
                    if (hourAttr <= highest) {
                        highest = hourAttr;
                    }

                }
            }

            return highest;
        };

    });
