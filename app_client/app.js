(function () {
    angular.module('zispaApp', ['ngRoute']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }

    angular
        .module('zispaApp')
        .config(['$routeProvider', '$locationProvider', config]);
})();
