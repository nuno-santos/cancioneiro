angular.module("default", ['ngResource', 'ngMaterial', 'ui.router'])
    .factory('HttpRequestInterceptor', function($window) {
        var token = $window.sessionStorage.token || "";
        return {
            request: function(config) {
                config.headers.Authorization = 'JWT ' + token;
                return config;
            },
            setToken: function(tokenToSet) {
                $window.sessionStorage.token = tokenToSet;
                token = tokenToSet;
            }
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('HttpRequestInterceptor');
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login', {
                url: '/',
                template: "<login-troid></login-troid>"
            })
            .state('list', {
                url: '/list',
                template: "<list-troid></list-troid>",
                authenticate: true
            })
            .state('editor', {
                url: '/editor/:songID',
                controller: function($stateParams, $scope) {
                    $scope.params = $stateParams;
                },
                template: "<editor-troid song=params.songID layout='column' flex></editor-troid>"
            });
        $urlRouterProvider.otherwise("/");
    })
    .run(function($rootScope, $state, User) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !User.isAuthenticated()) {
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
            if (User.isAuthenticated() && toState.name === "login") {
                $state.go("list");
                event.preventDefault();
            }
        });
    });
