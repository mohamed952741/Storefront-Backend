import supertest from 'supertest';
import app from '../../server';
import Connection from '../../database';
import * as dotenv from 'dotenv';

let token: string;
const request = supertest(app);
dotenv.config();
describe('Test Order endpoints', () => {
  afterAll(async () => {
    const conn = await Connection.connect();
    const sql =
      'TRUNCATE order_item RESTART IDENTITY CASCADE;\nTRUNCATE product RESTART IDENTITY CASCADE;\nTRUNCATE orders RESTART IDENTITY CASCADE;\nTRUNCATE users RESTART IDENTITY CASCADE; ';
    await conn.query(sql);
    conn.release();
  });
  it('test create order endpoint', async () => {
    const createUser = await request
      .post('/store/users')
      .send(
        'email=email@example.com&username=username&firstname=firstname&lastname=lastname&password=password'
      );
    token = createUser.body;
    const response = await request
      .post('/store/orders')
      .send('status=active')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toBe('Created order successfully');
  });
  it('test getOrderbyUserId order endpoint', async () => {
    const response = await request
      .get('/store/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toBe('Order retrieved successfully');
  });
  it('test addProduct endpoint', async () => {
    await request
      .post('/store/products')
      .send('name=dummy&description=dummy&price=15&category=dummy')
      .set('Authorization', `Bearer ${token}`);
    const response = await request
      .post('/store/orders/1/products')
      .send('quantity=1&productId=1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toBe(
      'Successfully added a product to the order'
    );
  });
});
