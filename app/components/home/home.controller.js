(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['GameService'];

    function HomeController(GameService) {
        var vm = this;
        vm.isShowHistory = false;

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
            vm.isShowHistory = true;
        };
    }
})();