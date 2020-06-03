import { User } from './../../../models/user';
import { Merchant } from './../../../models/merchant';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import config from './../../../config'
var JWTSign = function (user, date) {
    return JWT.sign({
        iss: config.app.name,
        sub: user.id,
        iam: user.type,
        iat: date.getTime(),
        exp: new Date().setMinutes(date.getMinutes() + 60)
    }, config.app.secret);
}

export default {
    async login(req, res, next){
        var date = new Date();
        var token = JWTSign(req.user, date);
        res.cookie('XSRF-token', token, {
            expire: new Date().setMinutes(date.getMinutes() + 60),
            httpOnly: true, secure: config.app.secure
        });
        return res.status(200).json({ success: true });
    },
    async register(req, res, next){
        const { firstName, lastName, email, password, phone } = req.body;
        var passwordHash = bcrypt.hashSync(password);
        User.countDocuments({ email: email })
        .then(user => {
            if(user) throw new RequestError('Email is already in use',409);
            else return new User({
                id: (user + 1),
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                password: passwordHash
            }).save()
        })
        .then(r=>{
            return res.json({ success: 1 })
        })
        .catch(err=>{
            next(err);
        })
    },
    async merchantLogin(req, res, next){
        var date = new Date();
        var token = JWTSign(req.user, date);
        res.cookie('XSRF-token', token, {
            expire: new Date().setMinutes(date.getMinutes() + 60),
            httpOnly: true, secure: config.app.secure
        });
        return res.status(200).json({ success: true });
    },
    async merchantRegister(req, res, next){
        const { firstName, lastName, email, password, phone } = req.body;
        var passwordHash = bcrypt.hashSync(password);
        Merchant.countDocuments({ email: email })
        .then(user => {
            if(user) throw new RequestError('Email is already in use',409);
            else return new Merchant({
                id: (user + 1),
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                password: passwordHash
            }).save()
        })
        .then(r=>{
            return res.json({ success: 1 })
        })
        .catch(err=>{
            next(err);
        })
    }
}