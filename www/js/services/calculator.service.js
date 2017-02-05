//not included

// function getWeather(GeoLocation, Weather) {
//     var current;
//     GeoLocation
//         .then(function(position) {
//             var latitude = position.coords.latitude;
//             var longitude = position.coords.longitude;
//
//             Weather.getCurrentWeather(latitude, longitude)
//                 .then(function(resp) {
//                     current = resp.data;
//                     console.log('GOT CURRENT', current);
//                     //debugger;
//                 }, function(error) {
//                     alert('Unable to get current conditions');
//                     console.error(error);
//                 });
//         });
//
//
//     return current;
// }

angular.module('CalculatorService', ['ngResource'])

    .factory('TemperatureCalculator', function(GeoLocation, Weather) {

        console.log(getWeather(GeoLocation, Weather));
        var avrgTemp = 4;
        // currentWeather.hourly.data[1].temperature;
        // currentWeather.currently.temperature;

        return avrgTemp;
    })
