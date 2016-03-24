angular.module("default")
    .directive('listTroid', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/ng/components/list/list.html',
            controller: 'listCtrl',
            controllerAs: 'list'
        };
    })
    .controller("listCtrl", function(Songs, $mdDialog, $state, $window) {
        this.getAllSongs = function() {
            return Songs.getSongsList();
        };
        this.editSong = function(songID) {
            $state.go("editor", { songID: songID });
        };
        this.deleteSong = function(songID) {
            Songs.deleteSong(songID).then(function(response) {
                Songs.querySongs();
                console.log(response);
            });
        };

        this.openPdf = function(songID) {
            $window.open("api/tex/" + songID + "/pdf", "_blank");
        };

        this.showAdvanced = function(ev) {
            $mdDialog.show({
                templateUrl: "ng/components/list/dialog.html",
                controller: function($scope, $mdDialog) {
                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function(answer) {
                        Songs.createSong(answer).then(function(response) {
                            console.log(response);
                            Songs.querySongs();
                            $mdDialog.hide(answer);
                        });
                    };
                },
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function(answer) {
                    console.log(answer);
                }, function() {
                    console.log("NOP");
                });
        };

    });
