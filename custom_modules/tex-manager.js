var fs = require('fs-extra');
var q = require('q');
var path = require('path');
var texPath = path.join(__dirname, "../tex/");
var texFile = texPath + "main.tex";
var pdfFile = texPath + "main.pdf";
var exec = require('child_process').exec;

var createTex = function(song) {
    var deferred = q.defer();
    fs.copy(texFile, texPath + song.texFile, function(err) {
        if (err) {
            return console.error(err);
        }
        fs.copy(pdfFile, texPath + song.pdfFile, function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("success!");
            deferred.resolve({ success: true });
        });
    });

    return deferred.promise;
};

var deleteTex = function(song) {
    var deferred = q.defer();
    fs.remove(texPath + song.id + ".*", function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("success!");
        deferred.resolve({ success: true });
    });

    return deferred.promise;
};
var getTex = function(id) {
    var deferred = q.defer();
    fs.readFile(texPath + id + ".tex", function(err, data) {
        if (err) {
            return console.error(err);
        }
        deferred.resolve({ success: true, data: data.toString() });
    });
    return deferred.promise;
};

var getPdf = function(id) {
    var deferred = q.defer();
    fs.readFile(texPath + id + ".pdf", function(err, data) {
        if (err) {
            return console.error(err);
        }
        deferred.resolve(data);
    });
    return deferred.promise;
};


var save = function(id, data) {
    var deferred = q.defer();
    fs.writeFile(texPath + id + ".tex", data,
        function(err) {
            if (err) {
                deferred.reject({ success: false });
            }
            console.log("The file was saved!");

            exec("pdflatex " + texPath + id + ".tex", { cwd: texPath }, function(err) {
                if (err) {
                    console.log(err);
                    deferred.reject({ success: false, error: err });
                }
                
                console.log("exec");
                deferred.resolve({ success: true });
            });
        });
    return deferred.promise;
};

module.exports = {
    createTex: createTex,
    deleteTex: deleteTex,
    getTex: getTex,
    getPdf: getPdf,
    save: save
};
