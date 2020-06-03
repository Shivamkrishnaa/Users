import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import config from './config';
import { User } from './models/user';
import { Merchant } from './models/merchant';
function comparePassword(dbPass, password) {
return bcrypt.compareSync(password, dbPass);
}

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
        if (payload.iam == "merchant") user = await Merchant.find({  id: payload.sub });
        else if (payload.iam == "root") {
            user = await User.find({ id: payload.sub });
        }
        user = json(user[0]);
        user.type = payload.iam;
        const tokenDate = new Date(payload.iat);
        if (user.loggedOutAt != null && (tokenDate.getTime() - user.loggedOutAt.getTime()) < 0) {
            return done('invalid', false);
        }

        if (new Date(payload.exp) < new Date()) {
            return done('expired', false);
        }  
        if(!user){
            return done('user', false);
        }
        done(null, user);
    }catch(error){
        console.log(error)
        done(error, false);
    }
}));


// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async ( req, email, password ,done) => {
    try {
        User.find({ email: email })
       .then(async user => {
           user= (user[0]);
            if (!user) {
                return done(null, false);
            }
            var isMatch = await comparePassword(user.password, password)
            if (!isMatch) {
                return done('invalidPassword' , false);
            } 
           done(null, user);
       })
       .catch(err=>{
           console.log(err)
        return done('invalid', false);
       })
    } catch (error) {
        done(error, false);
    }
}));
// LOCAL STRATEGY
passport.use('merchant-login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req,email, password ,done) => {
    try {
        Merchant.find({ email: email })
       .then(async user => {
           user= (user[0]);
            if (!user) {
                return done(null, false);
            }
            var isMatch = await comparePassword(user.password, password)
            if (!isMatch) {
                return done('invalidPassword' , false);
            } 
           done(null, user);
       })
       .catch(err=>{
           console.log(err)

        return done('invalid', false);
       })
    } catch (error) {
        done(error, false);
    }
}));