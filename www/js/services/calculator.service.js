angular.module('CalculatorService', ['ngResource'])

    .service('HourlyCalculator', function() {

        function calculateAverage(current, attr, hours) {
            var total = 0;
            var average = 0;
            for (var i = 1; i < hours + 1; i++) {
                var hourData = current.hourly.data[i];
                var hourAttr = hourData[attr];
                total += hourAttr;
            }
            average = Math.round(total / hours * 100) / 100;
            return average;
        }

        function calculateMax(current, attr, hours) {
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
        }

        function calculateMin(current, attr, hours) {
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

        return {
            getAverage: function(current, attr, hours) {
                return calculateAverage(current, attr, hours);
            },
            getMax: function(current, attr, hours) {
                return calculateMax(current, attr, hours);
            },
            getMin: function(current, attr, hours) {
                return calculateMin(current, attr, hours);
            }
        }
    })
