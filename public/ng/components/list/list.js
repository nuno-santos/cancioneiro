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
    .controller("listCtrl", function(Songs, $mdDialog, $state, $window, $scope, $mdMedia) {
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

        // code to pop up dialog before deleting a song
        var l = this;
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.showConfirm = function(ev, s) {
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete the song?')
                  .textContent('The song \'' + s.name + '\' will be lost!')
                  .targetEvent(ev)
                  .ok('Yes')
                  .cancel('No');
            $mdDialog.show(confirm).then(function() {
                l.deleteSong(s.id);
                console.log('song deleted');
            }, function() {
                console.log('song delete canceled');
            });
        };
    });
