import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
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
            Post.find({ },  { name :1 , id : 1 , _id : 0} )
            .then(r=>{
                res.status(200).json(r);
            })
            .catch(err=>{
                next(err);
            })
    },
    async create(req, res, next){
        Post.find()
        .then(r=>{
            const post = new Post({
                name: req.body.name,
                "id":r.length +1,
           })
           return post.save()
        })
        .then(r=>{
            res.status(200).json({ success : true , msg : 'UserAdded successfully' });
        })
        .catch(err=>{
            console.log(err);
            next(err);
        })
      
    },
    async get(req, res, next){
        Post.find({ id: req.params.id },   { name :1 , id : 1 , _id : 0} )
        .then(r=>{
            res.status(200).json(r);
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    },
    async update(req, res, next){
        var hero = {
            name: req.body.name
        }
        Post.update({ id: req.params.id}, hero, function(err, hero) {
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
        Post.deleteOne({ id: req.params.id})
        .then( function(hero) {
           
            res.json({
                message : "User deleted successfully"
            })
        })
        .catch(err=>{
            console.log(err);
            next(err);
        })
    }
}