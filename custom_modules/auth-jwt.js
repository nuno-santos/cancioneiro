var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var passport = require("passport");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'z-_64+gm)vaxm-qfq%hj6&lo+n_xx8mr&@ei!t6!tu0_p(78hy';
opts.issuer = "issuer";
opts.audience = "audience";
opts.algorithms = "HS256";

passport.use(new JwtStrategy(opts, function(payload, next) {
    var user = payload.user;
    return next(null, user, {});
}));

var createToken = function(user) {
    return jwt.sign(
        { user: user },
        opts.secretOrKey,
        {
            algorithm: opts.algorithms,
            expiresIn: "7d",
            issuer: opts.issuer,
            audience: opts.audience
        }
    );
};

module.exports = {
    isAuth: passport.authenticate('jwt', { session: false }),
    authenticate: function(user) {
        return {
            success: true,
            auth: { user: user, token: createToken(user), authType: 'JWT' }
        };
    }
};
