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
    .controller("ideCtrl", function($rootScope, $scope, $state, $sce, Tex, Songs, $mdDialog, $mdMedia) {
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

        //

        $scope.items = [];

        $scope.inject = function(someInput) {
            $scope.items.push(someInput);
            $rootScope.$broadcast('inject', someInput);
        }

        $scope.bracketize = function() {
            $rootScope.$broadcast('bracketize', 'VAL');
        }


        // dialog for song delete

        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.showConfirm = function(ev) {
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete the song?')
                  .textContent('This song will be lost!')
                  .targetEvent(ev)
                  .ok('Yes')
                  .cancel('No');
            $mdDialog.show(confirm).then(function() {
                _this.deleteSong();
                console.log('song deleted');
            }, function() {
                console.log('song delete canceled');
            });
        };
    })

    .directive('myTextInject', ['$rootScope', function($rootScope) {
      return {
        link: function(scope, element, attrs) {
          $rootScope.$on('inject', function(e, val) {
            var domElement = element[0];

            if (document.selection) {
              domElement.focus();
              var sel = document.selection.createRange();
              sel.text = val;
              domElement.focus();
            } else if (domElement.selectionStart || domElement.selectionStart === 0) {
              var startPos = domElement.selectionStart;
              var endPos = domElement.selectionEnd;
              var scrollTop = domElement.scrollTop;
              domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
              domElement.focus();
              domElement.selectionStart = startPos + val.length;
              domElement.selectionEnd = startPos + val.length;
              domElement.scrollTop = scrollTop;
            } else {
              domElement.value += val;
              domElement.focus();
            }
          });
        }
      }
    }])

    .directive('myTextBracketize', ['$rootScope', function($rootScope) {
      return {
        link: function(scope, element, attrs) {
          $rootScope.$on('bracketize', function(e, val) {
            var domElement = element[0];

            if (document.selection) {
              domElement.focus();
              var sel = document.selection.createRange();
              sel.text = "[" + sel.text + "]";
              domElement.focus();
            } else if (domElement.selectionStart || domElement.selectionStart === 0) {
              var startPos = domElement.selectionStart;
              var endPos = domElement.selectionEnd;
              var scrollTop = domElement.scrollTop;

              var v = "[" + domElement.value.substring(startPos, endPos) + "]";

              domElement.value = domElement.value.substring(0, startPos) + v +
                domElement.value.substring(endPos, domElement.value.length);

              domElement.selectionStart = endPos + 2;
              domElement.selectionEnd = endPos + 2;
              domElement.scrollTop = scrollTop;
              domElement.focus();
            } else {
              domElement.value += "[]";
              domElement.focus();
            }
          });
        }
      }
    }])
