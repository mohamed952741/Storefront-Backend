import { User, UserStore } from '../../model/user';
import Connection from '../../database';
const store = new UserStore();

describe('Test User Model methods', () => {
  it('should contain index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should contain show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should contain create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should contain authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });
});
describe('Test User Model Logic', () => {
  const user: User = {
    id: 1,
    email: 'email@example.com',
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    password: 'password',
  };
  afterAll(async () => {
    const conn = await Connection.connect();
    const sql = 'TRUNCATE users RESTART IDENTITY CASCADE; ';
    await conn.query(sql);
    conn.release();
  });
  it('show all users', async () => {
    const users = await store.index();
    expect(users.length).toBe(0);
  });
  it('create new user', async () => {
    const newUser = await store.create(user);
    expect(newUser.id).toEqual(1);
  });
  it('Show certain user', async () => {
    const showUser = await store.show(user.id as number);
    expect(showUser.username).toEqual(user.username);
  });
  it('Make sure user authenticated', async () => {
    const auth = await store.authenticate(user.username, user.password);
    expect(auth?.username).toEqual(user.username);
  });
});
