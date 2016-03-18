(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .service('GameService', GameService);

    GameService.$inject = [
        'storage',
        'CardService',
        'PointsCalculatorService',
        'ResultCalculatorService',
        'ScoresService'
    ];

    function GameService(storage, CardService, PointsCalculatorService, ResultCalculatorService, ScoresService) {
        var state = {
            isFirstGame: true,
            dealerTurn: false,
            gameIsEnded: false,
            playerWon: false,
            playerDrew: false,
            playerLost: false,
            playerCards: [],
            dealerCards: [],
            playerPoints: 0,
            dealerPoints: 0
        };

        (function init() {
            state = storage.get('gameState') || state;
        })();

        return {
            showCards: showCards,
            start: start,
            reset: reset,
            twist: twist,
            stick: stick,
            gameState: state
        };

        function showCards() {
            _restart();

            _playerMove();
            _playerMove();

            _dealerMove();
            _dealerMove();

            _updateStorage();
        }

        function start() {
            if (!state.isFirstGame) {
                showCards();
            }
            state.isFirstGame = false;
            ResultCalculatorService.calculate(state);
            _updateStorage();
        }

        function reset() {
            _restart();
            state.isFirstGame = true;
            ScoresService.reset();
            _updateStorage();
        }

        function twist() {
            _playerMove();
            ResultCalculatorService.calculate(state);
            _updateStorage();
        }

        function stick() {
            state.dealerTurn = true;

            while (state.dealerPoints <= 16) {
                _dealerMove();
            }

            ResultCalculatorService.calculate(state);
            _updateStorage();
        }

        function _restart() {
            state.dealerTurn = false;
            state.gameIsEnded = false;
            state.playerWon = false;
            state.playerDrew = false;
            state.playerLost = false;
            state.playerCards = [];
            state.dealerCards = [];
            state.playerPoints = 0;
            state.dealerPoints = 0;
        }

        function _playerMove() {
            var randomCard = CardService.getRandomCard(state.dealerCards.concat(state.playerCards));
            state.playerCards.push(randomCard);
            state.playerPoints = PointsCalculatorService.calculate(state.playerCards);
        }

        function _dealerMove() {
            var randomCard = CardService.getRandomCard(state.dealerCards.concat(state.playerCards));
            state.dealerCards.push(randomCard);
            state.dealerPoints = PointsCalculatorService.calculate(state.dealerCards);
        }

        function _updateStorage() {
            storage.set('gameState', state);
        }
    }
})();