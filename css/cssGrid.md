Para facilitar a construção deste exemplo, utilize a mesma pasta `css-tutorial` [criada anteriormente](./README.md).

1. Criar o arquivo `style.css` (é o mesmo da [demonstração de CSS Float](./cssFloat.md)):

```css
html {
    font-family: "Lucida Sans", sans-serif;
}

.header {
    background-color: #9933cc;
    color: #ffffff;
    padding: 15px;
}

.menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.menu li {
    padding: 8px;
    margin-bottom: 7px;
    background-color: #33b5e5;
    color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.menu li:hover {
    background-color: #0099cc;
}

.aside {
    background-color: #33b5e5;
    padding: 15px;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.footer {
    background-color: #0099cc;
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    padding: 15px;
}
```

2. Criar o arquivo `indexGrid.html`:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <title>Exemplos de CSS</title>
</head>

<body>

    <div class="header">
        <h1>Chania</h1>
    </div>

    <div>
        <div class="menu">
            <ul>
                <li>The Flight</li>
                <li>The City</li>
                <li>The Island</li>
                <li>The Food</li>
            </ul>
        </div>

        <div>
            <h1>The City</h1>
            <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts,
                the old town and the modern city.</p>
        </div>

        <div>
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

3. Adicionar o arquivo `styleGrid.css` com algumas classes para responsividade e layout:

```css
* {
    /* aplica a correção de tamanhos (contar margem, padding, etc)
       para bom funcionamento do CSS float */
    box-sizing: border-box;
}

.grid-container {
    display: grid;
    justify-content: space-around;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        'grid-header grid-header grid-header grid-header'
        'grid-left grid-left grid-left grid-left'
        'grid-middle grid-middle grid-middle grid-middle'
        'grid-right grid-right grid-right grid-right'
        'grid-footer grid-footer grid-footer grid-footer';
}

@media (min-width: 600px) {
    .grid-container  {
        grid-template-areas: 
            'grid-header grid-header grid-header grid-header'
            'grid-left grid-middle grid-middle grid-middle'
            'grid-right grid-right grid-right grid-right'
            'grid-footer grid-footer grid-footer grid-footer';
    }
}
  
@media (min-width: 800px) {
    .grid-container  {
        grid-template-areas: 
            'grid-header grid-header grid-header grid-header'
            'grid-left grid-middle grid-middle grid-right'
            'grid-footer grid-footer grid-footer grid-footer';
    }
}

.grid-left,
.grid-middle,
.grid-right {
    padding: 15px;
}

.grid-header {
    grid-area: grid-header;
}

.grid-left {
    grid-area: grid-left;
}

.grid-middle {
    grid-area: grid-middle;
}

.grid-right {
    grid-area: grid-right;
}

.grid-footer {
    grid-area: grid-footer;
}
```

4. Modificar o arquivo `indexGrid.html`:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
+    <link rel="stylesheet" type="text/css" href="styleGrid.css" />
    <title>Exemplos de CSS</title>
</head>

<body>
+    <div class="grid-container">
+        <div class="header grid-header">
            <h1>Chania</h1>
        </div>

-        <div>
+            <div class="menu grid-left">
                <ul>
                    <li>The Flight</li>
                    <li>The City</li>
                    <li>The Island</li>
                    <li>The Food</li>
                </ul>
            </div>

+            <div class="grid-middle">
                <h1>The City</h1>
                <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two
                    parts,
                    the old town and the modern city.</p>
            </div>

+            <div class="grid-right">
                <div class="aside">
                    <h2>What?</h2>
                    <p>Chania is a city on the island of Crete.</p>
                    <h2>Where?</h2>
                    <p>Crete is a Greek island in the Mediterranean Sea.</p>
                    <h2>How?</h2>
                    <p>You can reach Chania airport from all over Europe.</p>
                </div>
            </div>
-        </div>

+        <div class="footer grid-footer">
            <p>Resize the browser window to see how the content respond to the resizing.</p>
        </div>
    </div>
</body>

</html>
```