(function (angular) {
    'use strict';

    angular.module('AngularJsDemoApp')
        .service('CardService', CardService);

    CardService.$inject = [];

    function CardService() {
        return {
            getRandomCard: getRandomCard
        };

        function getRandomCard(cards) {
            var notGenerated = true,
                randomCard,
                uniqueCardFound = false;

            while (notGenerated) {
                uniqueCardFound = false;

                randomCard = {
                    id: Math.floor((Math.random() * 13) + 1),
                    deck: Math.floor((Math.random() * 4) + 1)
                };

                angular.forEach(cards, function (card) {
                    if (card.id === randomCard.id && card.deck === randomCard.deck) {
                        uniqueCardFound = true;
                    }
                });

                if (!uniqueCardFound) {
                    notGenerated = false;
                }
            }

            return randomCard;
        }
    }
})(angular);