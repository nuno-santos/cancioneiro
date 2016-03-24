angular.module("default")
    .factory("Songs", function($resource) {
        var songs = [];
        var songsAPI = $resource('api/songs/:songID');
        var getSongsList = function() {
            return songs;
        };
        var querySongs = function() {
            songsAPI.query().$promise.then(function(allSongs) {
                angular.copy(allSongs, songs);
            });
        };

        var getSong = function(songID) {
            return songsAPI.get({ songID: songID }).$promise;
        };

        var createSong = function(name) {
            return songsAPI.save({ name: name }).$promise;
        };

        var deleteSong = function(songID) {
            return songsAPI.delete({ songID: songID }).$promise;
        };

        querySongs();

        return {
            getSongsList: getSongsList,
            getSong: getSong,
            deleteSong: deleteSong,
            createSong: createSong,
            querySongs: querySongs
        };
    });
