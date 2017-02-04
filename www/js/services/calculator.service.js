angular.module('CalculationService', ['ngResource'])

    .factory('GeoLocation', function($cordovaGeolocation) {

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 60000
        };

        return $cordovaGeolocation.getCurrentPosition(posOptions);
    });
