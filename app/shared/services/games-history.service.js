(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .service('GamesHistoryService', GamesHistoryService);

    GamesHistoryService.$inject = ['storage'];

    function GamesHistoryService(storage) {
        var history = [];

        (function init() {
            history = storage.get('gamesHistory') || history;
        })();

        return {
            add: add,
            getList: getList,
            reset: reset
        };

        function add(game, playerPoints, dealerPoints, result) {
            history.push(
                {
                    game: game,
                    player: playerPoints,
                    dealer: dealerPoints,
                    result: result
                }
            );
            _updateStorage();
        }

        function getList() {
            return history;
        }

        function reset() {
            history.length = 0;
            _updateStorage();
        }

        function _updateStorage() {
            storage.set('gamesHistory', history);
        }
    }
})();