(function () {
    angular
        .module('zispaApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$location', '$modal', 'zispaData'];
    function locationDetailCtrl ($routeParams, $location, $modal, zispaData, authentication) {
        var vm = this;

        vm.locationid = $routeParams.locationid;
        vm.pageHeader = {
            title: vm.locationid
        };

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.currentPath = $location.path();

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
                    controller: 'reviewModalCtrl as vm',
                    resolve: {
                        locationData: function () {
                            return {
                                locationid: vm.locationid,
                                locationName: vm.data.location.name
                            };
                        }
                    }
                });
            };
    }
})();
