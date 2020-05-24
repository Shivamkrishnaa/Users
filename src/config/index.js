import fs from 'fs';
import path from 'path';
var data ={ };
fs.readdirSync(__dirname).forEach((file)=>{
if(file != 'index.js'){
    data[file.split('.')[0]] = require(path.join(__dirname, file))['default']
}
})
export default data;