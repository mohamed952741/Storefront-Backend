import { addProduct, create, getOrderbyUserId } from '../controllers/orders';
import { Router } from 'express';

const orders = Router();
orders.post('/orders', create);
orders.get('/orders', getOrderbyUserId);
orders.post('/orders/:id/products', addProduct);
export default orders;