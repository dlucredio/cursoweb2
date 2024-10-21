Os conceitos básicos de CSS são cobertos pelo site [W3Schools](https://www.w3schools.com/css/). Seguindo as seções, você terá uma excelente compreensão de quase tudo o que se tem para saber de CSS.

Para facilitar os testes, é interessante instalar um ambiente que atualiza o navegador automaticamente sempre que uma mudança é realizada.

1. Crie uma pasta chamada `css-tutorial`
2. Execute o comando `npm init` depois `npm install browser-sync`
3. Modifique o conteúdo do arquivo `package.json`:

```diff
{
  "name": "css-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+    "dev-server": "browser-sync . -w"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "browser-sync": "^2.27.10"
  }
}
```

4. Crie um arquivo chamado `index.html`, com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Título</title>
    </head>
    <body>
        Conteúdo
    </body>
</html>
```
5. Execute o comando: `npm run dev-server`
6. Será aberto um navegador que aponta para o endereço `http://localhost:3000`, que irá, por sua vez, abrir o arquivo `index.html`.
7. Agora basta editar os arquivos, e sempre que houver alguma mudança, o navegador irá atualizar automaticamente.

<hr/>

Conteúdo do tutorial CSS

* CSS Tutorial: basta seguir o site, mas há as seguintes particularidades:
    * No exemplo de Margens que colapsam, segue uma [explicação para esse comportamento](https://bitsofco.de/collapsible-margins/)
    * Pular o exemplo de Website Layout (flexbox e grid são melhores)
    * Em relação a unidades CSS:
        * [https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
        * [https://gist.github.com/basham/2175a16ab7c60ce8e001](https://gist.github.com/basham/2175a16ab7c60ce8e001)
        * [https://medium.com/swlh/css-units-which-ones-to-use-and-avoid-31e4ed461f9](https://medium.com/swlh/css-units-which-ones-to-use-and-avoid-31e4ed461f9)

* CSS Advanced: não é necessário estudar neste momento, pois são assuntos bem específicos. Mas é bom olhar seu conteúdo para saber onde procurar depois, EXCETO:
    * CSS Box Sizing
    * CSS Media Queries
        * Pular a parte de exemplo com flexbox
    * CSS Flexbox
        * Uma explicação sobre grow/shrink/basis [aqui](https://css-tricks.com/understanding-flex-grow-flex-shrink-and-flex-basis/)
* CSS Responsive: vamos pular neste momento
* CSS Grid: basta seguir o site
    * Alternativamente, o [site do Firefox sobre CSS Grid](https://mozilladevelopers.github.io/playground/css-grid) é muito bom também

<hr/>

Agora vamos fazer um mesmo site, responsivo, usando três técnicas CSS diferentes:

* [Usando CSS float](cssFloat.md)
* [Usando CSS flexbox](cssFlexbox.md)
* [Usando CSS grid](cssGrid.md)

Agora um exemplo de barra de navegação responsiva

* [Barra de navegação responsiva](barraNavegacao.md)

Por fim, é interessante estudar algum framework moderno para CSS, como o tailwind. Veja exemplos a seguir:

* [Sass](sass.md)
* [Tailwind CSS](tailwind.md)

<hr/>

Alguns exercícios para fixação de conceitos.

* [Exercícios](exercicios.md)