(function (angular) {
    'use strict';

    angular.module('AngularJsDemoApp')
        .service('PointsCalculatorService', PointsCalculatorService);

    PointsCalculatorService.$inject = [];

    function PointsCalculatorService() {
        var cardPointsMap = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10,
            11: 10,
            12: 10,
            13: 10
        };

        return {
            calculate: calculate
        };

        function calculate(cards) {
            var points = 0,
                foundAce = false;

            angular.forEach(cards, function (card) {
                if (card.id === 1) {
                    points += 1;
                    foundAce = true;
                } else {
                    points += cardPointsMap[card.id];
                }
            });

            if (foundAce && points <= 11) {
                points += 10;
            }

            return points;
        }
    }
})(angular);