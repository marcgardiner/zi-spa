(function () {
    angular
        .module('zispaApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams'];
    function locationDetailCtrl () {
        var vm = this;

        vm.locationid = $routeParams.locationid;
        vm.pageHeader = {
            title: vm.locationid
        };
    }
})();
