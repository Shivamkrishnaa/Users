import JWT from 'jsonwebtoken';
import config from '../../../config';
import neo4j from 'neo4j-driver';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'root'))
const session = driver.session()

var JWTSign = function (iss, user, date) {
    return JWT.sign({
        iss: config.app.name + '-' + iss,
        sub: user.id,
        iam : user.type,
        iat: date.getTime(),
        exp: new Date().setMinutes(date.getMinutes() + 30)
    }, config.app.secret);
}

export default {
    async login(req, res){
        var date = new Date();
        var token = JWTSign('USER', req.user, date);
        res.cookie('XSRF-token', token, {
            expire: new Date().setMinutes(date.getMinutes() + 30),
            httpOnly: true, secure: config.app.secure
        });
        return res.status(200).json({ success: true });
    },
    async index(req, res, next){
        console.log(1);
        session.run(
            'CREATE (a:Person {name: $name}) RETURN a',
            { name: "shivam" }
          ).then(r=>{
              JSON.stringify(r)
              return res.send( r.records[0]);
              session.close()
          })
          .catch(e=>{
            next(e)}
            )
    }
};