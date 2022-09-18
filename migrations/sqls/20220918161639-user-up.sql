CREATE TABLE users (
id SERIAL PRIMARY KEY,
firstName varchar(100) NOT NULL,
lastName varchar(100) NOT NULL,
email varchar(100) unique NOT NULL,
username varchar(100) NOT NULL,
password varchar(255) NOT NULL
);