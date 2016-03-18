(function () {
    'use strict';

    angular
        .module('AngularJsDemoApp')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        // any unknown URLS go to 404
        $urlRouterProvider.otherwise('/404');

        // no route goes to index
        $urlRouterProvider.when('', '/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/views/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/shared/views/404.html'
            });
    }
})();