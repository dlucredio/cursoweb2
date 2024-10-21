A solução para telas pequenas, com modo claro e escuro, é a seguinte:

```html
<!DOCTYPE html>
<html class="">

<head>
    <meta charset='utf-8'>
    <title>Laboratório 1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href="tailwindOutput.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
    <script>
        function toggleDarkMode() {
            const htmlElement = document.documentElement;
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
            } else {
                htmlElement.classList.add('dark');
            }
        }
    </script>
</head>

<body class="w-full h-dvh min-h-dvh flex items-center justify-center
bg-slate-300">
    <div class="fixed right-8 bottom-8 z-10">
        <div onclick="toggleDarkMode()" class="select-none cursor-pointer
text-black hover:text-yellow-500
dark:text-white">
            <div class="text-xs dark:hidden">
                <i class="material-icons">nightlight</i>
            </div>
            <div class="text-xs hidden dark:block">
                <i class="material-icons">lightbulb</i>
            </div>
        </div>
    </div>
    <div class="w-full h-full">
        <div class="w-full h-full flex items-center justify-center">
            <div class="w-full h-full flex flex-col items-center justify-between
            gap-y-3 bg-slate-300 dark:bg-slate-900">
                <div class="w-full p-4 flex flex-row justify-between
                items-center mb-8">
                    <img src="logo.png" class="w-24 dark:hidden"></img>
                    <img src="logoDark.png" class="w-24 hidden
                    dark:block"></img>
                    <div class="text-xl font-bold text-right dark:text-white">Be
                    different. Be yourself.</div>
                </div>
                <div class="w-full flex flex-col items-center gap-y-12 p-8">
                    <div class="w-full relative flex justify-end items-center">
                        <input placeholder="E-mail" class="w-full text-xl
                        rounded p-2 outline-0 bg-slate-400 text-slate-800
                        placeholder:text-slate-800 focus:bg-slate-500
                        dark:bg-slate-700 dark:text-slate-300
                        dark:placeholder:text-slate-300 dark:focus:bg-slate-600"
                        />
                        <i class="material-icons text-white absolute
                        mr-2">mail</i>
                    </div>
                    <div class="w-full relative flex justify-end items-center">
                        <input type="password" placeholder="Password"
                        class="w-full text-xl rounded p-2 outline-0 bg-slate-400
                        text-slate-800 placeholder:text-slate-800
                        focus:bg-slate-500 dark:bg-slate-700 dark:text-slate-300
                        dark:placeholder:text-slate-300 dark:focus:bg-slate-600"
                        />
                        <i class="material-icons text-white absolute
                        mr-2">key</i>
                    </div>
                </div>
                <div class="flex flex-col justify-end mb-24">
                    <button class="select-none text-xl mt-8 rounded p-2 w-full
                    bg-slate-600 text-white  hover:bg-blue-700
                    active:bg-blue-500 dark:bg-slate-400 dark:text-slate-800
                    dark:hover:bg-blue-900 dark:hover:text-blue-300
                    dark:active:bg-blue-700">Login</button>
                    <div class="w-full text-right text-sm select-none"><a
                    href="#" class="hover:text-blue-700 dark:text-blue-400
                    dark:hover:text-blue-200">Forgot your password?</a></div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```