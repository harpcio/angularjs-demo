(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .filter('percentage', percentage);

    percentage.$inject = ['$filter'];

    function percentage($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }
})();