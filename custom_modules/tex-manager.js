var fs = require('fs-extra');
var q = require('q');
var path = require('path');
var texPath = path.join(__dirname, "../tex/");
var songFile = texPath + "main.song";
var texFile = texPath + "main.tex";
var pdfFile = texPath + "main.pdf";
var exec = require('child_process').exec;

var createTex = function(song) {
    var deferred = q.defer();

    var songSongFile = song.texFile.replace(/\.[^/.]+$/, ".song");

    fs.copy(songFile, texPath + songSongFile, function(err) {
        if (err) {
            return console.error(err);
        }
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
    fs.readFile(texPath + id + ".song", function(err, data) {
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

    // parse the input
//    var titleRe = /{\s*title\s*:\s*(.*?)\s*}/i;
    var titleRe = /<\s*title\s*>\s*(.*?)\s*\n/i;
    var titleFound = data.match(titleRe);
    console.log(titleFound[1]);

//    var artistRe = /{\s*artist\s*:\s*(.*?)\s*}/i;
    var artistRe = /<\s*artist\s*>\s*(.*?)\s*\n/i;
    var artistFound = data.match(artistRe);
    console.log(artistFound[1]);

    var body = data;
    body = body.replace(titleRe, '');
    body = body.replace(artistRe, '');

    body = body.replace(/{\s*beginverse\s*}/ig, '\\beginverse');
    body = body.replace(/{\s*endverse\s*}/ig, '\\endverse');

    body = body.replace(/{\s*beginchorus\s*}/ig, '\\beginchorus');
    body = body.replace(/{\s*endchorus\s*}/ig, '\\endchorus');

    body = body.replace(/\[/ig, '\\[');

    body = body.replace(/{\s*begintranslation\s*}/ig, '\\begin{minipage}[t]{.45\\textwidth}\\vspace{15pt}\\textit{');
    body = body.replace(/{\s*endtranslation\s*}/ig, '}\\end{minipage}\n');

    var preamble = "%\n\
% Tex-generated file based on the songs project:\n\
% http://songs.sourceforge.net/\n\
%\n\
\\documentclass{article}\n\
\\usepackage[chorded]{songs}\n\
\\usepackage[utf8]{inputenc}\n\
\\inputencoding{utf8}\n\
\n\
\\noversenumbers\n\
\n\
\\begin{document}\n\
\\songsection{Cancioneiro CL Portugal}\n\
\n\
\\begin{songs}{}\n\
\\beginsong{" + titleFound[1] + "}[by={" + artistFound[1] + "},\n\
                     sr={},\n\
                     cr={},\n\
                     index={}]\n\
";

    var epilogue = "\\endsong\n\
\\end{songs}\n\
\\end{document}\n";

    var texDoc = preamble + body + epilogue;

    console.log(texDoc);

    fs.writeFile(texPath + id + ".song", data,
        function(err) {
            if (err) {
                deferred.reject({ success: false });
            }

            fs.writeFile(texPath + id + ".tex", texDoc,
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
