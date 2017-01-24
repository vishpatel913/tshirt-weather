angular.module('tshirt-weather.controllers', ['ionic'])

.constant('eb049bc3aa34712e2762d3ba63e9c93d', 'eb049bc3aa34712e2762d3ba63e9c93d')
  .controller('WeatherCtrl', function($scope, $state, Weather, DataStore) {
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
