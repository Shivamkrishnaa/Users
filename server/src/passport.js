import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

import config from './config';

var TokenExtractor = function(req){
    var token = null;
    if (req && req.cookies){
        token = req.cookies['XSRF-token'];
    }
    return token;
}


// JSON WEB TOKENS STRATEGY
passport.use('user-jwt', new JwtStrategy({
    jwtFromRequest: TokenExtractor,
    secretOrKey: config.app.secret,
}, async (payload, done) => {
    try {

    } catch (error) {
        done(error, false);
    }
}));



// EMPLOYEE LOCAL STRATEGY
passport.use('user-local', new LocalStrategy({
    usernameField: 'email' ,
    passReqToCallback: true
}, async (req, email, password,  done) => {
    try{
        
    } catch (error) {
        done(error, false);
    }
}));
