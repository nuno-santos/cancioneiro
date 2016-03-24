angular.module("default")
    .factory("Default", function($resource) {
        var defaultAPI = $resource('api/');
        var d = [];
        var getD = function() {
            return d;
        };
        var getAllD = function() {
            defaultAPI.query().$promise.then(function(allDefault) {
                d = allDefault;
            });
        };
        return {
            getD: getD,
            getAllD: getAllD
        };
    });
