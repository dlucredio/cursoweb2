Para este exemplo, será utilizado o SGBD [MySql Community Server](https://dev.mysql.com/), que é gratuito e de fácil instalação. [Aqui](./instalandoMySqlNoWindows.md) você encontra algumas instruções para instalá-lo no Windows sem a necessidade de criar serviços ou poluir o sistema. Caso esteja usando outro sistema operacional, não é difícil encontrar instruções para sua instalação. Você também pode usar outro SGBD, se quiser, bastando para isso substituir os comandos, endereços e os drivers.

1. Criar um projeto `nodejs`:

```
mkdir worldcup-pool-backend
cd bolaodacopa-backend
npm init
npm install express mysql2 uuid cors
```

2. Modificar o arquivo `package.json`:

```diff
{
  "name": "bolaodacopa-backend",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
+  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mysql2": "^3.1.0",
    "uuid": "^9.0.0"
  }
}
```

3. Criar arquivo `src/sql/database.sql`:

```sql
DROP DATABASE worldcup_pool;

CREATE DATABASE worldcup_pool;

USE worldcup_pool;

CREATE TABLE gambler
(
    id BINARY(16) NOT NULL,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    phone VARCHAR(24) NOT NULL,
    birth_date DATE,
    PRIMARY KEY(id)
);

CREATE TABLE bet
(
    id BINARY(16) NOT NULL,
    champion VARCHAR(256) NOT NULL,
    runner_up VARCHAR(256) NOT NULL,
    gambler_id BINARY(16) NOT NULL,
    bet_date DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(gambler_id)
        REFERENCES gambler(id)
);
```

4. Conectar ao banco de dados e executar o script:

```
mysql> source ./src/sql/database.sql
```

5. Para ver se deu certo, executar os comandos:

```
mysql> show databases;
mysql> use worldcup_pool;
mysql> show tables;
mysql> describe gambler;
mysql> describe bet;
```

6. Criar arquivo `src/js/database.js`:

```js
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senhadificil",
    database: "worldcup_pool"
}).promise();

export function getPool() { return pool; }
export async function closePool() {
    try {
        await pool.end();
    } catch (err) {
        console.log('Error closing pool');
        console.log(err);
    }
}
```

7. Criar arquivo `src/js/utils.js`:

```js
export class CustomError {
    constructor(type, message, cause) {
        this.type = type;
        this.message = message;
        this.cause = cause;
    }
}

export class CustomErrorType {
    constructor(name) {
        this.name = name;
    }

    static DatabaseError = new CustomErrorType("DatabaseError");
}
```

8. Criar arquivo `src/js/gamblerDao.js`:

```js
import { getPool } from './database.js';
import { CustomError, CustomErrorType } from './utils.js';

const INSERT_GAMBLER =
    `INSERT INTO gambler(id,name,email,phone,birth_date)
                 VALUES (UUID_TO_BIN(?),?,?,?,?)`;

const SELECT_GAMBLER_BY_ID =
    `SELECT BIN_TO_UUID(id) as id,name,email,phone,birth_date
            FROM gambler
            WHERE id=UUID_TO_BIN(?)`;

const SELECT_GAMBLER_BY_EMAIL =
    `SELECT BIN_TO_UUID(id) as id,name,email,phone,birth_date
            FROM gambler
            WHERE email=?`;

export async function retrieveGamblerById(id) {
    try {
        const [rows] = await getPool().execute(SELECT_GAMBLER_BY_ID, [id]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving gambler by id: ' + id,
            err);
    }
}

export async function retrieveGamblerByEmail(email) {
    try {
        const [rows] = await getPool().execute(SELECT_GAMBLER_BY_EMAIL, [email]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving gambler by email: ' + email,
            err);
    }
}

export async function createGambler(gambler) {
    if (await retrieveGamblerByEmail(gambler.email)) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Gambler email already exists: ' + gambler.email,
            null);
    }
    try {
        await getPool().execute(INSERT_GAMBLER,
            [
                gambler.id,
                gambler.name,
                gambler.email,
                gambler.phone,
                gambler.birth_date
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating gambler: ' + gambler.id,
            err);
    }
}
```


main:

import { createGambler, retrieveGamblerByEmail, retrieveGamblerById } from './gamblerDao.js';
import { closePool } from './database.js';
import { v4 as uuidv4 } from 'uuid';

async function main() {
    try {
        const gambler1 = await retrieveGamblerByEmail('daniel@email.com');
        console.log(gambler1);

        // await createGambler({
        //     id: '0533accd-b0f1-4604-a2ef-bf6d0b95334b',
        //     name: 'Daniel',
        //     email: 'daniel@email.com',
        //     phone: '1234',
        //     birthDate: '1980-08-17'
        // });

        const gambler2 = await retrieveGamblerById('0533accd-b0f1-4604-a2ef-bf6d0b95334b');
        console.log(gambler2);



    } catch (err) {
        console.log(err);
    } finally {
        closePool();
    }
}

main();
