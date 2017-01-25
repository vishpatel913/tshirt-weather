angular.module('tshirt-weather.controllers', ['ionic', 'ngCordova'])

    .constant('eb049bc3aa34712e2762d3ba63e9c93d', 'eb049bc3aa34712e2762d3ba63e9c93d')
    .controller('WeatherCtrl', function($scope, $cordovaGeolocation, $state, Weather, DataStore) {

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 60000
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            $scope.geoLat = lat;
            $scope.geoLong = long;
        });

        //read default settings into scope
        console.log('inside weather');
        $scope.city = DataStore.city;
        var latitude = DataStore.latitude;
        var longitude = DataStore.longitude;

        //call getCurrentWeather method in factory ‘Weather’
        Weather.getCurrentWeather(latitude, longitude)
            .then(function(resp) {
                $scope.current = resp.data;
                console.log('GOT CURRENT', $scope.current);
                //debugger;
            }, function(error) {
                alert('Unable to get current conditions');
                console.error(error);
            });
    });
