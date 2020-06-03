import passport from 'passport';
import JWT from 'jsonwebtoken';
import config from '../config';
// import json from  ;

var JWTSign = function(user, date){
    return JWT.sign({
        iss : config.app.name,
        sub : user.id,
        iam : user.type,
        iat : date.getTime(),
        exp : new Date().setMinutes(date.getMinutes() + 60)
    }, config.app.secret);
}

export var jwtStrategy = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err && err == 'expired'){ return json?res.status(500).json({ errors: ['Session is expired']}):res.redirect('/logout'); }
        if (err && err == 'invalid'){  return json?res.status(500).json({ errors: ['Invalid token recieved']}):res.redirect('/logout'); }
        if (err && err == 'user'){ return json?res.status(500).json({ errors: ['Invalid user recieved']}):res.redirect('/logout'); }
        if (err && Object.keys(err).length) { return res.status(500).json({ errors: [ err ]}); }
        if (err) {  return res.status(403).json({ errors: [ 'Invalid user recieved' ]}); }
        if (!user) {  return json?res.status(403).json({ errors: ['Invalid user recieved']}):res.redirect('/logout'); }
        //Update Token
        var date = new Date();
        var token = JWTSign(user, date);
        res.cookie('XSRF-token', token, {
            expire: new Date().setMinutes(date.getMinutes() + 30),
            httpOnly: true, secure: config.app.secure
        });
        req.user = user;
        next();
    })(req, res, next);
};

export var jwtLogoutStrategy = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if(user){
            req.user = user;
        }
        next();
    })(req, res, next);
};

export var localStrategy = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) { return res.status(401).json({ errors: [ err ]}); }
        if (!user) { return res.status(401).json({ errors: ['Invalid Credentials']}); }
        req.user = user;
        req.user.type = 'root';
        next();
    })(req, res, next);
};

export var merchantLoginStrategy = (req, res, next) => {
    passport.authenticate('merchant-login', { session: false }, (err, user, info) => {
        if (err) { return res.status(401).json({ errors: [ err ]}); }
        if (!user) { return res.status(401).json({ errors: ['Invalid Credentials']}); }
        req.user = user;
        req.user.type = 'merchant';
        next();
    })(req, res, next);
};