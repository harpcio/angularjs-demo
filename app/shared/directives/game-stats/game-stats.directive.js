(function(){
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .directive('gameStats', gameStats);

    gameStats.$inject = ["ScoresService"];

    function gameStats(ScoresService){
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/game-stats/game-stats.view.html',
            controller: function() {
                var stats = this;

                stats.scoresState = ScoresService.state;
            },
            controllerAs: 'stats'
        }
    }
})();