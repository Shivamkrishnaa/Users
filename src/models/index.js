import { readdirSync } from 'fs';
import mongoose from 'mongoose';
import config from './../config';
import { basename as _basename, join } from 'path';
const db = {};
var url = config.db.mongodbUrl; 
mongodb.connect(url,{useNewUrlParser: true})
.then(()=>{
    console.log('db conneted');
})
export {db};