O conteúdo desta parte é baseado no tutorial [W3Schools HTML Web Workers](https://www.w3schools.com/html/html5_webworkers.asp)

1. É preciso executar em um server. Faremos isso usando [Node.js](https://nodejs.org/):
2. Criar uma pasta chamada `htmlWebWorkers` no seu computador
3. Acesse a pasta e execute o comando `npm init` (siga todas as opções padrão)
4. Execute o comando `npm install express`
5. Modifique o arquivo `package.json` para incluir o tipo correto de projeto node:

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
6. Crie um arquivo chamado `index.js` com o seguinte conteúdo:

```js
import express from 'express';
var app = express();

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
```

7. Criar uma pasta `public` e copiar os arquivos do exemplo de web workers do w3schools dentro dela:
* `demo_workers.js` - worker
* `pagina.html` - conteúdo HTML
8. Executar `node index.js` no terminal para subir o servidor
9. Abrir o browser no endereço

`http://localhost:3000/pagina.html`
