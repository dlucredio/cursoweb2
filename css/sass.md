O tutorial [Sass do w3chools](https://www.w3schools.com/sass/) é muito bom e apresenta os principais conceitos de forma bastante didática.

Para facilitar a construção deste exemplo, utilize a mesma pasta `css-tutorial` [criada anteriormente](./README.md).

1. Executar o comando `npm install -D sass`
2. Editar o arquivo `package.json`:

```diff
{
  "name": "css-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev-server": "browser-sync . -w",
+    "sass-watch": "sass style.scss styleSass.css --watch"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "browser-sync": "^2.27.10"
  },
  "devDependencies": {
    "sass": "^1.55.0"
  }
}
```

3. Criar o arquivo `style.scss`:

```scss
$myFont: "Lucida Sans", sans-serif;
$headerColor: #4b1f03;
$headerColorContrast: #ffffff;
$backgroundColor: #dfd1c8;
$textColor: #000000;
$primaryColor1: #720f0f;
$primaryColor2: #520b0b;
$primaryColor1Contrast: #ffffff;

html {
    font-family: $myFont;
    background-color: $backgroundColor;
    color: $textColor;
}

.header {
    background-color: $headerColor;
    color: $headerColorContrast;
    padding: 15px;
}

.menu {
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        padding: 8px;
        margin-bottom: 7px;
        background-color: $primaryColor1;
        color: $primaryColor1Contrast;
    }

    li:hover {
        background-color: $primaryColor2;
    }
}

.aside {
    background-color: $primaryColor1;
    padding: 15px;
    color: $primaryColor1Contrast;
    text-align: center;
    font-size: 14px;
}

.footer {
    background-color: $primaryColor2;
    color: $primaryColor1Contrast;
    text-align: center;
    font-size: 12px;
    padding: 15px;
}
```

4. Criar o arquivo `indexSass.html`:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styleSass.css" />
    <link rel="stylesheet" type="text/css" href="styleFlexbox.css" />
    <title>Exemplos de CSS</title>
</head>

<body>

    <div class="header">
        <h1>Chania</h1>
    </div>

    <div class="row1">
        <div class="row2">
            <div class="column side menu">
                <ul>
                    <li>The Flight</li>
                    <li>The City</li>
                    <li>The Island</li>
                    <li>The Food</li>
                </ul>
            </div>

            <div class="column middle">
                <h1>The City</h1>
                <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two
                    parts,
                    the old town and the modern city.</p>
            </div>
        </div>

        <div class="column side">
            <div class="aside">
                <h2>What?</h2>
                <p>Chania is a city on the island of Crete.</p>
                <h2>Where?</h2>
                <p>Crete is a Greek island in the Mediterranean Sea.</p>
                <h2>How?</h2>
                <p>You can reach Chania airport from all over Europe.</p>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Resize the browser window to see how the content respond to the resizing.</p>
    </div>

</body>

</html>
```

5. Executar o comando `npm run sass-watch`
6. Abra o arquivo `indexSass.html` no navegador. Se estiver usando o VSCode, considere executar a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para facilitar a atualização.
7. Experimente trocar as cores de fundo, fonte, etc, e veja como o resultado é atualizado imediatamente
8. Modificar o arquivo `style.scss` para incluir um *mixin*:

```diff
$myFont: "Lucida Sans", sans-serif;
$headerColor: #4b1f03;
$headerColorContrast: #ffffff;
$backgroundColor: #dfd1c8;
$textColor: #000000;
$primaryColor1: #720f0f;
$primaryColor2: #520b0b;
$primaryColor1Contrast: #ffffff;

+@mixin shadowed($color: #000000) {
+    box-shadow: 0 3px 5px $color;
+}

html {
    font-family: $myFont;
    background-color: $backgroundColor;
    color: $textColor;
}

.header {
    background-color: $headerColor;
    color: $headerColorContrast;
    padding: 15px;
+    @include shadowed($color: $primaryColor1);
}

.menu {
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        padding: 8px;
        margin-bottom: 7px;
        background-color: $primaryColor1;
        color: $primaryColor1Contrast;
+        @include shadowed();
    }

    li:hover {
        background-color: $primaryColor2;
    }
}

.aside {
    background-color: $primaryColor1;
    padding: 15px;
    color: $primaryColor1Contrast;
    text-align: center;
    font-size: 14px;
+    @include shadowed();
}

.footer {
    background-color: $primaryColor2;
    color: $primaryColor1Contrast;
    text-align: center;
    font-size: 12px;
    padding: 15px;
}
```

9. Acessar o tutorial w3schools para mais detalhes