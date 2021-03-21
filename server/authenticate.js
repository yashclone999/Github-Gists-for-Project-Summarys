const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const secretKey = "key";
const User = require('./Models/Users');



/*---------------------------------------JWT TOKEN AUTH--------------------*/

exports.createToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: 3600 });
}


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};

const verifyToken = (jwt_payload, done) => {
    
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
    
}

passport.use(new JwtStrategy(options, verifyToken));

exports.verifyUsingToken = passport.authenticate("jwt", { session: false });



/*---------------------------------------JWT TOKEN AUTH--------------------*/