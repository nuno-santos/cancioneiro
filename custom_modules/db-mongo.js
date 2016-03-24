var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Teste');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var q = require("q");
var uuid = require('node-uuid');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', UserSchema);

var registerUser = function(username, password) {
    var deferred = q.defer();
    var user = new User({
        username: username,
        password: password
    });
    user.save(function(err) {
        if (err) {
            deferred.reject(err);
        }
        console.log('User saved successfully');
        deferred.resolve({ success: true });
    });
    return deferred.promise;
};

var authenticateUser = function(username, password) {
    var deferred = q.defer();
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            deferred.reject({ success: false, error: err });
        }

        if (!user) {
            deferred.reject({ success: false, error: err });
        } else {
            // check if password matches
            user.comparePassword(password, function(err, isMatch) {
                if (isMatch && !err) {
                    // return the information including token as JSON
                    deferred.resolve({ success: true });
                } else {
                    deferred.reject({ success: false, error: err });
                }
            });
        }
    });
    return deferred.promise;
};

var SongSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    texFile: {
        type: String
    },
    pdfFile: {
        type: String
    }
});

var Song = mongoose.model('Song', SongSchema);

var createSong = function(name) {
    var deferred = q.defer();

    var id = uuid.v1();

    var song = new Song({
        name: name,
        id: id,
        texFile: id + ".tex",
        pdfFile: id + ".pdf"
    });
    song.save(function(err) {
        if (err) {
            deferred.reject(err);
        }
        console.log('song saved successfully');
        deferred.resolve({ success: true, song: song });
    });
    return deferred.promise;
};

var getSongs = function() {
    var deferred = q.defer();
    Song.find({}, function(err, songs) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve({ success: true, songs: songs });
    });
    return deferred.promise;
};

var getSong = function(songID) {
    var deferred = q.defer();
    Song.findOne({ id: songID }, function(err, song) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve({ success: true, song: song });
    });
    return deferred.promise;
};


var deleteSong = function(songID) {
    var deferred = q.defer();
    Song.findOne({ id: songID }, function(err, song) {
        if (err) {
            deferred.reject(err);
        }
        song.remove();
        deferred.resolve({ success: true, song: song });
    });
    return deferred.promise;
};



module.exports = {
    registerUser: registerUser,
    authenticateUser: authenticateUser,
    createSong: createSong,
    getSongs: getSongs,
    getSong: getSong,
    deleteSong: deleteSong
};
