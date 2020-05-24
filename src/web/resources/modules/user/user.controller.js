export default {
    index(req, res, next){
        res.render('user');
    },
    error(req, res, next){
        res.render('404');
    },
    create(req, res, next){
        if(req.params.id==0){
            res.render('create');
        }
        else res.render('edit');
    }
}