(function () {
    angular
        .module('zispaApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$modal', 'zispaData'];
    function locationDetailCtrl ($routeParams, $modal, zispaData) {
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
        
            vm.popupReviewForm = function () {
                var modalInstace = $modal.open({
                    templateUrl: '/reviewModal/reviewModal.view.html',
                    controller: 'reviewModalCtrl as vm'
                });
            };
    }
})();
