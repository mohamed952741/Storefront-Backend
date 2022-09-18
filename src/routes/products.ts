import {
    create,
    filterByCategory,
    index,
    remove,
    show,
    update,
  } from '../controllers/products';
  import { Router } from 'express';
  
  const products = Router();
  products.get('/products', index);
  products.get('/products/:id', show);
  products.post('/products', create);
  products.put('/products/:id', update);
  products.delete('/products/:id', remove);
  products.get('/filter', filterByCategory);
  export default products;