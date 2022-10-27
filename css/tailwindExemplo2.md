Repetir a mesma configuração do projeto com os [exemplos básicos do Tailwind](tailwind.md).

1. Criar um arquivo `index.html`:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="tailwindOutput.css" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Exemplos de CSS</title>
</head>

<body>
    <div class="flex">
        <div class="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow">
            <i class="material-icons">add_a_photo</i>
            <i class="material-icons">airplanemode_active</i>
            <i class="material-icons">color_lens</i>
            <i class="material-icons">directions_walk</i>
            <i class="material-icons">record_voice_over</i>
        </div>
    </div>
</body>

</html>
```

2. Modificar o arquivo `tailwindInput.css` para criar um componente customizado (usar apenas em casos excepcionais):

```diff
@tailwind base;
@tailwind components;
@tailwind utilities;

+@layer components {
+    .sidebar-icon {
+        @apply flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto shadow-lg bg-gray-700 text-green-500;
+    }
+}
```

3. Modificar o arquivo `index.html` para aplicar o novo componente aos ícones:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="tailwindOutput.css" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Exemplos de CSS</title>
</head>

<body>
    <div class="flex">
        <div class="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow">
+            <div class="sidebar-icon">
                <i class="material-icons">add_a_photo</i>
+            </div>
+            <div class="sidebar-icon">
                <i class="material-icons">airplanemode_active</i>
+            </div>
+            <div class="sidebar-icon">
                <i class="material-icons">color_lens</i>
+            </div>
+            <div class="sidebar-icon">
                <i class="material-icons">directions_walk</i>
+            </div>
+            <div class="sidebar-icon">
                <i class="material-icons">record_voice_over</i>
+            </div>
        </div>
</body>

</html>
```

4. Vamos adicionar uma animação para quando passamos o mouse pelos botões. Modificar o arquivo `tailwindInput.css`:

```diff
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .sidebar-icon {
+        @apply flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto shadow-lg bg-gray-700 text-green-500 hover:bg-green-800 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer;
    }
}```

5. Por último, vamos adicionar um texto de dica ao lado dos botões. Modificar o arquivo `tailwindInput.css`:

```diff
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .sidebar-icon {
+        @apply relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto shadow-lg bg-gray-700 text-green-500 hover:bg-green-800 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer;
    }

+    .sidebar-tooltip {
+        @apply absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-200 scale-0 origin-left;
+    }
}
```

6. Modificar o arquivo `index.html`:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="tailwindOutput.css" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Exemplos de CSS</title>
</head>

<body>
    <div class="flex">
        <div class="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow">
+            <div class="sidebar-icon group">
                <i class="material-icons">add_a_photo</i>
+                <span class="sidebar-tooltip group-hover:scale-100">
+                    Add a photo
+                </span>
            </div>
+            <div class="sidebar-icon group">
                <i class="material-icons">airplanemode_active</i>
+                <span class="sidebar-tooltip group-hover:scale-100">
+                    Airplane mode
+                </span>
            </div>
+            <div class="sidebar-icon group">
                <i class="material-icons">color_lens</i>
+                <span class="sidebar-tooltip group-hover:scale-100">
+                    Choose color
+                </span>
            </div>
+            <div class="sidebar-icon group">
                <i class="material-icons">directions_walk</i>
+                <span class="sidebar-tooltip group-hover:scale-100">
+                    Get directions
+                </span>
            </div>
+            <div class="sidebar-icon group">
                <i class="material-icons">record_voice_over</i>
+                <span class="sidebar-tooltip group-hover:scale-100">
+                    Enter voice channel
+                </span>
            </div>
        </div>
</body>

</html>
```