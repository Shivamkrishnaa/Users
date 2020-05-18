export default {
    index(req, res, next){
        res.render('user');
    },
    error(req, res, next){
        res.render('404');
    }
}