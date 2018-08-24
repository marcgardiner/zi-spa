angular
    .module('zispaApp')
    .controller('homeCtrl', homeCtrl);

function homeCtrl ($scope, zispaData, geolocation) {
    var vm = this;

    vm.pageHeader = {
        title: 'zispa',
        strapline: 'Find places to work with wifi near you'
    };
    vm.sidebar = {
        content: "Looking for wifi and a seat etc etc"
    };

    vm.message = "Checking your location";

    vm.getData = function (position)  {
        var lat = position.coords.latitude,
            lng = position.coords.logitude;

        vm.message = "Searching for nearby places";

        zispaData.locationByCoords(lat, lng)
            .success(function (data) {
                vm.message = data.length > 0 ? "" : "No locations found nearby";
                vm.data = { location: data };
            })
            .error(function (e) {
                vm.message = "Sorry, something's gone wrong";
            });
    };

    vm.showError = function (error) {
        vm.$apply(function () {
            vm.message = error.message;
        });
    };

    vm.noGeo = function () {
        vm.$apply(function () {
            vm.message = "Geolocation is not supported by this browser.";
        });
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
}
