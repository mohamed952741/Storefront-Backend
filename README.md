# Storefront Backend Project

# Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Set-up-Environment](#set-up-Environment)
* [Scripts](#scripts)
* [Notes](#notes)
* [Author](#author)



## Description
This project is part of the Udacity Full-Stack Web-development Nanodegree


### Installation

Simply run command to install dependencies:

```bash
yarn
or
npm install
```

### Set-up-Environment

Create `.env` file with this configurations:

```bash
PORT=3000
ENV = dev

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=database_dev
DB_TEST_DATABASE=database_test
DB_USER=postgres
DB_PASSWORD=password

BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS = 10
TOKEN_SECRET =your-secret-token
```



### Setup the PostgreSQL Database:
- To start PostgreSQL, type this command into the terminal:
   ```bash
     psql
   ```
- Next type this command into the PostgreSQL interface to Create development database:
  ```bash
    CREATE DATABASE database_dev;
  ```
- Finally Create the Testing database:
    ```bash
        CREATE DATABASE database_test;
    ```
- To Check if Databases are created `\l` into the psql prompt
- Use Default User of PostgreSQL: `postgres`
- Use Default PostgreSQL Port:`5432`
### Scripts:

```bash
# start migration
db-migrate up
# start dev server
yarn start
# run prettier/lint
yarn prettier
yarn lint
# build app
yarn build
# start build server
node build/server.js
```

### Run Tests

```bash
npm run test
```

## Notes:
This was built using:
- Typescript
- NodeJs
- Express
- db-migrate
- Jasmine
- Yarn
- Some of the written code referenced from the TypeScript,node.js, express and jasmine documentation but with minimal copied code and utmost understanding of the topic.
- express documentation: https://expressjs.com/
- node.js: https://nodejs.org/en/docs/
- jasmine: https://jasmine.github.io/setup/nodejs.html

### Endpoints

- Kindly Check [REQUIREMENTS.md](./REQUIREMENTS.md)

### Database Schema

- Kindly Check [REQUIREMENTS.md](./REQUIREMENTS.md)

## Author

The code was written by **Mohamed Ahmed Hussein** ([@mohamed952741](https://github.com/mohamed952741)) , for the project by Udacity.
