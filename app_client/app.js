angular.module('zispaApp', ['ngRoute']);

function config($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl'
    })
    .otherwise({redirectTo: '/'});
}

angular
.module('zispaApp')
.config(['$routeProvider', config]);
