(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .service('ResultCalculatorService', ResultCalculatorService);

    ResultCalculatorService.$inject = ['ScoresService'];

    function ResultCalculatorService(ScoresService) {
        return {
            calculate: calculate
        };

        function calculate(state) {
            if (state.playerPoints > 21) {
                state.dealerTurn = true;
                state.gameIsEnded = true;
                state.playerLost = true;

                ScoresService.lose(state.playerPoints, state.dealerPoints);

                return;
            }

            if (state.playerPoints === 21) {
                state.dealerTurn = true;
                state.gameIsEnded = true;
                state.playerWon = true;

                ScoresService.win(state.playerPoints, state.dealerPoints);

                return;
            }

            if (state.dealerPoints > 21) {
                state.dealerTurn = true;
                state.gameIsEnded = true;
                state.playerWon = true;

                ScoresService.win(state.playerPoints, state.dealerPoints);

                return;
            }

            if (state.dealerTurn === true) {
                state.gameIsEnded = true;

                if (state.playerPoints === state.dealerPoints) {
                    ScoresService.draw(state.playerPoints, state.dealerPoints);
                    state.playerDrew = true;

                    return;
                }

                if (state.playerPoints > state.dealerPoints) {
                    ScoresService.win(state.playerPoints, state.dealerPoints);
                    state.playerWon = true;
                } else {
                    ScoresService.lose(state.playerPoints, state.dealerPoints);
                    state.playerLost = true;
                }
            }
        }


    }
})();