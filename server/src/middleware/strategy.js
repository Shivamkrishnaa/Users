import passport from 'passport';
import JWT from 'jsonwebtoken';
import config from '../config';

var JWTSign = function(iss, user, date){
    return JWT.sign({
        iss : iss,
        sub : user.id,
        iam : user.type,
        iat : date.getTime(),
        exp : new Date().setMinutes(date.getMinutes() + 30)
    }, config.app.secret);
}

export var jwtStrategy = (req, res, next) => {
    passport.authenticate('user-jwt', {session: false}, (err, user, info) => { 
        let contype = req.headers['content-type'];
        var json = !(!contype || contype.indexOf('application/json') !== 0);
        if (user && user.resetPassword) {
            if(!(req.url == '/reset-password/' || req.url ==  '/createEmployeePassword/?')){
                return res.redirect('/reset-password/');
            } 
        }
        if (err && err == 'expired'){ return json?res.status(500).json({ errors: ['Session is expired']}):res.redirect('/logout'); }
        if (err && err == 'invalid'){ return json?res.status(500).json({ errors: ['Invalid token recieved']}):res.redirect('/logout'); }
        if (err && err == 'user'){ return json?res.status(500).json({ errors: ['Invalid user recieved']}):res.redirect('/logout'); }
        if (err && Object.keys(err).length) { return res.status(500).json({ errors: [ err ]}); }
        if (err) { return res.status(500).json({ errors: [ 'Invalid user recieved' ]}); }
        if (!user) { return json?res.status(500).json({ errors: ['Invalid user recieved']}):res.redirect('/logout'); }
        var date = new Date();
        var token = JWTSign(info, user, date);
        res.cookie('XSRF-token', token, {
            expire: new Date().setMinutes(date.getMinutes() + 30),
            httpOnly: true, secure: config.app.secure
        });
        req.user = user;
        next();
    })(req, res, next);
};


export var jwtLogoutStrategy = (req, res, next) => {
    passport.authenticate('user-jwt', {session: false}, (err, user, info) => {
        if(user){
            req.user = user;
        }
        next();
    })(req, res, next);
};
 
export var localStrategy = (req, res, next) => {
    passport.authenticate('user-local', {session: false}, (err, user, info) => {
        if (err && err == 'invalid') { return res.status(500).json({ errors: ['Email Id not verified']}); }
        if (err && err == 'attempt') { return res.status(500).json({ errors: ['Too many invalid attempts. Please reset your password.']}); }
        if (err && err.startsWith('attempt:')) { return res.status(500).json({ errors: ['Invalid Credentials (' + err.split(':')[1]+' Attempt(s) Left)']}); }
        if (err) { return res.status(500).json({ errors: [ err ]}); }
        if (!user) { return res.status(500).json({ errors: ['Invalid Credentials']}); }
        req.user = user;
        next();
    })(req, res, next);
};