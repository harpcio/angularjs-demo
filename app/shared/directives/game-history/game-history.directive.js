(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .directive('gameHistory', gameHistory);

    function gameHistory() {
        var directive = {
            restrict: 'EA',
            scope: {
                'isShowHistory': '='
            },
            templateUrl: 'app/shared/directives/game-history/game-history.view.html',
            controller: GameHistoryController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    GameHistoryController.$inject = ['GamesHistoryService'];

    function GameHistoryController(GamesHistoryService) {
        var vm = this;

        vm.closeHistory = function () {
            vm.isShowHistory = false;
        };

        vm.gamesHistoryList = GamesHistoryService.getList();
    }
})();