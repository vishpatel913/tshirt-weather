angular.module('CalculatorService', ['ngResource'])

    .factory('HourlyCalculator', function() {
        return {
            calculateAverage: function(current, attr, hours) {
                var total = 0;
                var average = 0;
                for (var i = 1; i < hours + 1; i++) {
                    var hourData = current.hourly.data[i];
                    var hourAttr = hourData[attr];
                    total += hourAttr;
                }
                average = Math.round(total / hours * 100) / 100;
                return average;
            },
            calculateMax: function(current, attr, hours) {
                var total = 0;
                var max = -Infinity;
                for (var i = 1; i < hours + 1; i++) {
                    var hourData = current.hourly.data[i];
                    var hourAttr = hourData[attr];
                    if (hourAttr >= max) {
                        max = hourAttr;
                    }
                }
                return max;
            },
            calculateMin: function(current, attr, hours) {
                var total = 0;
                var min = Infinity;
                for (var i = 1; i < hours + 1; i++) {
                    var hourData = current.hourly.data[i];
                    var hourAttr = hourData[attr];
                    if (hourAttr <= min) {
                        min = hourAttr;
                    }
                }
                return min;
            }
        }
    })
