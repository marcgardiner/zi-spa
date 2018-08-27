(function () {
    angular
        .module('zispaApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'locationData'];
    function reviewModalCtrl ($modalInstance, locationData) {
        var vm = this;

        vm.modal = {
            cancel: function () {
                $modalInstance.dismiss('cancel');
            }
        };
        vm.locationData = locationData;
    }
})();
