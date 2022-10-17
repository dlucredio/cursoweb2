O conteúdo desta parte é baseado no tutorial [W3Schools Forms](https://www.w3schools.com/html/html_forms.asp)

Para testar o envio dos dados dos formulários, vamos criar um servidor para receber as requisições enviadas pelo navegador. Você vai precisar do [node.js](nodejs.org) instalado.

1. Criar uma pasta chamada `htmlforms` no seu computador
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
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));

app.get('/dosomething', (req, res) => {
    res.send(`Params GET: ${JSON.stringify(req.query)}`)
});

app.post('/dosomething', (req, res) => {
    console.log(req.body);
    res.send(`Params POST: ${JSON.stringify(req.body)}`)
});

app.listen(port, () => {
    console.log(`Server listening: http://localhost:${port}/dosomething`)
});
```

6. Execute o seguinte comando `node index.js`
7. A partir deste momento, siga os exemplos do tutorial, e sempre que for especificado um formulário, coloque o endereço correspondente (GET ou POST) no atributo `action`.

