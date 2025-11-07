# Exercícios de design responsivo

Para cada laboratório, executar os seguintes passos para configurar um projeto novo usando `nodejs` e `tailwindcss`:

1. Crie uma pasta com o nome desejado
2. Execute os seguintes comandos (é preciso ter o `nodejs` instalado)
```sh
npm init
npm install tailwindcss @tailwindcss/cli
```

3. Crie um arquivo chamado `tailwindInput.css`, com o seguinte conteúdo:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

4. Modifique o arquivo `package.json`:
```diff
{
  "name": "tailwind-css-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+    "tailwind-watch": "npx @tailwindcss/cli -i ./tailwindInput.css -o ./tailwindOutput.css --watch"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "tailwindcss": "^3.2.1"
  }
}
```
5. Crie um arquivo chamado `index.html`, com o seguinte conteúdo:
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <title>Laboratório</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href="tailwindOutput.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body class="w-full h-dvh min-h-dvh flex items-center justify-center">
    <div>
        Alô mundo!
    </div>
</body>

</html>
```
6. Execute o comando `npm run tailwind-watch`
7. Abra o arquivo `index.html` no navegador. Se estiver usando o VSCode, considere executar a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para facilitar a atualização.

<hr/>

* [Laboratório 1](laboratorio1/README.md)
* [Laboratório 2](laboratorio2/README.md)
* [Laboratório 3](laboratorio3/README.md)