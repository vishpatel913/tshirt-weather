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
                        //debugger;
                    }, function(error) {
                        alert('Unable to get current conditions');
                        console.error(error);
                    });
            });
        $scope.city = DataStore.city;
    });
