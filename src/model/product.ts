import Connection from '../database';

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
};
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Connection.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not return any products from the database: ${error}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await Connection.connect();
      const sql = `SELECT * FROM product WHERE id = ${id}`;
    
      const result = await conn.query(sql);
      conn.release();
   
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not return any product with id ${id} from the database: ${error}`
      );
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const conn = await Connection.connect();
      const sql = `INSERT INTO product (name, description, price,category) VALUES ('${p.name}', '${p.description}', ${p.price},'${p.category}') RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create product to the database: ${error}`);
    }
  }
  async update(p: Product): Promise<Product> {
    try {
      const conn = await Connection.connect();
      const sql = `UPDATE product SET name = '${p.name}', description = '${p.description}', price = ${p.price}, category = '${p.category}' WHERE id=${p.id} RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update product in the database: ${error}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const conn = await Connection.connect();
      const sql = `DELETE FROM product WHERE id=${id} RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete with id ${id} product from the database: ${error}`);
    }
  }
  async filterByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Connection.connect();
      const sql = `SELECT * FROM product WHERE category='${category}'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Could not find product by the category ${category}: ${error}`
      );
    }
  }
}