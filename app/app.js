(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp', [
            'ui.router',
            'ngCookies',
            'angularLocalStorage'
        ])
        .constant('CONFIG', {
            debugMode: true
        });

})();