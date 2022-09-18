import { Pool } from 'pg';
import config from './configuration';
const { PORT, HOST, DATABASE, USER, PASSWORD } = config;
const Connection = new Pool({
  host: HOST,
  port: parseInt(PORT as string, 10),
  database: DATABASE,
  user: USER,
  password: PASSWORD,
});

export default Connection;