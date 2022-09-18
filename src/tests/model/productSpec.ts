import { Product, ProductStore } from '../../model/product';
import Connection from '../../database';

const store = new ProductStore();

describe('Test Product Model methods', () => {
  it('should contain index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should contain show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should contain create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should contain update method', () => {
    expect(store.update).toBeDefined();
  });
  it('should contain delete method', () => {
    expect(store.delete).toBeDefined();
  });
  it('should contain filterByCategory method', () => {
    expect(store.filterByCategory).toBeDefined();
  });
});

describe('Test Product Model Logic', () => {
  const product: Product = {
    id: 1,
    name: 'dummy product',
    description: 'dummy description',
    price: 19,
    category: 'dummy category',
  };
  const updatedProduct: Product = {
    id: 1,
    name: 'dummy updated',
    description: 'dummy updated',
    price: 10,
    category: 'dummy updated',
  };
  afterAll(async () => {
    const conn = await Connection.connect();
    const sql = 'TRUNCATE product RESTART IDENTITY CASCADE; ';
    await conn.query(sql);
    conn.release();
  });
  it('does not show product if it does not exist', async () => {
    const showProduct = await store.show(product.id as number);
    expect(showProduct).toBeUndefined();
  });
  it('should create new product', async () => {
    const createdProduct = await store.create(product);
    expect(createdProduct.id).toEqual(product.id);
  });
  it('show product after being created', async () => {
    const showProduct = await store.show(product.id as number);
    expect(showProduct.id).toEqual(1);
  });
  it('filter product by category', async () => {
    const filteredProduct = await store.filterByCategory(product.category);
    expect(filteredProduct.length).toBe(1);
  });
  it('update product', async () => {
    const editedProduct = await store.update(updatedProduct);
    expect(editedProduct.name).toEqual(updatedProduct.name);
  });
  it('Remove product', async () => {
    const editedProduct = await store.delete(2);
    expect(editedProduct).toBeUndefined();
  });
});
