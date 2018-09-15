(function () {
    angular
        .module('zispaApp')
        .service('zispaData', zispaData);

    zispaData.$inject = ['$http', 'authentication'];
    function zispaData ($http, authentication) {
        var locationByCoords = function (lat, lng) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
        };

        var locationById = function (locationid) {
            return $http.get('/api/locations/' + locationid);
        };

        var addReviewById = function (loationid, data) {
            return $http.post('/api/locations/' + locationid + '/reviews', data, {
                headers: {
                    Authentication: `Bearer ${authentication.getToken()}`
                }
            });
        };

        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById
        };
    }
})();
