import { Request, Response } from 'express';
import { Product, ProductStore } from '../model/product';
import jwt from 'jsonwebtoken';

const store = new ProductStore();

// Show all products
export const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400).send(error);
  }
};

// show certain product with certain requirements 
export const show = async (req: Request, res: Response) => {
  try {
    const getProduct = await store.show(parseInt(req.params.id));
    res.json({ getProduct });
  } catch (error) {
    res.status(404).send(error);
  }
};

// Create Product
export const create = async (req: Request, res: Response) => {
  //Check if Token is valid
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const product: Product = {
    name: req.body.name,
    description: req.body.description,
    price: parseInt(req.body.price),
    category: req.body.category,
  };

  try {
    const newProducts = await store.create(product);
    res.json({
      product: { ...newProducts },
      message: `Successfully created ${newProducts.name}`,
    });
  } catch (error) {
    res.status(404).send({ message: `Couldn't create ${product.name}` });
  }
};

// Update products
export const update = async (req: Request, res: Response) => {
  //Check Token
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const product: Product = {
    id: parseInt(req.params.id),
    name: req.body.name,
    description: req.body.description,
    price: parseInt(req.body.price),
    category: req.body.category,
  };
  try {
    const newProducts = await store.update(product);
    res.json({
      product: { ...newProducts },
      message: `Successfully updated ${product.name}`,
    });
  } catch (error) {
    res.status(404).json({ message: `Couldn't update ${product.id}` });
  }
};
// Remove Product
export const remove = async (req: Request, res: Response) => {
  //Check Token if valid
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const deletedProduct = await store.delete(parseInt(req.params.id));
    res.json({
      product: { ...deletedProduct },
      message: `successfully removed ${deletedProduct.name}`,
    });
  } catch (error) {
    res.status(404).json({ message: `Couldn't delete product` });
  }
};
// Filter products by category
export const filterByCategory = async (req: Request, res: Response) => {
  const category = req.query.category as string;
  try {
    const products = await store.filterByCategory(category);
    res.status(200).json({
      products: { ...products },
      message: `Successfully filtered category by ${category}`,
    });
  } catch (error) {
    res.status(404).json({
      message: `Couldn't find products with ${category} as category`,
    });
  }
};