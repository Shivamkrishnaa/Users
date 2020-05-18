import mongoose from 'mongoose';
const schema = mongoose.Schema;
const postSchema = mongoose.Schema({
    
      name:{
        type: String,
        required: true
      },
      description:{
        type: String,
        required: false
      },
});
const Post = mongoose.model('post', postSchema);
export default {
    async index(req, res, next){
            Post.find()
            .then(r=>{
                res.status(200).json(r);
            })
            .catch(err=>{
                next(err);
            })
    },
    async create(req, res, next){
        const post = new Post({
            name: req.body.name
       })
        post.save()
        .then(r=>{
            res.status(200).json({ success : true });
        })
        .catch(err=>{
            console.log(err);
            next(err);
        })
      
    },
    async get(req, res, next){
        Post.get({name: req.params.name}, function(err, heros) {
            if(err) {
                res.json({
                    error: err
                })
            }
            res.json({
                heros: heros
            })
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    },
    async update(req, res, next){
        var hero = {
            name: req.body.name
        }
        Post.update({_id: req.params.id}, hero, function(err, hero) {
            if(err) {
                res.json({
                    error : err
                })
            }
            res.json({
                message : "User updated successfully"
            })
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    },
    async remove(req, res, next){
        Post.delete({_id: req.params.id}, function(err, hero) {
            if(err) {
                res.json({
                    error : err
                })
            }
            res.json({
                message : "Hero deleted successfully"
            })
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }
}