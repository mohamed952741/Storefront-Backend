CREATE TABLE order_item(
id SERIAL PRIMARY KEY NOT NULL,
order_id bigint REFERENCES orders(id) NOT NULL,
product_id bigint REFERENCES product(id) NOT NULL,
quantity INTEGER
);