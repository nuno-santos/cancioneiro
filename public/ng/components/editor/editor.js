angular.module("default")
    .directive('editorTroid', function() {
        return {
            restrict: 'E',
            scope: { song: '=' },
            templateUrl: '/ng/components/editor/editor.html',
            controller: 'editorCtrl',
            controllerAs: 'editor'
        };
    })
    .controller("editorCtrl", function($scope, $state, Songs, Tex) {
        var _this = this;
        this.songID = $scope.song;
        _this.songInfo = "";

        Songs.getSong(this.songID).then(function(song) {
            _this.songInfo = song.song;
        });

        this.goBack = function() {
            $state.go("list");
        };

    });
