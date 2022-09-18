import Connection from '../database';
export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await Connection.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES ('${order.status}', ${order.user_id}) RETURNING *`;
      const result = await conn.query(sql);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not insert order ${error}`);
    }
  }
  async getOrderbyUserId(id: number): Promise<Order[]> {
    try {
      const conn = await Connection.connect();
      const sql = `SELECT * FROM orders WHERE user_id =${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't find order for user with id ${id}`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const sql = `INSERT INTO order_item (quantity, order_id, product_id) VALUES(${quantity}, ${orderId}, ${productId}) RETURNING *`;
      const conn = await Connection.connect();
      const result = await conn.query(sql);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}