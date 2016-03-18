(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['GameService', 'GamesHistoryService'];

    function HomeController(GameService, GamesHistoryService) {
        var vm = this;
        vm.isHistoryShow = false;

        vm.gameState = GameService.gameState;

        if (vm.gameState.isFirstGame) {
            GameService.showCards();
        }

        vm.play = function () {
            GameService.start();
        };

        vm.twist = function () {
            GameService.twist();
        };

        vm.stick = function () {
            GameService.stick();
        };

        vm.reset = function () {
            GameService.reset();
            GameService.showCards();
        };

        vm.showHistory = function () {
            vm.isHistoryShow = true;
            vm.gamesHistoryList = GamesHistoryService.getList();
        };

        vm.closeHistory = function () {
            vm.isHistoryShow = false;
            vm.gamesHistoryList = [];
        };
    }
})();