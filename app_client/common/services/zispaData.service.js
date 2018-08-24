angular
    .module('zispaApp')
    .service('zispaApp', zispaData);

function zispaData ($http) {
    var locationByCoords = function (lat, lng) {
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };

    return {
        locationByCoords: locationByCoords
    };
}

