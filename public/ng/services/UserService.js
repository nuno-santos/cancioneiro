angular.module("default")
    .factory("User", function($resource, $q, $window, $state, HttpRequestInterceptor) {
        var username = $window.sessionStorage.username;

        var userAPI = $resource('api/users/:username', {}, {
            login: {
                method: 'POST',
                url: 'api/login'
            },
            whoami: {
                method: 'GET',
                url: 'api/whoami'
            }
        });

        var isAuthenticated = function() {
            var token = $window.sessionStorage.token;
            if (token === null || token === undefined || token === "undefined") {
                console.log("NOT AUTHENTICATED");
                return false;
            }

            return true;
        };

        var register = function(usernameRegister, passwordRegister) {
            var deferred = $q.defer();
            userAPI.save({ username: usernameRegister, password: passwordRegister }).$promise
                .then(function(registerResults) {
                    console.log(registerResults);
                    if (!registerResults.success) {
                        console.log(registerResults);
                        deferred.reject(registerResults);
                        return;
                    }
                    deferred.resolve(registerResults);
                });
            return deferred.promise;
        };

        var login = function(usernameLogin, passwordLogin) {
            var deferred = $q.defer();
            userAPI.login({ username: usernameLogin, password: passwordLogin }).$promise
                .then(function(loginResults) {
                    console.log(loginResults);
                    if (!loginResults.success) {
                        console.log(loginResults);
                        deferred.reject(loginResults);
                        return;
                    }
                    HttpRequestInterceptor.setToken(loginResults.auth.token);
                    $window.sessionStorage.username = loginResults.auth.user.username;
                    username = loginResults.auth.user.username;
                    deferred.resolve(loginResults);
                });
            return deferred.promise;
        };

        var getUsername = function() {
            return username;
        };

        var logout = function() {
            console.log("logout");
            HttpRequestInterceptor.setToken(undefined);
            $window.sessionStorage.username = undefined;
            $window.sessionStorage.clear();
            $state.go("login");
            return true;
        };

        return {
            login: login,
            register: register,
            logout: logout,
            getUsername: getUsername,
            isAuthenticated: isAuthenticated
        };
    });
