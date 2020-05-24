import 'dotenv/config';
import { restRouter } from './api';
import config from './config';
import cors from 'cors';
import appManager from './app';
import './passport';
import kue from './kue';
import scheduler from './scheduler';
import path from 'path';
import './errors';

global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;
// const LANDINGPORT = config.app.landingPort;

const app = appManager.setup(config, path.join(__dirname, 'web', 'resources', 'views', 'layouts', 'main.hbs'));
// const landingApp = appManager.setup(config, null);

app.use(cors());

/* Route handling */
app.use('/api', restRouter);


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
          return res.json({ errors: [error.message] });
      } else {
          return res.send('Error');
      }
  });

kue.init();
scheduler.init();
    
/* Start Listening service */
app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
  });