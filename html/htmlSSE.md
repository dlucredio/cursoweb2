O conteúdo desta parte é baseado no tutorial [W3Schools HTML SSE](https://www.w3schools.com/html/html5_serversentevents.asp)

Mas faremos aqui um servidor especializado para o envio dos eventos. Faremos isso usando [Node.js](https://nodejs.org/):

<hr>

### Exemplo de SSE simples

1. Criar uma pasta chamada `htmlSSE` no seu computador
2. Acesse a pasta e execute o comando `npm init` (siga todas as opções padrão)
3. Execute o comando `npm install express`
4. Modifique o arquivo `package.json` para incluir o tipo correto de projeto node:

```diff
{
  "name": "htmlforms",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
5. Crie um arquivo chamado `index.js` com o seguinte conteúdo:

```js
import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/eventos', async function (req, res) {
    console.log('Request /eventos');
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Diz ao cliente para tentar novamente a cada 10 segundos
    // Caso a conexão seja perdida
    res.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Evento', ++count);
        // res.write escreve algo na saída, sem encerrar o fluxo
        res.write(`data: Evento ${count}\n\n`);
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
```

6. Crie uma pasta `public`, e dentro dela um arquivo `pagina.html` com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>

<body>

    <h1>Getting server updates</h1>
    <div id="result"></div>

    <script>
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource("/eventos");
            source.onmessage = function (event) {
                document.getElementById("result").innerHTML += event.data + "<br>";
            };
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
        }
    </script>

</body>

</html>
```

7. Execute `node index.js`
8. Abra o navegador na página `http://localhost:3000/pagina.html`

<hr>

### Exemplo de broadcast usando SSE

1. Criar uma pasta chamada `htmlSSEBroadcast` no seu computador
2. Acesse a pasta e execute o comando `npm init` (siga todas as opções padrão)
3. Execute o comando `npm install express`
4. Modifique o arquivo `package.json` para incluir o tipo correto de projeto node:

```diff
{
  "name": "htmlforms",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
5. Crie um arquivo chamado `index.js` com o seguinte conteúdo:

```js
import express from 'express';

const app = express();

const jogadas = [];

app.use(express.static('public'));

app.get('/publish', async function(req, res) {
    console.log(`Novo evento: ${req.query.jogada}`)
    jogadas.push(req.query.jogada);
    res.send('Sucesso: <a href="admin.html">Voltar</a>');
});

app.get('/subscribe', async function (req, res) {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Diz ao cliente para tentar novamente a cada 10 segundos
    // Caso a conexão seja perdida
    res.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
        if(count == jogadas.length) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log(`Sem jogadas novas por enquanto: ${count} == ${jogadas.length}`);
        } else {
            console.log(`Nova jogada: ${jogadas[count]}`);
            res.write(`data: ${jogadas[count]}\n\n`);
            count++;
        }
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
```

6. Criar uma pasta chamada `public`
7. Criar um arquivo chamado `placar.html`, com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Placar do jogo</title>
</head>

<body>
    <h1>Corinthians X Palmeiras</h1>
    <div id="eventos"></div>

    <script>
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource("/subscribe");
            source.onmessage = function (event) {
                document.getElementById("eventos").innerHTML += event.data + "<br>";
            };
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
        }
    </script>
</body>

</html>
```

8. Criar um arquivo chamado `admin.html`, com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Placar do jogo</title>
</head>

<body>
    <h1>Publicar jogada</h1>
    <form action="/publish">
        Jogada: <input type="text" name="jogada" />
        <input type="submit" value="Publicar" />
    </form>
</body>

</html>
```

9. Executar `node index.js`
10. Abrir duas páginas do navegador, uma apontando para `http://localhost:3000/placar.html` e outra para `http://localhost:3000/admin.html`. Digitar as jogadas no admin e observar os resultados sendo enviados para o placar.

