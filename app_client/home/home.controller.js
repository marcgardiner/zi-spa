angular
    .module('zispaApp')
    .controller('homeCtrl', homeCtrl);

function homeCtrl ($scope) {
    $scope.pageHeader = {
        title: 'zispa',
        strapline: 'Find places to work with wifi near you'
    };
    $scope.sidebar = {
        content: "Looking for wifi and a seat etc etc"
    };
}
