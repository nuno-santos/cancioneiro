var express = require('express');
var router = express.Router();
var auth = require('../custom_modules/auth-jwt');
var mongo = require('../custom_modules/db-mongo');
var texManage = require('../custom_modules/tex-manager');
var PDFLatex = require('pdflatex');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    mongo.authenticateUser(username, password)
        .then(function() {
            var user = { username: username };
            var authResults = auth.authenticate(user);
            res.json(authResults);
        })
        .catch(function(err) {
            res.json(err);
        });
});

router.post('/users', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    mongo.registerUser(username, password)
        .then(function() {
            res.json({ success: true });
        })
        .catch(function(err) {
            res.json({ success: false, error: err });
        });
});

router.get('/tex/:songID', auth.isAuth, function(req, res) {
    texManage.getTex(req.params.songID).then(function(data) {
        res.json(data);
    });
});

router.get('/tex/:songID/pdf', function(req, res) {
    texManage.getPdf(req.params.songID).then(function(data) {
        res.writeHead(200, { 'Content-Type': 'application/pdf' });
        res.end(data, 'binary');
    });
});


router.post('/tex/:songID', auth.isAuth, function(req, res) {
    texManage.save(req.params.songID, req.body.data).then(function() {
        res.json({ success: true });
    }).catch(function(error) {
        res.json({ success: true, error: error });
    });
});

router.get('/users', auth.isAuth, function(req, res) {
    res.send(req.user);
});

router.get('/whoami', auth.isAuth, function(req, res) {
    res.send(req.user);
});

router.get('/users/:id', auth.isAuth, function(req, res) {
    res.send(req.user);
});

router.get('/songs', auth.isAuth, function(req, res) {
    mongo.getSongs().then(function(songs) {
        res.json(songs.songs);
    });
});

router.get('/songs/:songID', auth.isAuth, function(req, res) {
    mongo.getSong(req.params.songID).then(function(song) {
        res.json(song);
    });
});

router.post('/songs', auth.isAuth, function(req, res) {
    mongo.createSong(req.body.name)
        .then(function(songResult) {
            texManage.createTex(songResult.song)
                .then(function() {
                    res.json(songResult);
                });
        });
});

router.delete('/songs/:id', auth.isAuth, function(req, res) {
    mongo.deleteSong(req.params.id)
        .then(function(songResult) {
            return texManage.deleteTex(songResult.song);
        })
        .then(function() {
            res.json({ success: true });
        })
        .catch(function(error) {
            console.log(error);
            res.json(error);
        });
});

module.exports = router;
