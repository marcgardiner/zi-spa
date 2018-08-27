(function () {
    angular
        .module('zispaApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    function locationDetailCtrl () {
        var vm = this;

        vm.pageHeader = {
            title: 'Location detail page'
        };
    }
})();
