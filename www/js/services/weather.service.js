(function() {
  'use strict';

  var forecastioWeather = ['$q', '$resource', '$http', 'eb049bc3aa34712e2762d3ba63e9c93d',
    function($q, $resource, $http, eb049bc3aa34712e2762d3ba63e9c93d) {
      var url = 'https://api.forecast.io/forecast/' + eb049bc3aa34712e2762d3ba63e9c93d + '/';

      var weatherResource = $resource(url, {
        callback: 'JSON_CALLBACK',
      }, {
        get: {
          method: 'JSONP'
        }
      });

      return {
        //getAtLocation: function(lat, lng) {
        getCurrentWeather: function(lat, lng) {
          return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK&units=si');
        }
      };
    }
  ];

  angular.module('WeatherForcast', ['ngResource'])

  .factory('DataStore', function() {
      //create datastore with default values
      var DataStore = {
        city: 'Camden Town',
        latitude: 51.5390,
        longitude: 0.1426,
      };

      DataStore.setCity = function(value) {
        DataStore.city = value;
      };

      DataStore.setLatitude = function(value) {
        DataStore.longitude = value;
      };

      DataStore.setLongitude = function(value) {
        DataStore.longitude = value;
      };

      return DataStore;
    })
    .factory('Weather', forecastioWeather);
}());
