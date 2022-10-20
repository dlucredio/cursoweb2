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

2. Criar o arquivo `indexFlexbox.html`:

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

3. Adicionar o arquivo `styleFlexbox.css` com algumas classes para responsividade e layout:

```css
* {
    /* aplica a correção de tamanhos (contar margem, padding, etc)
       para bom funcionamento do CSS float */
    box-sizing: border-box;
}

.row {
    display: flex;
    flex-direction: column;
}

@media (min-width: 600px) {
    .row {
        flex-direction: row;
    }   
}

.column {
    padding: 15px;
}
  
.column.side {
    flex: 1;
}
  
.column.middle {
    flex: 2;
}
```

4. Modificar o arquivo `indexFlexbox.html` para definir os posicionamentos dos elementos:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
+    <link rel="stylesheet" type="text/css" href="styleFlexbox.css" />
    <title>Exemplos de CSS</title>
</head>

<body>

    <div class="header">
        <h1>Chania</h1>
    </div>

+    <div class="row">
+        <div class="column side menu">
            <ul>
                <li>The Flight</li>
                <li>The City</li>
                <li>The Island</li>
                <li>The Food</li>
            </ul>
        </div>

+        <div class="column middle">
            <h1>The City</h1>
            <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts,
                the old town and the modern city.</p>
        </div>

+        <div class="column side">
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

5. Vamos adicionar um tamanho intermediário. Modificar o arquivo `styleFlexbox.css`:

```diff
* {
    /* aplica a correção de tamanhos (contar margem, padding, etc)
       para bom funcionamento do CSS float */
    box-sizing: border-box;
}

+.row1 {
    display: flex;
    flex-direction: column;
}

+.row2 {
+    display: flex;
+    flex-direction: column;
+}

@media (min-width: 600px) {
+    .row2 {
        flex-direction: row;
    }   
}

+@media (min-width: 800px) {
+    .row1 {
+        flex-direction: row;
+    }   
+}

.column {
    padding: 15px;
}
  
.column.side {
    flex: 1;
}
  
.column.middle {
    flex: 2;
}
```

6. Modificar o arquivo `indexFlexbox.html`:

```diff
<body>

    <div class="header">
        <h1>Chania</h1>
    </div>

+    <div class="row1">
+        <div class="row2">
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
+        </div>

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
```