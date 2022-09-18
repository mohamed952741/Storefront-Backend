import express, { Request, Response } from 'express';
import orders from './order';
import products from './products';
import users from './users';
const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.status(200);
  res.send('Main Route');
});
// API routes here
routes.use('/', users);
routes.use('/', products);
routes.use('/', orders);
export default routes;