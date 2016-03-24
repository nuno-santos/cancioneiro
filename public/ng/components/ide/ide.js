angular.module("default")
    .directive('ideTroid', function() {
        return {
            restrict: 'E',
            scope: { song: '=' },
            templateUrl: '/ng/components/ide/ide.html',
            controller: 'ideCtrl',
            controllerAs: 'ide'
        };
    })
    .controller("ideCtrl", function($scope, $state, $sce, Tex, Songs) {
        this.songID = $scope.song;
        var _this = this;
        this.text = "";

        Tex.getTex(this.songID).then(function(data) {
            _this.text = data.data;
        });

        this.deleteSong = function() {
            Songs.deleteSong(_this.songID).then(function(response) {
                Songs.querySongs();
                $state.go("list");
                console.log(response);
            });
        };

        this.compilePdf = function() {
            Tex.compilePdf(_this.songID, _this.text).then(function(result) {
                console.log(result);
                _this.getPdfURL();
            });
        };

        this.pdf = "";

        this.getPdfURL = function() {
            Tex.getPdf(this.songID).then(function(fileURL) {
                _this.pdf = $sce.trustAsResourceUrl(fileURL);
            });
        };

        this.getPdfURL();

        this.getPdf = function() {
            return _this.pdf;
        };
    })
