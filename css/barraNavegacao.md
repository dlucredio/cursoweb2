Para facilitar a construção deste exemplo, utilize a mesma pasta `css-tutorial` [criada anteriormente](./README.md).

1. Crie um arquivo chamado `indexNavbar.html`:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styleNavbar.css" />
    <title>Barra de navegação</title>
</head>

<body>
    <main>
        Main
        <header>
            Header
            <p>
                Lorem ipsum dolor sit amet.
            </p>
        </header>

        <nav>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>
                    <input type="text" class="search-input" placeholder="Search">
                </li>
                <li>Logout</li>
            </ul>
        </nav>

        <div>
            <section class="content">
                Content

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius quam expetenda. Nihil opus
                    est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius quam expetenda. Nihil opus
                    est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius.
                </p>
            </section>

            <aside class="sidebar">
                Sidebar
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius quam expetenda. Nihil opus
                    est
                    exemplis hoc facere longius.
                </p>
            </aside>
        </div>

        <footer>
            Footer
            <p>
                Lorem ipsum dolor sit amet.
            </p>
        </footer>

    </main>
</body>

</html>
```

2. Crie um arquivo chamado `styleNavbar.css`:

```css
@import url('https://fonts.googleapis.com/css?family=Livvic&display=swap');

html {
    font-size: 100%;
    font-family: 'Livvic', sans-serif;
}

main, header, nav, section, aside, footer {
    margin: 0;
    padding: 1.25em;
    border: 1px solid #000000;
    color: #ffffff;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

nav ul li {
    padding: 10px;
    text-align: center;
}

main {
    background: #000000;
}

header {
    background: #03a9f4;
}

nav {
    background: #d22b1f;
}

.content {
    background: #129a22;
}

.sidebar {
    border: 1px solid #000000;
    background: #673ab7;
}

footer {
    border: 1px solid #000000;
    background: #616161;
}

.search-input {
    width: 100%;
    max-width: 30rem;
    font-family: 'Livvic', sans-serif;
}
```

3. Agora vamos adicionar responsividade. Crie o arquivo `responsivenessNavbar.css`:

```css
* {
    box-sizing: border-box;
}

.responsive-main-area {
    margin: auto;
    max-width: 80rem;
}

.responsive-main-area-1 {
    flex: 1;
}

.responsive-main-area-2 {
    flex: 0 1 20rem;
}

.responsive-navbar {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
}

.responsive-navbar ul {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.responsive-fill-row {
    flex: 1;
}

@media screen and (min-width: 25rem) {
    .responsive-navbar ul {
        flex-direction: row;
    }
    .responsive-navbar li {
        flex-basis: 50%;
    }
}

@media screen and (min-width: 40rem) {
    .responsive-main-area {
        display: flex;
    }
    .responsive-navbar ul {
        display: flex;
    }
    .responsive-navbar li {
        flex-basis: 0%;
    }
}
```

4. Modificar o arquivo `indexNavbar.html` para definir o layout:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styleNavbar.css" />
+    <link rel="stylesheet" type="text/css" href="responsivenessNavbar.css" />
    <title>Barra de navegação</title>
</head>

<body>
    <main>
        Main
        <header>
            Header
            <p>
                Lorem ipsum dolor sit amet.
            </p>
        </header>

+        <nav class="responsive-navbar">
            <ul>
                <li>Home</li>
                <li>Profile</li>
+                <li class="responsive-fill-row">
                    <input type="text" class="search-input" placeholder="Search">
                </li>
                <li>Logout</li>
            </ul>
        </nav>

+        <div class="responsive-main-area">
+            <section class="content responsive-main-area-1">
                Content

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius quam expetenda. Nihil opus
                    est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius quam expetenda. Nihil opus
                    est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius
                    quam expetenda. Nihil opus est
                    exemplis hoc facere longius.
                </p>
            </section>

+            <aside class="sidebar responsive-main-area-2">
                Sidebar
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sumenda potius quam expetenda. Nihil opus
                    est
                    exemplis hoc facere longius.
                </p>
            </aside>
        </div>

        <footer>
            Footer
            <p>
                Lorem ipsum dolor sit amet.
            </p>
        </footer>

    </main>
</body>

</html>
```

5. Agora vamos adicionar uma opção para utilizar um ícone para o menu na versão para telas pequenas
6. Modificar o arquivo `index.html`:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="styleNavbar.css" />
    <link rel="stylesheet" type="text/css" href="responsivenessNavbar.css" />
+    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Barra de navegação</title>
</head>

<body>
    <main>
        Main
        <header>
            Header
            <p>
                Lorem ipsum dolor sit amet.
            </p>
        </header>

        <nav class="responsive-navbar">
+            <label id='label-dropdown-navbar-menu' for='checkbox-dropdown-navbar-menu'>
+                <i class='material-icons navbar-menu-icon'>
+                    menu
+                </i>
+            </label>
+            <input type='checkbox' id='checkbox-dropdown-navbar-menu' />
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li class="responsive-fill-row">
                    <input type="text" class="search-input" placeholder="Search">
                </li>
                <li>Logout</li>
            </ul>
        </nav>
...
```

7. Modificar o arquivo `responsivenessNavbar.css`:

```diff
* {
    box-sizing: border-box;
}

.responsive-main-area {
    margin: auto;
    max-width: 80rem;
}

.responsive-main-area-1 {
    flex: 1;
}

.responsive-main-area-2 {
    flex: 0 1 20rem;
}

.responsive-navbar {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
}

.responsive-navbar ul {
+    display: none;
    flex-wrap: wrap;
    flex-direction: column;
}

.responsive-fill-row {
    flex: 1;
}

+#label-dropdown-navbar-menu {
+    text-align: right;
+    user-select: none;
+    cursor: pointer;
+}

+#checkbox-dropdown-navbar-menu {
+    display: none;
+}

+#checkbox-dropdown-navbar-menu:checked + ul {
+    display: flex;
+}

@media screen and (min-width: 25rem) {
    .responsive-navbar ul {
+        display: flex;
        flex-direction: row;
    }
    .responsive-navbar li {
        flex-basis: 50%;
    }
+    #label-dropdown-navbar-menu {
+        display: none;
+    }
}

@media screen and (min-width: 40rem) {
    .responsive-main-area {
        display: flex;
    }
    .responsive-navbar ul {
        display: flex;
    }
    .responsive-navbar li {
        flex-basis: 0%;
    }
}
```