(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .directive('gameCards', gameCards);

    function gameCards() {
        var directive = {
            restrict: 'EA',
            scope: {
                'cards': '='
            },
            templateUrl: 'app/shared/directives/game-cards/game-cards.view.html',
            controller: GameCardsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    GameCardsController.$inject = [];

    function GameCardsController() {
        var vm = this;

        vm.getBackgroundPosition = function (card) {
            var xPos = ((card.id - 1) * -73) - 1,
                yPos = ((card.deck - 1) * -98) - 1;

            return 'background-position: ' + xPos + 'px ' + yPos + 'px';
        };
    }

})();