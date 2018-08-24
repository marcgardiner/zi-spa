(function () {
    angular
        .module('zispaApp')
        .service('zispaData', zispaData);

    zispaData.$inject = ['$http'];
    function zispaData ($http) {
        var locationByCoords = function (lat, lng) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
        };

        return {
            locationByCoords: locationByCoords
        };
    }
})();
