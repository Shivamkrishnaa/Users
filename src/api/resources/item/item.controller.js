import { Merchant } from './../../../models/merchant';
import { Item } from './../../../models/item';
export default{
    async index(req, res, next){
        if(req.user.type == "merchant"){
        Item.find({  merchant_id : req.user.id },{  _id : 0, __v : 0/*, name : 1 , price : 1 , description : 1 , createdAt : 1, /*updatedAt : 0 , _id : 0 , merchant_id : 1*/} )
        .then(r => {
            res.status(200).json(r)
        })
        .catch(err => {
            next(err)
        })
    }
    else {next( new RequestError("You're not a Merchant.")) }
    },
    async fetchById(req, res, next){
        if(req.user.type == "merchant"){
        Item.find({  merchant_id : req.user.id , id : req.params.id },{  _id : 0, __v : 0/*, name : 1 , price : 1 , description : 1 , createdAt : 1, /*updatedAt : 0 , _id : 0 , merchant_id : 1*/} )
        .then(r => {
            res.status(200).json(r)
        })
        .catch(err => {
            next(err)
        })
    }
    else {next( new RequestError("You're not a Merchant.")) }
    },
    async create(req, res, next){
        const { name, price, description} = req.body;
        if(req.user.type == "merchant"){
            Item.find({ name : name , merchant_id : req.user.id })
            .then(r=>{
                if(r[0]) throw new RequestError('Item already exists merchant.')
                else return Item.countDocuments({ merchant_id : req.user.id })
            })
            .then(r=>{
                 return new Item({
                    id : Math.ceil(r + 1),
                    name : name,
                    price : price,
                    description : description,
                    merchant_id : req.user.id
                }).save();
            })
            .then(r => {
                res.status(200).json({ success : 1 });
            })
            .catch(err => {
                next(err);
            })
        }
        else {next( new RequestError("You're not a Merchant.")) }
    },
    async update(req, res, next){
        const { name, price, description} = req.body;
        if(req.user.type == "merchant" && req.params.id ){
            Item.find({ id : req.params.id , merchant_id : req.user.id })
            .then(r=>{
                if (r[0]) {
                    var data = {};
                    data.name = (name) ? name : r[0].name;
                    data.price = (price) ? price : r[0].price;
                    data.description = (description) ? description : r[0].description;
                    return data;
                    // if (name) return Item.find({ name: name, merchant_id: req.user.id }).then(r => [r, data]);
                    // else {
                    //     return [false, data];
                    // }
                }
                else throw new RequestError('Item do not exists',400);
            })
            .then(( /*[ item, data]*/ data)=> {
            //   if(data && item.length)throw new RequestError('Item with same name already exists .', 401);
            // else 
            return Item.update({ id : req.params.id , merchant_id : req.user.id }, data)
            })
            .then(r => {
                res.status(200).json({ success : 1 });
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
        }
        else {next( new RequestError("You're not a Merchant.")) }
    },
    async delete(req, res, next){
        if(req.user.type == "merchant" && req.params.id ){
            Item.find({ id : req.params.id , merchant_id : req.user.id })
            .then(r=>{
                if (r[0]) {
                   return Item.deleteOne({ _id: r[0]._id })
                }
                else throw new RequestError('Item do not exists',400);
            })
            .then(r => {
                res.status(200).json({ success : 1 });
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
        }
        else {next( new RequestError("You're not a Merchant or invalid id.",400)) }
    }

}