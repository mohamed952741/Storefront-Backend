# API and Database Requirements

## API Endpoints

### Users

- Index - `token required`
  - HTTP [`GET`]
  - Endpoint `/store/users`
  - Req Body : `N/A`
  - Response Body : `Array of objects`
  ```bash
  {
      "id": 1,
      "email": "test7@test6.com",
      "username": "Mohamed Ahmed",
      "firstname": "Mohamed",
      "lastname": "Ahmed",
  }
  ```
- Show - `token required`
  - HTTP [`GET`]
  - Endpoint `/store/users/:id`
  - Req Body : `N/A`
  - Response Body : `User as an object`
  ```bash
  {
  "id": 1,
  "email": "test2@test2.com",
  "username": "MohamedAhmed23",
  "firstname": "Mohamed",
  "lastname": "Ahmed"
  }
  ```
- Create - `token required`

  - HTTP [`POST`]
  - Endpoint `/store/users`
  - Req Body :

  ```bash
  {
      "email":"test4@test2.com",
      "username":"MohamedAhmed",
      "firstname":"Mohamed",
      "lastname":"Ahmed",
      "password":"password22"
  }
  ```

  - Response Body : `Token`

  ```bash
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3QyQHRlc3QxLmNvbSIsInVzZXJuYW1lIjoiTW9oYW1lZEhlc2hhbTEiLCJmaXJzdG5hbWUiOiJNb2hhbWVkMSIsImxhc3RuYW1lIjoiSGVzaGFtMSIsInBhc3N3b3JkIjoiJDJiJDEwJGJEZUl6TGJ1MFk0WVczZUUzWDRSMS53d2VQUWEzMHBCLnhHZHMyODVCUTVMSk5tdi53TloyIn0sImlhdCI6MTY2MTE2Nzg2Nn0.aydV2JLX270Yt5rESq_JbJOHBhUhL0_fWu6UjFgH2ZQ"

  ```

- Authentication
  - HTTP [`POST`]
  - Endpoint `/store/users/authenticate`
  - Req Body :
  ```bash
   {
       "username":"MohamedAhmed",
       "password":"password21"
   }
  ```
  - Response Body : `Token`
  ```bash
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3QyQHRlc3QxLmNvbSIsInVzZXJuYW1lIjoiTW9oYW1lZEhlc2hhbTEiLCJmaXJzdG5hbWUiOiJNb2hhbWVkMSIsImxhc3RuYW1lIjoiSGVzaGFtMSIsInBhc3N3b3JkIjoiJDJiJDEwJGJEZUl6TGJ1MFk0WVczZUUzWDRSMS53d2VQUWEzMHBCLnhHZHMyODVCUTVMSk5tdi53TloyIn0sImlhdCI6MTY2MTE2ODE2NH0.ipeIGA-X98PXYzOP3zx2ZLd0sbg8SUAWz1j-Q-m9K1Y"
  ```

### Products

- Index
  - HTTP [`GET`]
  - Endpoint `/store/products`
  - Req Body : `N/A`
  - Response Body : `Array of objects`
  ```bash
    [
        {
            "id": 1,
            "name": "product 1",
            "description": "desc",
            "price": 210,
            "category": "category 1"
        }
    ]
  ```
- Show

  - HTTP [`GET`]
  - Endpoint `/store/products/:id`
  - Req Body : `N/A`
  - Response Body : `Product Objects`

  ```bash
    {
        "id": 1,
        "name": "product 1",
        "description": "desc",
        "price": 210,
        "category": "category 1"
    }

  ```

- Create - `token required`

  - HTTP [`POST`]
  - Endpoint `/store/products`
  - Request Headers: `Authorization : Bearer [token required]`
  - Req Body :

  ```bash
    {
        "name":"product 1",
        "description":"desc",
        "price":210,
        "category":"category 1"
    }
  ```

  - Response Body : `User as an object`

  ```bash
     {
      "product": {
                "id": 1,
                "name": "product 1",
                "description": "desc",
                "price": 210,
                "category": "category 1"
            },
            "message": "Successfully created product 1"
     }
  ```

- Update - `token required`
  - HTTP [`PUT`]
  - Endpoint `/store/products/:id`
  - Req Body :
    ```bash
    {
        "name": "edited",
        "description": "edited",
        "price": 210,
        "category": "edited 1"
    }
    ```
  - Response Body : `Product Objects`

```bash
{
      "product": {
          "id": 1,
          "name": "edited 1",
          "description": "edited",
          "price": 210,
          "category": "edited 1"
      },
      "message": "Successfully updated edited 1"
  }
```

- Delete - `token required`
  - HTTP [`DELETE`]
  - Endpoint `/store/products/:id`
  - Req Body : `N/A`
  - Response Body : `Product Objects`

```bash
  {
      "product": {
          "id": 1,
          "name": "edited 1",
          "description": "edited",
          "price": 210,
          "category": "edited 1"
      },
      "message": "successfully removed edited 1"
  }
```

### Orders

- Create - `token required`
  - HTTP [`POST`]
  - Endpoint `/store/orders`
  - Req Headers :`Authorization : Bearer [token required]`
  - Req Body :
    ```bash
      {
      "quantity":5,
      "productId":1
      }
    ```
  - Response Body : `Order Object`
    ```bash
          {
          "order": {
              "id": 1,
              "status": "active",
              "user_id": "1"
          },
          "message": "Created order successfully"
      }
    ```
- get Order By UserId - `token required`
  - HTTP [`GET`]
  - Endpoint `/store/orders`
  - Req Headers :`Authorization : Bearer [token required]`
  - Req Body : `N/A`
  - Response Body : `Order Object & Message`
    ```bash
          {
          "showOrder": [
              {
                  "id": 1,
                  "status": "active",
                  "user_id": "1"
              }
          ],
          "message": "Retrieved order successfully"
      }
    ```
- Add Product to Cart:
  - HTTP [`POST`]
  - Endpoint `/store/orders/:id/products`
  - Req Body :
    ```bash
      {
          "quantity":5,
          "productId":1
      }
    ```
  - Response Body : `Order Object`
    ```bash
      {
      "Order": {
          "id": 1,
          "order_id": "1",
          "product_id": "1",
          "quantity": 5
      },
      "message": "Successfully added product to the order"
     }
    ```

## Database Schemas

# User Schema

```bash
  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(100) unique NOT NULL,
  username varchar(100) NOT NULL,
  firstName varchar(100) NOT NULL,
  lastName varchar(100) NOT NULL,
  password varchar(255) NOT NULL
  );
```
```bash
                                     Table "public.users"
  Column   |          Type          | Collation | Nullable |              Default
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(100) |           | not null |
 lastname  | character varying(100) |           | not null |
 email     | character varying(100) |           | not null |
 username  | character varying(100) |           | not null |
 password  | character varying(255) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

```
# Product Schema

```bash
  CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL
  );
```
```bash
                                      Table "public.product"
   Column    |          Type          | Collation | Nullable |               Default
-------------+------------------------+-----------+----------+-------------------------------------
 id          | integer                |           | not null | nextval('product_id_seq'::regclass)
 name        | character varying(255) |           | not null |
 description | character varying(255) |           | not null |
 price       | integer                |           | not null |
 category    | character varying(255) |           | not null |
Indexes:
    "product_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_item" CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id)
```

# Order Schema

```bash
  CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id bigint REFERENCES users(id) NOT NULL
  );
```
```bash
                                    Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(50) |           |          |
 user_id | bigint                |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_item" CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

# Order-Item Schema

```bash
  CREATE TABLE order_item(
  id SERIAL PRIMARY KEY,
  order_id bigint REFERENCES orders(id)  NOT NULL,
  product_id bigint REFERENCES products(id) NOT NULL,
  quantity INTEGER
  );
```
```bash
                              Table "public.order_item"
   Column   |  Type   | Collation | Nullable |                Default
------------+---------+-----------+----------+----------------------------------------
 id         | integer |           | not null | nextval('order_item_id_seq'::regclass)
 order_id   | bigint  |           | not null |
 product_id | bigint  |           | not null |
 quantity   | integer |           |          |
Indexes:
    "order_item_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_item_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_item_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id)

```


## Data Shapes/Yypes

### User:

```bash
  type User = {
  id?: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  };
```

### Product:

```bash
  type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  };
```

### Order:

```bash
  type Order = {
  id?: number;
  status: string;
  user_id: number;
  };
```
