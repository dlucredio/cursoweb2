Para este exemplo, será utilizado o SGBD [MySql Community Server](https://dev.mysql.com/), que é gratuito e de fácil instalação. [Aqui](./instalandoMySqlNoWindows.md) você encontra algumas instruções para instalá-lo no Windows sem a necessidade de criar serviços ou poluir o sistema. Caso esteja usando outro sistema operacional, não é difícil encontrar instruções para sua instalação. Você também pode usar outro SGBD, se quiser, bastando para isso substituir os comandos, endereços e os drivers.

1. Criar um projeto `nodejs`:

```
mkdir worldcup-pool-backend
cd worldcup-pool-backend
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

3. Nossa aplicação vai ser estruturada da seguinte forma:

```
worldcup-pool-backend
+-- node_modules            (pacotes node)
+-- src                     (código-fonte)
|   +-- js                  (código-fonte JavaScript)
|   |   +-- persistence     (código para persistência em banco de dados)
|   |   +-- routes          (rotas/endpoints do back-end)
|   |   +-- utils           (funções auxiliares)
|   +-- sql                 (código-fonte SQL)
+-- tests                   (testes)
+-- (outros arquivos: package.json, etc)
```

4. Vamos começar pela base de dados. Criar arquivo `src/sql/database.sql`:

* Note que estamos usando o tipo BINARY(16) para armazenar a chave primária, que seguirá o formato UUID

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

5. Conectar ao banco de dados e executar o script:

```
mysql> source ./src/sql/database.sql
```

6. Para ver se deu certo, executar os comandos:

```
mysql> show databases;
mysql> use worldcup_pool;
mysql> show tables;
mysql> describe gambler;
mysql> describe bet;
```

7. Agora vamos criar a camada de persistência.
8. Primeiro precisamos lidar com a conexão com o banco de dados. Criar o arquivo `src/js/persistence/database.js`:

* Este exemplo utiliza MySQL instalado na própria máquina. Não esqueça de substituir os dados de conexão por outros, caso esteja usando um banco de dados diferente.

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

9. Criar arquivo `src/js/utils/utils.js`:

* Neste caso estamos criando uma classe auxiliar para encapsular os erros. Como se trata de um back-end simples, somente teremos erros de banco de dados, mas outros tipos de erros podem ser adicionados aqui.

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

10. Agora podemos terminar de criar a camada de persistência, criando as funções CRUD (Create/Retrieve/Update/Delete) para nossas entidades:
11. Criar arquivo `src/js/persistence/gamblerPersistence.js`:

* Note o uso da função UUID_TO_BIN e BIN_TO_UUID, do MySQL. Elas permitem que sejam utilizadas chaves do tipo UUID, armazenadas em formato binário, para maior eficiência.

```js
import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_GAMBLER =
    `INSERT INTO gambler(id,name,email,phone,birth_date)
                 VALUES (UUID_TO_BIN(?),?,?,?,?)`;

const UPDATE_GAMBLER =
    `UPDATE gambler set name=?,phone=?,birth_date=?
            WHERE BIN_TO_UUID(id)=?`;

const SELECT_GAMBLER_BY_ID =
    `SELECT BIN_TO_UUID(id) as id,name,email,phone,DATE_FORMAT(birth_date,'%Y-%m-%d') as birth_date
            FROM gambler
            WHERE id=UUID_TO_BIN(?)`;

const SELECT_GAMBLER_BY_EMAIL =
    `SELECT BIN_TO_UUID(id) as id,name,email,phone,DATE_FORMAT(birth_date,'%Y-%m-%d') as birth_date
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
        gambler.id = uuidv4();
        await getPool().execute(INSERT_GAMBLER,
            [
                gambler.id,
                gambler.name,
                gambler.email,
                gambler.phone,
                gambler.birth_date
            ]);
        return gambler;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating gambler: ' + gambler.email,
            err);
    }
}

export async function updateGambler(gambler) {
    try {
        await getPool().execute(UPDATE_GAMBLER,
            [
                gambler.name,
                gambler.phone,
                gambler.birth_date,
                gambler.id,
            ]);
        return gambler;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating gambler: ' + gambler.id,
            err);
    }
}
```

12. Criar arquivo `src/js/persistence/betPersistence.js`:

```js
import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_BET =
    `INSERT INTO bet(id,champion,runner_up,gambler_id,bet_date)
                 VALUES (UUID_TO_BIN(?),?,?,UUID_TO_BIN(?),?)`;

const UPDATE_BET =
    `UPDATE bet set champion=?, runner_up=?, bet_date=?
            WHERE BIN_TO_UUID(id)=?`;

const SELECT_BETS_BY_GAMBLER_ID =
    `SELECT BIN_TO_UUID(id) as id, champion, runner_up, DATE_FORMAT(bet_date,'%Y-%m-%d') as bet_date
            FROM bet
            WHERE gambler_id=UUID_TO_BIN(?)`;

const SELECT_BETS_AND_GAMBLERS =
    `SELECT BIN_TO_UUID(bet.id) as bet_id, gambler.name as gambler_name, bet.champion, bet.runner_up, DATE_FORMAT(bet.bet_date,'%Y-%m-%d') as bet_date
                FROM bet
                INNER JOIN gambler
                ON bet.gambler_id = gambler.id
                ORDER BY gambler_name ASC;`

export async function createBet(bet) {
    try {
        await getPool().execute(INSERT_BET,
            [
                uuidv4(),
                bet.champion,
                bet.runner_up,
                bet.gambler_id,
                bet.bet_date
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet for gambler: ' + bet.gambler_id,
            err);
    }
}

export async function updateBet(bet) {
    try {
        await getPool().execute(UPDATE_BET,
            [
                bet.champion,
                bet.runner_up,
                bet.bet_date,
                bet.id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating bet: ' + bet.id,
            err);
    }
}

export async function retrieveBetsByGamblerId(gambler_id) {
    try {
        const [rows] = await getPool().execute(SELECT_BETS_BY_GAMBLER_ID, [gambler_id]);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving bet by gambler id: ' + gambler_id,
            err);
    }
}

export async function retrieveBetsAndGamblers() {
    try {
        const [rows] = await getPool().execute(SELECT_BETS_AND_GAMBLERS);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet: ' + bet.id,
            err);
    }
}
```

13. Agora vamos criar as rotas, que são os endereços de acesso aos endpoints do back-end.
14. Criar o arquivo `src/js/routes/gamblerRouter.js`:

```js
import express from 'express';
import { createGambler, updateGambler, retrieveGamblerByEmail } from '../persistence/gamblerPersistence.js';

const router = express.Router();

// Save or update a gambler.
// If an id is provided, gambler is updated (id and e-mail will not be updated).
// If no id is provided, gambler is created (new id will be generated).
router.put('/', async (req, res) => {
    try {
        if (req.body.id) {
            const updatedGambler = await updateGambler(req.body);
            return res.json(updatedGambler);

        } else {
            const newGambler = await createGambler(req.body);
            return res.json(newGambler);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating/updating gambler');
    }
});

// Retrieve a gambler by e-mail (provided via query param)
router.get('/', async (req, res) => {
    try {
        const gambler = await retrieveGamblerByEmail(req.query.email);
        if (gambler) {
            return res.json(gambler);
        } else {
            res.status(404).send('Gambler does not exist');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving gambler');
    }
})

export default router;
```

15. Criar o arquivo `src/js/routes/betRouter.js`:

```js
import express from 'express';
import { createBet, updateBet, retrieveBetsAndGamblers, retrieveBetsByGamblerId } from '../persistence/betPersistence.js';

const router = express.Router();

// Save or update a bet.
// If an id is provided, bet is updated (id and gambler_id will not be updated).
// If no id is provided, bet is created (new id will be generated).
router.put('/', async (req, res) => {
    try {
        if (req.body.id) {
            const updatedBet = await updateBet(req.body);
            return res.json(updatedBet);
        } else {
            const newBet = await createBet(req.body);
            return res.json(newBet);
        }
    } catch (err) {
        if (err.cause?.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(400).send('Gambler ' + req.body.gambler_id + ' does not exist');
        } else {
            console.log(err);
            res.status(500).send('Error creating bet');
        }
    }
});

// Retrieve a gambler by gambler_id (provided via query param)
router.get('/', async (req, res) => {
    try {
        if (req.query.gambler_id) {
            const bets = await retrieveBetsByGamblerId(req.query.gambler_id);
            return res.json(bets);
        } else {
            const allBets = await retrieveBetsAndGamblers();
            return res.json(allBets);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving bets');
    }
});


export default router;
```

16. Agora vamos criar o código principal. Criar arquivo `src/js/main.js`:

```js
import express from 'express';
import cors from 'cors'; // Just use in development. In production, set policies correctly!

import gamblerRouter from './routes/gamblerRouter.js';
import betRouter from './routes/betRouter.js';

const app = express();

const port = 5000;

app.use(cors()); // Just use in development. In production, set policies correctly!
app.use(express.json());
app.use('/gambler', gamblerRouter);
app.use('/bet', betRouter);

app.listen(port, () => { console.log('Listening on port ' + port); });
```

17. Para executar, vamos criar uma tarefa no `package.json`:

```diff
{
  "name": "worldcup-pool-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
+    "start": "node ./src/js/main.js",
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

18. Execute o programa principal: `npm start`
19. Vamos testar. Primeiro, certifique-se que o banco de dados esteja rodando.
20. Criar o arquivo `tests/endpoints.http`:

* Você pode rodar essas requisições usando algum software cliente HTTP, como a [REST Client (extensão do VSCode)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
* Nas requisições para palpites (bet), substitua o valor do `gambler_id` por um valor real gerado nas inserções.

```http
PUT http://localhost:5000/gambler
Content-Type: application/json

{
    "name": "Paulo",
    "email": "paulo@email.com",
    "phone": "65432",
    "birth_date": "1980-09-27"
}

###
PUT http://localhost:5000/gambler
Content-Type: application/json

{
    "name": "Daniel",
    "email": "daniel@email.com",
    "phone": "12345",
    "birth_date": "1979-09-27"
}

###

GET http://localhost:5000/gambler?email=daniel@email.com

###

GET http://localhost:5000/gambler?email=paulo@email.com

###

GET http://localhost:5000/gambler?email=fulano@email.com

###

PUT http://localhost:5000/bet
Content-Type: application/json

{
    "champion": "Itália",
    "runner_up": "Brasil",
    "gambler_id": "57edfd4a-cc3c-4114-b997-52e9b4cfa987",
    "bet_date": "2023-02-02"
}

###

GET http://localhost:5000/bet

###

GET http://localhost:5000/bet?gambler_id=57edfd4a-cc3c-4114-b997-52e9b4cfa987
```

21. Fim
