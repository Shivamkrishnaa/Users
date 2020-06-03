import { Merchant } from './../../../models/merchant';
import { Item } from './../../../models/item';
import { User } from './../../../models/user';
import { Order } from './../../../models/order';
export default{
    async index(req, res, next){
        if(req.user.type == "root"){
        Order.find({user_id : req.user.id },{  user_id : 0, _id : 0, __v : 0, createdAt : 0 , updatedAt : 0})
        .then(r => {
           return res.status(200).json(r);
        })
        // .then(r => {
        //     res.status(200).json(r)
        // })
        .catch(err => {
            next(err)
        })
    }
    else {next( new RequestError("You're not a User.")) }
    },
    async fetchById(req, res, next){
        if(req.user.type == "root" && req.params.id ){
            Order.find({user_id : req.user.id , id : req.params.id },{  user_id : 0, _id : 0, __v : 0, createdAt : 0 , updatedAt : 0})
            .then(r => {
                if(r && r[0]) return res.status(200).json(r[0]);
                else throw new RequestError("Invalid order id.",400)
            })
        .catch(err => {
            next(err)
        })
    }
    else {next( new RequestError("You're not a User.")) }
    },
    async create(req, res, next){
        const { items } = req.body;
        if(req.user.type == "root"){
            if(!(items && items.length))next( new RequestError("Select atleast one item.")); 
            User.find({ id : req.user.id })
            .then(r=>{
                if( !(r && r[0]) ) throw new RequestError('Invalid User received.')
                else {
                    var valid = false;
                    var myItems = { }
                    var ItemsList= items.reduce( (p,a) => {
                        return p.then( () =>{
                            return Item.find({ id: a },{  _id : 0, __v : 0})
                            .then(r =>{ 
                                if(!(r && r[0]))myItems[a]={ itemStatus : `Item number ${a} is out of stock. ` , valid : false, item: "Out of Stock" }
                               else { valid = true;
                                   if(myItems.hasOwnProperty(a)) myItems[a]={ itemStatus : `Item exists` , item: r[0] , valid : true, count : (myItems[a].count + 1 )}
                                    else  myItems[a]={ itemStatus : "Item exists" , item: r[0] , valid : true , count : 1 }}
                             })
                        })
                    }, Promise.resolve())
                }
                return ItemsList.then(r=>[myItems,valid]);
            })
            .then(([myCart , validItems]) => {console.log(myCart)
                if(!validItems) throw new RequestError('Every item is invalid or out of stock.')
                else return Order.countDocuments().then(r => [r, myCart])
            })
            .then(([counter , myCart]) => {
                console.log(myCart)
                console.log(myCart,myCart[3].item,counter);
                var invalidItems = [];
                var validItems = [];
                var Data = { id: parseInt(counter + 1), 'items': [], total_price: 0, user_id: req.user.id, merchant_id: [], placedAt: new Date() };
                var keys = Object.keys(myCart);
                for (var i = 0; i < Object.keys(myCart).length; i++) {
                    if (myCart[keys[i]].valid) {
                        Data['total_price'] = parseInt(parseInt(Data['total_price']) + parseInt(myCart[keys[i]].count * myCart[keys[i]].item.price));
                        Data['items'] = Data['items'].push(myCart[keys[i]].item.id);
                        Data['merchant_id'] = Data['merchant_id'].push(myCart[keys[i]].item.merchant_id);
                        validItems.push(myCart[keys[i]].item )
                    }
                    else invalidItems.push(myCart[keys[i]] )
                }
                console.log(Data)
                return new Order(Data).save().then(r => [r, invalidItems, validItems])
            })
            .then(([r,invalidItems, validItems]) => {
                return  res.status(200).json({ success : 1 , invalidItems : invalidItems , validItems :validItems });
            })
            .catch(err => {
                next(err);
            })
        }
        else {next( new RequestError("You're not a User.")) }
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