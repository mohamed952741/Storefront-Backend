import bcrypt from 'bcrypt';
import Connection from '../database';
import * as dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Connection.connect();
      const sql = 'SELECT id,email,username,firstname,lastname FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get users from the database: ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await Connection.connect();
      const sql = `SELECT id,email,username,firstname,lastname FROM users WHERE id = ${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't get users with id ${id} from database: ${error}`
      );
    }
  }
  async create(us: User): Promise<User> {
    try {
      const conn = await Connection.connect();
      const hash = bcrypt.hashSync(
        us.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const sql = `INSERT INTO users (email,username, firstname, lastname, password) VALUES ('${us.email}', '${us.username}', '${us.firstname}', '${us.lastname}', '${hash}') RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create user to the database: ${error}`);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Connection.connect();
    const sql = `SELECT * FROM users WHERE username='${username}'`;

    const result = await conn.query(sql);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        return user;
      }
    }

    return null;
  }
}