(function () {
    angular
        .module('zispaApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', 'zispaData'];
    function locationDetailCtrl ($routeParams, zispaData) {
        var vm = this;

        vm.locationid = $routeParams.locationid;
        vm.pageHeader = {
            title: vm.locationid
        };

        zispaData.locationById(vm.locationid)
            .success(function (data) {
                vm.data = {location: data};
                vm.pageHeader = {
                    title: vm.data.location.name
                }
            })
            .error(function (e) {
                console.log(e);
            });
    }
})();
