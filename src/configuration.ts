import * as dotenv from 'dotenv';

dotenv.config();
const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_TEST_DATABASE,
  DB_USER,
  DB_PASSWORD,
  ENV,
} = process.env;

export default {
  PORT: DB_PORT,
  HOST: DB_HOST,
  DATABASE: ENV === 'dev' ? DB_DATABASE : DB_TEST_DATABASE,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD,
};