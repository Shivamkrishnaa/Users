// import { db } from '../models'
export var userPermission = function(action, access){
    return (req, res, next) => {
        // if(req.user.type=="root"){
            return next();
        // };

        // db.userPolicy.findAll({
        //     where: { userId: req.user.id },
        //     include: [{ model: db.policy, required: true,  include: [{ model: db.policyAction, required: true, include: [{ model: db.action,  required: true, where: { name: {like: '%'+action+'%'} } }]  }]  }]
        // })
        // .then(r => {
        //     if(!r || !r[0] || !r[0].policy || !r[0].policy.policyActions.length){
        //         throw new RequestError('You don\'t have permission to access' ,401);
        //     } else {
        //         var status = true;
        //         for(var j=0; j<r.length; j++){
        //             for(var i=0; i<r[j].policy.policyActions.length; i++){
        //                 var data = r[j].policy.policyActions[i].action.name.split('-');
        //                 if(data[data.length-1] == "eye"){
        //                     status = false;
        //                 }
        //             }
        //         }
        //         if(status && access && access.length){
        //             return db.service.create({
        //                companyId: req.user.companyId,
        //                employeeId: req.user.id,
        //                action: access,
        //                status: "pending",
        //                value: JSON.stringify(req.body) 
        //             })
        //             .then(r => {
        //                 throw new RequestError('Your request is under review.',401);
        //             })
        //         }
        //         return next();
        //     }
        // }).catch((err)=>{
        //     console.log(err+" "+action);
        //     next(err);
        // })
    }
}; 