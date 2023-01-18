Este exemplo demonstra o uso de módulos JavaScript.

1. Criar uma nova pasta, chamada `exemplo-modules`
2. Criar uma pasta chamada `modules`, com um arquivo `modulo1.js`:

```js
export const name = 'mundo';
```

3. Criar um arquivo, na raiz, chamado `main.js`:

```js
import { name } from './modules/modulo1.js'

function getName() {
    return 'Ola '+name;
}

console.log('Executou o script: ' + getName());

// Com módulos, os objetos são salvos em um objeto global separado,
// portanto é preciso vincular as funções que devem ser visíveis na página
// ao objeto global do navegador (window) para que elas possam ser 
// referenciadas.
// Mas não existe o objeto "window" ou "document" fora do navegador, portanto
// essa função não faz sentido em um ambiente node.js, por exemplo.
// Para evitar esse problema, podemos colocar um teste simples
if(typeof window !== "undefined") {
    window.buttonClicked = function (e) {
        console.log('clicou')
        document.getElementById('divPrincipal').innerHTML = getName();
    }
}
```

4. Criar um arquivo `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script type="module" src='main.js'></script>
</head>
<body>
    Página principal <button onclick="buttonClicked()">Botao</button>
    <div id="divPrincipal"></div>
</body>
</html>
```

live server
5. Testar no navegador, criando um servidor para isso (o jeito mais simples é utilizar a extensão [Live Server]() do VS Code)
6. Testar no node.js. Executar o comando `npm init`
7. Modificar o arquivo `package.json` para definir que estão sendo utilizados módulos JS.

```diff
{
  "name": "exemplo-modules",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
+  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
8. Executar o comando `node main.js`