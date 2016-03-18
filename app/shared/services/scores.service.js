(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .service('ScoresService', ScoresService);

    ScoresService.$inject = ['GamesHistoryService', 'storage'];

    function ScoresService(GamesHistoryService, storage) {
        var state = {
            games: 0,
            wins: 0,
            looses: 0,
            draws: 0
        };

        (function init() {
            state = storage.get('scoresState') || state;
        })();

        return {
            win: win,
            lose: lose,
            draw: draw,
            reset: reset,
            state: state
        };

        function win(playerPoints, dealerPoints) {
            state.games += 1;
            state.wins += 1;

            GamesHistoryService.add(
                state.games,
                playerPoints,
                dealerPoints,
                'Player won!'
            );

            _updateStorage();
        }

        function lose(playerPoints, dealerPoints) {
            state.games += 1;
            state.looses += 1;

            GamesHistoryService.add(
                state.games,
                playerPoints,
                dealerPoints,
                'Player lost!'
            );

            _updateStorage();
        }

        function draw(playerPoints, dealerPoints) {
            state.games += 1;
            state.draws += 1;

            GamesHistoryService.add(
                state.games,
                playerPoints,
                dealerPoints,
                'Player drew!'
            );

            _updateStorage();
        }

        function reset() {
            state.games = 0;
            state.wins = 0;
            state.looses = 0;
            state.draws = 0;

            GamesHistoryService.reset();

            _updateStorage();
        }


        function _updateStorage() {
            storage.set('scoresState', state);
        }
    }
})();