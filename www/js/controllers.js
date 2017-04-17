angular.module('tshirt-weather.controllers', ['ionic', 'ngCordova'])

    .constant('eb049bc3aa34712e2762d3ba63e9c93d', 'eb049bc3aa34712e2762d3ba63e9c93d')
    .controller('WeatherCtrl', function($scope, $state, Weather, DataStore, GeoLocation, HourlyCalculator) {
        var averageNum = 5;
        $scope.refreshWeather = function() {
            $scope.startTime = (new Date()).getTime();
            GeoLocation
                .then(function(position) {
                    $scope.latitude = position.coords.latitude;
                    $scope.longitude = position.coords.longitude;

                    Weather.getCurrentWeather($scope.latitude, $scope.longitude)
                        .then(function(resp) {
                            $scope.current = resp.data;
                            console.log('GOT CURRENT', $scope.current);
                            console.log(((new Date()).getTime() - $scope.startTime) / 1000);
                            return true
                            //debugger;
                        }, function(error) {
                            alert('Unable to get current conditions');
                            console.error(error);
                        });
                    //google geocoder works out the location from latlng
                    // var geocoder = new google.maps.Geocoder();
                    // var latlng = new google.maps.LatLng($scope.latitude, $scope.longitude);
                    // var request = {
                    //     latLng: latlng
                    // };
                    // geocoder.geocode(request, function(data, status) {
                    //     if (status == google.maps.GeocoderStatus.OK) {
                    //         if (data[0] != null) {
                    //             $scope.city = data[0].address_components[4].long_name;
                    //             console.log(data[0]);
                    //         } else {
                    //             alert("No address available");
                    //         }
                    //     }
                    // })
                }).finally(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        $scope.refreshWeather();

        $scope.waitForWeather = function() {
            var boolean = false;
            if ($scope.current == null) {
                setTimeout(function() {
                    $scope.waitForWeather();
                }, 500); // Try to submit form after timeout
            } else {
                boolean = true;
            }
            return boolean;
        }
        $scope.city = DataStore.city;

        $scope.temperatureTest = function(type) {
            if ($scope.waitForWeather()) {
                if (type == 'precipProbability') {
                    var averageTemp = HourlyCalculator.getMax($scope.current, type, averageNum);
                } else {
                    var averageTemp = HourlyCalculator.getAverage($scope.current, type, averageNum);
                }
            }
            return averageTemp;
        }

        $scope.isTshirtWeather = function() {
            if ($scope.waitForWeather()) {
                var temp = HourlyCalculator.getAverage($scope.current, 'temperature', averageNum);
                var cloud = HourlyCalculator.getMax($scope.current, 'cloudCover', averageNum);
                var rainprop = HourlyCalculator.getAverage($scope.current, 'precipProbability', averageNum);
                var boolean = temp > 24 ? true : false;
                // if (temp > 18 && cloud == 0) {
                //     boolean = true;
                // } else if (temp > 20 && cloud < 0.3) {
                //     boolean = true;
                // }
                if (rainprop < 0.2) {
                    boolean = (temp >= (6 * cloud) + 18) ? true : false; //equation subject to change
                }
            }
            return boolean
        }


    });
