import supertest from 'supertest';
import app from '../../server';
import Connection from '../../database';
import * as dotenv from 'dotenv';

const request = supertest(app);
dotenv.config();
let token: string;

describe('Test User endpoints', () => {
  afterAll(async () => {
    const conn = await Connection.connect();
    const sql = 'TRUNCATE users RESTART IDENTITY CASCADE; ';
    await conn.query(sql);
    conn.release();
  });
  it('test index endpoint', async () => {
    const response = await request.get('/store/users');
    expect(response.body).toEqual('Access denied, invalid token');
  });
  it('test create endpoint', async () => {
    // sent  as x-www-form-urlencoded
    const response = await request
      .post('/store/users')
      .send(
        'email=email@example.com&username=username&firstname=firstname&lastname=lastname&password=password'
      );
    //save token to use later
    token = response.body;
    expect(response.status).toEqual(200);
  });
  it('test sending wrong token to show endpoint', async () => {
    const response = await request
      .get('/store/users/1')
      .set('Authorization', 'Bearer 123');
    expect(response.body).toEqual('Access denied, invalid token');
  });
  it('test sending valid token to show endpoint', async () => {
    const response = await request
      .get('/store/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  
});
