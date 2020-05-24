import { restRouter } from './api';
import { webRouter } from './web';
import 'dotenv/config';
// import { db } from './models';
import path from 'path';
import appSetup from './app';
import './errors';
import config from './config';
import mongoose from 'mongoose';

var url = config.db.mongodbUrl; 


global.appRoot = path.resolve(__dirname);
global.json = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
const PORT = config.app.port;

const app = appSetup.setup(config, path.join(__dirname, 'web','resources', 'views', 'layouts', 'main.hbs'))

app.use('/api', restRouter);
app.use('/', webRouter);

app.use((req, res, next) => {
	next(new RequestError('Invalid route', 404));
});

app.use((error, req, res, next) => {
	if (!(error instanceof RequestError)) {
		error = new RequestError('Some Error Occurred', 500, error.message);
    }
		error.status = error.status || 500;
	res.status(error.status);
	let contype = req.headers['content-type'];
	var json = !(!contype || contype.indexOf('application/json') !== 0);
	if (json) {
    return res.json({ errors: error.errorList });
  } else {
    
      return res.render(error.status.toString(), { layout: null });
    
  }
});
mongoose.connect(url,{useNewUrlParser: true})
.then(()=>{
  console.log('db conneted');
    app.listen(PORT, () => {
      console.log(`Server is running at PORT http://localhost:${PORT}`);
    });
})
