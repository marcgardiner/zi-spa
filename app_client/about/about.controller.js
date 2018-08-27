(function () {
    angular
        .module('zispaApp')
        .controller('aboutCtrl', aboutCtrl);

    function aboutCtrl () {
        var vm = this;

        vm.pageHeader = {
            title: 'About ZI-spa'
        };
        vm.main = {
            content: 'ZI-spa was created to help people find places to sit down and get a bit of work done.\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        };
    }
})();
