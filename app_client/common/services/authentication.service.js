(function() {
    angular
        .module('zispaApp')
        .service('authentication', authentication);

    authentication.$inject = ['$window'];

    function authentication($window) {
        const saveToken = (token) => {
            $window.localStorage['zispa-token'] = token;
        };

        const getToken = () => {
            return $window.localStorage['zispa-token'];
        };
    };

    let currentUser = function() {
        if(isLoggedIn()) {
            let token = getToken();
            let payload = JSON.parse($window.atob(token.split('.')[1]));

            return {
                email : payload.email,
                name : payload.name
            };
        }
    };

    register = function(user) {
        return $http.post('/api/register', user).success(function(data) {
            saveToken(data.token);
        });
    };

    login = function(user) {
        return $http.post('/api/login', user).success(function(data) {
            saveToken(data.token);
        });
    };

    logout = function() {
        $window.localStorage.removeItem('zispa-token');
    };

    return {
        currentUser: currentUser,
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        register: register,
        login: login,
        logout: logout
    };

})();
