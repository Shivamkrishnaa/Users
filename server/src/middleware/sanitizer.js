var sanitizeObj = function(key, obj, ignore, req){
    if(obj != null && (key != null && ignore.indexOf(key) == -1) && typeof obj === 'object'){
        for(var i=0;i<Object.keys(obj).length;i++){
            obj[Object.keys(obj)[i]] = sanitizeObj(Object.keys(obj)[i], obj[Object.keys(obj)[i]], ignore, req);
        }
    }else if(obj != null && (key != null && ignore.indexOf(key) == -1) && typeof obj === 'array'){
        for(var i=0;i<obj.length;i++){
            obj[i] = sanitizeObj(null, obj[i], ignore, req);
        }
    }else if(obj != null && (key != null && ignore.indexOf(key) == -1) && typeof obj == 'string' && obj != ''){
        console.log(obj)
        obj = req.sanitize(obj).trim();
    }
    return obj;
}

export var sanitize = function(ignore=[]){
    return (req, res, next) => {
        var data = [];
        if(req.body){
            req.body = sanitizeObj(null, req.body, ignore, req);
        }
        if(req.params){
            req.params = sanitizeObj(null, req.params, ignore, req);
        }
        if(req.query){
            req.query = sanitizeObj(null, req.query, ignore, req);
        } 
        next();
    }
}; 