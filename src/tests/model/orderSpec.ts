import { Order, OrderStore } from '../../model/order';
import { User, UserStore } from '../../model/user';
import { Product, ProductStore } from '../../model/product';
import Connection from '../../database';

const store = new OrderStore();
const user_store = new UserStore();
const product_store = new ProductStore();

describe('Test Order Model methods', () => {
  it('should contain create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should contain addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });
  it('should contain getOrderbyUserId method', () => {
    expect(store.getOrderbyUserId).toBeDefined();
  });
});
describe('Test Order Model method Logic', () => {
  const order: Order = {
    id: 1,
    status: 'active',
    user_id: 1,
  };
  const user: User = {
    id: 1,
    email: 'email@example.com',
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    password: 'password',
  };
  const product: Product = {
    id: 1,
    name: 'dummy product',
    description: 'dummy description',
    price: 19,
    category: 'dummy category',
  };
  beforeAll(async () => {
    await user_store.create(user);
    await product_store.create(product);
  });
  afterAll(async () => {
    const conn = await Connection.connect();
    const sql =
      'TRUNCATE order_item RESTART IDENTITY CASCADE;\nTRUNCATE users RESTART IDENTITY CASCADE;\nTRUNCATE orders RESTART IDENTITY CASCADE;\nTRUNCATE product RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
  });
  it('should create order', async () => {
    const newOrder = await store.create(order);
    expect(newOrder).toBeDefined();
  });
  it('should get order by user id', async () => {
    const orderId = await store.getOrderbyUserId(user.id as number);
    expect(orderId[0].id).toEqual(1);
  });
  it('should add product to order', async () => {
    const addProduct = await store.addProduct(5, 1, 1);
    expect(addProduct).toBeDefined();
  });
});
