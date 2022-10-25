Repetir a mesma configuração do projeto com os [exemplos básicos do Tailwind](tailwind.md).

1. Adicionar cores e fontes customizadas, modificando o arquivo `tailwind.config.js`:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html"],
    theme: {
        extend: {
            colors: {
                'roxoClaro': '#9933cc',
                'azulClaro1': '#33b5e5',
                'azulClaro2': '#0099cc'
            },
            fontFamily: {
                'sans': ['Lucida Sans', 'sans-serif']
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}
```

2. Criar o seguinte conteúdo no arquivo `index.html`:

```html
<!DOCTYPE html>
<html class="font-sans">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="tailwindOutput.css" />
    <title>Exemplos de CSS</title>
</head>

<body class="">

    <div class="">
        <h1>Chania</h1>
    </div>

    <div class="">
        <div class="">
            <div class="">
                <ul>
                    <li class="">
                        The
                        Flight</li>
                    <li class="">
                        The
                        City</li>
                    <li class="">
                        The
                        Island</li>
                    <li class="">
                        The
                        Food</li>
                </ul>
            </div>

            <div class="">
                <h1 class="">The City</h1>
                <p class="">Chania is the capital of the Chania region on the island of Crete. The city can be
                    divided in two parts,
                    the old town and the modern city.</p>
            </div>


        </div>

        <div class="">
            <div class="">
                <h2 class="">What?</h2>
                <p class="">Chania is a city on the island of Crete.</p>
                <h2 class="">Where?</h2>
                <p class="">Crete is a Greek island in the Mediterranean Sea.</p>
                <h2 class="">How?</h2>
                <p class="">You can reach Chania airport from all over Europe.</p>
            </div>
        </div>
    </div>

    <div class="">
        <p class="">Resize the browser window to see how the content respond to the resizing.</p>
    </div>

</body>

</html>
```

3. Acrescentar as classes, ainda sem responsividade (*mobile first*):

```html
<!DOCTYPE html>
<html class="font-sans">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="tailwindOutput.css" />
    <title>Exemplos de CSS</title>
</head>

<body class="p-2">

    <div class="bg-roxoClaro p-5 text-2xl font-bold text-white">
        <h1>Chania</h1>
    </div>

    <div class="">
        <div class="p-2">
            <div class="">
                <ul>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        Flight</li>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        City</li>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        Island</li>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        Food</li>
                </ul>
            </div>

            <div class="p-4">
                <h1 class="mb-5 mt-5 text-2xl font-bold">The City</h1>
                <p class="text-xs">Chania is the capital of the Chania region on the island of Crete. The city can be
                    divided in two parts,
                    the old town and the modern city.</p>
            </div>


        </div>

        <div class="m-4 p-4 bg-azulClaro1 shadow-sm shadow-gray-400">
            <div class="text-center text-white">
                <h2 class="pb-2 pt-2 font-bold">What?</h2>
                <p class="text-xs">Chania is a city on the island of Crete.</p>
                <h2 class="pb-2 pt-2 font-bold">Where?</h2>
                <p class="text-xs">Crete is a Greek island in the Mediterranean Sea.</p>
                <h2 class="pb-2 pt-2 font-bold">How?</h2>
                <p class="text-xs">You can reach Chania airport from all over Europe.</p>
            </div>
        </div>
    </div>

    <div class="bg-azulClaro2 p-4">
        <p class="text-white text-xs">Resize the browser window to see how the content respond to the resizing.</p>
    </div>

</body>

</html>
```

4. Agora vamos adicionar dois *breakpoints*:

```diff
<!DOCTYPE html>
<html class="font-sans">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="tailwindOutput.css" />
    <title>Exemplos de CSS</title>
</head>

<body class="p-2">

    <div class="bg-roxoClaro p-5 text-2xl font-bold text-white">
        <h1>Chania</h1>
    </div>

+    <div class="lg:flex lg:justify-between">
+        <div class="p-2 sm:flex sm:items-center">
+            <div class="sm:basis-44 sm:grow-0 sm:shrink-0">
                <ul>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        Flight</li>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        City</li>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        Island</li>
                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2">
                        The
                        Food</li>
                </ul>
            </div>

            <div class="p-4">
+                <h1 class="mb-5 mt-5 text-2xl font-bold sm:mt-0">The City</h1>
                <p class="text-xs">Chania is the capital of the Chania region on the island of Crete. The city can be
                    divided in two parts,
                    the old town and the modern city.</p>
            </div>


        </div>

        <div class="m-4 p-4 bg-azulClaro1 shadow-sm shadow-gray-400">
            <div class="text-center text-white">
                <h2 class="pb-2 pt-2 font-bold">What?</h2>
                <p class="text-xs">Chania is a city on the island of Crete.</p>
                <h2 class="pb-2 pt-2 font-bold">Where?</h2>
                <p class="text-xs">Crete is a Greek island in the Mediterranean Sea.</p>
                <h2 class="pb-2 pt-2 font-bold">How?</h2>
                <p class="text-xs">You can reach Chania airport from all over Europe.</p>
            </div>
        </div>
    </div>

    <div class="bg-azulClaro2 p-4">
        <p class="text-white text-xs">Resize the browser window to see how the content respond to the resizing.</p>
    </div>

</body>

</html>
```

5. Vamos agora adicionar um modo escuro. Adicionar novas cores ao arquivo `tailwind.config.js`:

```diff
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html"],
    theme: {
        extend: {
            colors: {
                'roxoClaro': '#9933cc',
                'azulClaro1': '#33b5e5',
                'azulClaro2': '#0099cc',
+                'roxoEscuro': '#301041',
+                'azulEscuro1': '#103947',
+                'azulEscuro2': '#175266',
            },
            fontFamily: {
                'sans': ['Lucida Sans', 'sans-serif']
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}
```

6. Modificar o arquivo `index.html`:

```diff
<!DOCTYPE html>
+<html class="font-sans dark">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="tailwindOutput.css" />
    <title>Exemplos de CSS</title>
</head>

+<body class="p-2 dark:bg-roxoEscuro">

    <div class="bg-roxoClaro p-5 text-2xl font-bold text-white">
        <h1>Chania</h1>
    </div>

    <div class="lg:flex lg:justify-between">
        <div class="p-2 sm:flex sm:items-center">
            <div class="sm:basis-44 sm:grow-0 sm:shrink-0">
                <ul>
+                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2 dark:bg-azulEscuro1 dark:hover:bg-azulEscuro2 dark:shadow-black">
                        The
                        Flight</li>
+                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2 dark:bg-azulEscuro1 dark:hover:bg-azulEscuro2 dark:shadow-black">
                        The
                        City</li>
+                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2 dark:bg-azulEscuro1 dark:hover:bg-azulEscuro2 dark:shadow-black">
                        The
                        Island</li>
+                    <li class="bg-azulClaro1 text-white text-xs p-2 mb-1 shadow-sm shadow-gray-400 hover:bg-azulClaro2 dark:bg-azulEscuro1 dark:hover:bg-azulEscuro2 dark:shadow-black">
                        The
                        Food</li>
                </ul>
            </div>

+            <div class="p-4 dark:text-white">
                <h1 class="mb-5 mt-5 text-2xl font-bold sm:mt-0">The City</h1>
                <p class="text-xs">Chania is the capital of the Chania region on the island of Crete. The city can be
                    divided in two parts,
                    the old town and the modern city.</p>
            </div>


        </div>

+        <div class="m-4 p-4 bg-azulClaro1 shadow-sm shadow-gray-400 dark:bg-azulEscuro1 dark:shadow-black">
            <div class="text-center text-white">
                <h2 class="pb-2 pt-2 font-bold">What?</h2>
                <p class="text-xs">Chania is a city on the island of Crete.</p>
                <h2 class="pb-2 pt-2 font-bold">Where?</h2>
                <p class="text-xs">Crete is a Greek island in the Mediterranean Sea.</p>
                <h2 class="pb-2 pt-2 font-bold">How?</h2>
                <p class="text-xs">You can reach Chania airport from all over Europe.</p>
            </div>
        </div>
    </div>

+    <div class="bg-azulClaro2 p-4 dark:bg-azulEscuro2">
        <p class="text-white text-xs">Resize the browser window to see how the content respond to the resizing.</p>
    </div>

</body>

</html>
```

7. Alternar entre os modos claro e escuro para ver os efeitos