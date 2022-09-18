import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server of express
const app: Application = express();
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//resonse the the main route
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

//Storefront backend Route
app.use('/store', routes);

// start express server
app.listen(PORT, () => {
  console.log(`server running on  http://localhost:${PORT}`);
});

export default app;