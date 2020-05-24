import kue from 'kue';
import config  from './config'
export var queue = kue.createQueue({
    prefix: config.kue.name,
    redis: {
      host: config.redis.host,
      port: config.redis.port,
      auth: config.redis.password
    }
});
export default {
    init: () => {
        queue.process('simulation', function (job, done) {
           
        });
    }
}