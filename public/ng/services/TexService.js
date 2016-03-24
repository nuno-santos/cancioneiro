angular.module("default")
    .factory("Tex", function($resource, $http, $q) {
        var texAPI = $resource('api/tex/:id', { id: "@id" });
        var getTex = function(songID) {
            return texAPI.get({ id: songID }).$promise;
        };
        var getPdf = function(songID) {
            var deferred = $q.defer();
            $http.get('api/tex/' + songID + '/pdf', { responseType: 'arraybuffer' }).success(function(response) {
                var file = new Blob([response], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                deferred.resolve(fileURL);
            });
            return deferred.promise;
        };
        var compilePdf = function(id, data) {
            console.log(id);
            return texAPI.save({ id: id, data: data }).$promise;
        };


        return {
            getTex: getTex,
            compilePdf: compilePdf,
            getPdf: getPdf
        };
    });
