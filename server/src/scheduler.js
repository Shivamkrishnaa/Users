import nodeScheduler from 'node-schedule';
import { queue } from './kue';

var scheduler = {
    init: () => {

    },
    test :(simulationId,scheduledAt)=>{
        nodeScheduler.scheduleJob(scheduledAt, function(simulationId){
        }.bind(null, simulationId));
        
    }
}

export default scheduler;