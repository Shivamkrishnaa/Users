import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import config from './config';
import { db } from './models';

var TokenExtractor = function(req){
    var token = null;
    if (req && req.cookies){
        token = req.cookies['XSRF-token'];
    }
    return token;
}


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest : TokenExtractor,
    secretOrKey : config.app.secret,
}, async (payload, done) => {
    try{
        var user = null;
        if (payload.iam == "employee") user = await db.Employee.findOne({ where: { id: payload.sub }, attributes: ['id', 'firstname', 'lastname', 'email', 'companyId' ,'password', 'attempt', 'loggedOutAt', 'status', 'valid', 'createdAt', 'isNewUser'], required: true, include: [{ model: db.Company }] });
        else if (payload.iam == "root") {
            user = await db.User.findOne({ where: { id: payload.sub }, attributes: ['id', 'firstname', 'lastname', 'email', 'companyId' , 'password', 'attempt', 'loggedOutAt', 'status', 'valid', 'createdAt', 'isNewUser'], required: true, include: [{ model: db.Company }] });
        }
        user.type = payload.iam;
        const tokenDate = new Date(payload.iat);
        if (user.loggedOutAt != null && (tokenDate.getTime() - user.loggedOutAt.getTime()) < 0) {
            return done('invalid', false);
        }

        if (new Date(payload.exp) < new Date()) {
            return done('expired', false);
        }        user.type = payload.iam

        if (user.isNewUser) {
            return done(null, user, 'isNewUser/' + user.email);
        } 
        if(!user){
            return done('user', false);
        }
        done(null, user);
    }catch(error){
        done(error, false);
    }
}));
