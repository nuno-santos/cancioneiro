angular.module("default")
    .directive('userTroid', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/ng/components/user/user.html',
            controller: 'userCtrl',
            controllerAs: 'user'
        };
    })
    .controller("userCtrl", function(User) {
        this.logout = function() {
            User.logout();
        };

        this.getUsername = function() {
            return User.getUsername();
        };

        this.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
    });
