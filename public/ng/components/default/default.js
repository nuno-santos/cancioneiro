angular.module("default")
    .directive('defaultTroid', function() {
        return {
            restrict: 'E',
            scope: { variable: '=' },
            templateUrl: '/ng/components/default/default.html',
            controller: 'defaultCtrl',
            controllerAs: 'default'
        };
    })
    .controller("defaultCtrl", function($scope) {
        this.default = $scope.variable;
    });
