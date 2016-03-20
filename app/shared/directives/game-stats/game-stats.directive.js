(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .directive('gameStats', gameStats);

    function gameStats() {
        var directive = {
            restrict: 'EA',
            scope: {},
            templateUrl: 'app/shared/directives/game-stats/game-stats.view.html',
            controller: GameStatsController,
            controllerAs: 'vm'
        };

        return directive;
    }

    GameStatsController.$inject = ['ScoresService'];

    function GameStatsController(ScoresService) {
        var vm = this;

        vm.scoresState = ScoresService.state;
    }
})();