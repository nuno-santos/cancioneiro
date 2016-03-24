angular.module("default")
    .directive('loginTroid', function() {
        return {
            templateUrl: '/ng/components/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'login'
        };
    })
    .controller("loginCtrl", function(User, $scope, $state, $mdToast) {
        var _this = this;
        this.loginInfo = { username: '', password: '' };

        this.showSimpleToast = function(text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .hideDelay(5000)
            );
        };

        this.login = function() {
            User.login(this.loginInfo.username, this.loginInfo.password)
                .then(function() {
                    $state.go("list");
                })
                .catch(function() {
                    _this.showSimpleToast("Wrong username or password!");
                });
        };
        this.register = function() {
            User.register(this.loginInfo.username, this.loginInfo.password)
                .then(function() {
                    User.login(_this.loginInfo.username, _this.loginInfo.password)
                        .then(function() {
                            $state.go("list");
                        })
                        .catch(function() {
                            _this.showSimpleToast("Wrong username or password!");
                        });
                })
                .catch(function() {
                    _this.showSimpleToast("Username already in use!");
                });
        };
    });
