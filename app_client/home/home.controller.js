angular
    .module('zispaApp')
    .controller('homeCtrl', homeCtrl);

function homeCtrl () {
    var vm = this;
    vm.pageHeader = {
        title: 'zispa',
        strapline: 'Find places to work with wifi near you'
    };
    vm.sidebar = {
        content: "Looking for wifi and a seat etc etc"
    };
}
