(function () {
    angular
        .module('zispaApp')
        .service('geolocation', geoLocation);

    function geoLocation () {
        var getPosition = function (cbSuccess, cbError, cbNoGeo) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
            } else {
                cbNoGeo();
            }
        };

        return {
            getPosition: getPosition
        };
    }
})();
