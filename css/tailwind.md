O [Tailwind CSS](https://tailwindcss.com/) é um framework para facilitar a criação de layouts responsivos em páginas web utilizando classes CSS predefinidas que podem ser combinadas à vontade, sem a necessidade de escrever classes.

Tailwind CSS é, no fundo, um monte de classes prontas para serem utilizadas e combinadas de modo a produzir o resultado desejado. Por esse motivo, é impossível estudar tudo de uma vez. Assim, adotaremos uma abordagem mais essencial.

Veremos alguns exemplos, fazendo uso de alguns recursos, para que o estudante compreenda a essência do framework. Em seguida, o estudante deverá aprender a utilizar a documentação para conseguir aprender tudo o que o Tailwind pode oferecer.

<hr/>

Primeiro exemplo, um "Alô mundo utilizando Tailwind CSS"

1. Crie uma pasta chamada `tailwind-css-tutorial`
2. Execute os seguintes comandos
```sh
npm init
npm install -D tailwindcss
npx tailwindcss init
```
3. Modifique o arquivo `tailwind.config.js`:
```diff
/** @type {import('tailwindcss').Config} */
module.exports = {
+  content: ["./index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
4. Crie um arquivo chamado `tailwindInput.css`, com o seguinte conteúdo:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
5. Modifique o arquivo `package.json`:
```diff
{
  "name": "tailwind-css-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+    "tailwind-watch": "tailwindcss -i tailwindInput.css -o tailwindOutput.css --watch"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "tailwindcss": "^3.2.1"
  }
}
```
6. Crie um arquivo chamado `index.html`, com o seguinte conteúdo:
```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="tailwindOutput.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```
7. Execute o comando `npm run tailwind-watch`
8. Abra o arquivo `index.html` no navegador. Se estiver usando o VSCode, considere executar a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para facilitar a atualização.
9. Veja como o texto "Hello world!" está sendo exibido em tamanho grande, negrito e sublinhado, conforme as classes do elemento `h1`. Quaisquer mudanças feitas no código são imediatamente atualizadas no navegador (pode ser necessário dar um refresh, devido ao processo de recompilação do CSS e integração com o Live Server).
10. Conceitos principais:
* [Utility-first Fundamentals](https://tailwindcss.com/docs/utility-first)
* [Hover, Focus and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states)
* [Responsive Design](https://tailwindcss.com/docs/responsive-design)
* [Dark Mode](https://tailwindcss.com/docs/dark-mode)
* [Reusing styles](https://tailwindcss.com/docs/reusing-styles)
* [Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles)
* [Functions & Directives](https://tailwindcss.com/docs/functions-and-directives)
11. Para mais conceitos avançados, [visite a documentação oficial](https://tailwindcss.com/docs/)

<hr/>

Alguns exemplos de páginas construídas utilizando Tailwind CSS:

* [Site responsivo](tailwindExemplo1.md)
* [Barra estilo Discord](tailwindExemplo2.md)

Outros recursos:

* [Crash course (tutorial em inglês)](https://www.youtube.com/watch?v=dFgzHOX84xQ)