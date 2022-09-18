import supertest from 'supertest';
import app from '../../server';
import Connection from '../../database';
import * as dotenv from 'dotenv';
let token: string;

const request = supertest(app);
dotenv.config();

describe('Test Product endpoints', () => {
  afterAll(async () => {
    const conn = await Connection.connect();
    const sql =
      'TRUNCATE users RESTART IDENTITY CASCADE;\nTRUNCATE product RESTART IDENTITY CASCADE; ';
    await conn.query(sql);
    conn.release();
  });
  it('test index endpoint', async () => {
    const response = await request.get('/store/products');
    expect(response.statusCode).toEqual(200);
  });
  it('test show endpoint', async () => {
    const response = await request.get('/store/products/1');
    expect(response.body).toEqual({});
  });
  it('test create endpoint', async () => {
    const createUser = await request
      .post('/store/users')
      .send(
        'email=email@example.com&username=username&firstname=firstname&lastname=lastname&password=password'
      );
    token = createUser.body;
    const response = await request
      .post('/store/products')
      .send('name=dummy&description=dummy&price=15&category=dummy')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toEqual('Successfully created dummy');
  });
  it('test filterByCategory endpoint', async () => {
    const response = await request.get('/store/filter?category=dummy');
    expect(response.body.message).toEqual('Successfully filtered category by dummy');
  });
  it('test update endpoint', async () => {
    const response = await request
      .put('/store/products/1')
      .send('name=edited&description=edited&price=15&category=edited')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.product.name).toEqual('edited');
  });

  it('test delete endpoint', async () => {
    const response = await request
      .delete('/store/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toEqual('successfully removed edited');
  });
});
