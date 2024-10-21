Para incluir suporte para telas médias, faça as seguintes alterações:

```diff
<!DOCTYPE html>
<html class="">

<head>
    <meta charset='utf-8'>
    <title>Laboratório</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href="tailwindOutput.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">

    <script>
        function toggleMenu() {
            var x = document.getElementById("menu");
            console.log(x.style.display);
            if (x.style.display === "none" || x.style.display === "") {
                x.style.display = "flex";
            } else {
                x.style.display = "none";
            }
        }

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

<body class="w-full flex flex-col bg-white dark:bg-black dark:text-white">
    <div class="fixed top-0 left-0 w-full h-14 p-4 flex flex-row justify-between
    bg-gray-200 border-b border-b-gray-300 dark:bg-gray-900
    dark:border-b-gray-800">
        <div class="flex flex-row items-center gap-x-4 ">
            <div onclick="toggleMenu()" class="flex items-center justify-center
            select-none cursor-pointer text-gray-500 hover:text-orange-800
            active:text-red-500 dark:hover:text-orange-300
            dark:active:text-red-500">
                <i class="material-icons">menu</i>
            </div>

            <div class="font-bold text-2xl cursor-pointer
            select-none">NEWS</div>
            <div id="menu" class="fixed top-14 left-0 w-full z-10 hidden
            flex-col p-8 gap-y-2 text-lg font-bold bg-gray-200
            dark:bg-gray-900">
                <div class="p-2 cursor-pointer select-none hover:text-orange-800
                dark:hover:text-orange-300">Business</div>
                <div class="p-2 cursor-pointer select-none hover:text-orange-800
                dark:hover:text-orange-300">Science</div>
                <div class="p-2 cursor-pointer select-none hover:text-orange-800
                dark:hover:text-orange-300">Culture</div>
                <div class="p-2 cursor-pointer select-none hover:text-orange-800
                dark:hover:text-orange-300">Sports</div>
                <div class="p-2 cursor-pointer select-none hover:text-orange-800
                dark:hover:text-orange-300">Entertainment</div>
                <div class="p-2 cursor-pointer select-none hover:text-orange-800
                dark:hover:text-orange-300">Tech</div>
            </div>
        </div>
        <div class="flex flex-row gap-x-2">
            <button class="rounded px-3 py-0 text-xs bg-orange-800 text-white
            hover:bg-orange-900 active:bg-orange-950 dark:bg-orange-400
            dark:text-black dark:hover:bg-orange-300 dark:active:bg-orange-200
            ">
                Subscribe</button>
            <div onclick="toggleDarkMode()" class="select-none cursor-pointer
            text-black hover:text-yellow-500 dark:text-white">
                <div class="text-xs dark:hidden">
                    <i class="material-icons">nightlight</i>
                </div>
                <div class="text-xs hidden dark:block">
                    <i class="material-icons">lightbulb</i>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-24 px-4 pb-4 flex flex-col gap-y-4 items-center
+                md:px-10">
        <div class="p-8 rounded bg-red-800 text-white text-3xl">
            Compre! Compre! Compre!
        </div>
        <div class="flex flex-col">
            <div class="w-full">
                <div class="pb-4 w-full flex flex-row border-t-2 border-gray-950
                dark:border-gray-300">
                    <div class="w-full p-2 bg-gray-950 text-white
                    dark:bg-gray-300 dark:text-black
+                    md:w-fit">
                    Today's picks</div>
                </div>
                <div class="flex flex-col
+                            md:flex-row-reverse md:gap-x-8">
                    <div class="w-full flex flex-col gap-y-2 mb-8
+                                md:w-3/4">
                        <div class="w-full h-80 bg-[url('imagemPick1.jpg')]
                        bg-center bg-cover"></div>
                        <div class="text-xs italic">Category</div>
                        <div class="text-5xl font-bold">Very important
                        news!</div>
                        <div class="text-sm">Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Curabitur pulvinar nisl a
                        volutpat sagittis. Pellentesque habitant morbi tristique
                        senectus et netus et malesuada fames ac turpis egestas.
                        Curabitur nec lectus lorem. Proin et egestas mauris.
                        Mauris imperdiet, sapien eu rhoncus efficitur, orci
                        tellus ullamcorper metus, ut euismod justo nunc sed
                        ex.</div>
                        <div class="text-xs">Author name</div>
                    </div>
                    <div class="flex flex-col
+                                md:w-1/4">
                        <div class="w-full flex flex-col gap-y-2 mb-8">
                            <div class="w-full h-80 bg-[url('imagemPick2.jpg')]
                            bg-center bg-cover
+                            md:h-32"></div>
                            <div class="text-xs italic">Category</div>
                            <div class="text-5xl font-bold
+                            md:text-xl">
                            Not so important news!</div>
                            <div class="text-sm
+                            md:hidden">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Curabitur pulvinar nisl
                            a volutpat sagittis. Pellentesque habitant morbi
                            tristique senectus et netus et malesuada fames ac
                            turpis egestas. Curabitur nec lectus lorem. Proin et
                            egestas mauris. Mauris imperdiet, sapien eu rhoncus
                            efficitur, orci tellus ullamcorper metus, ut euismod
                            justo nunc sed ex.</div>
                            <div class="text-xs">Author name</div>
                        </div>
                        <div class="w-full flex flex-col gap-y-2 mb-8">
                            <div class="w-full h-80 bg-[url('imagemPick3.jpg')]
                            bg-center bg-cover
+                            md:h-32"></div>
                            <div class="text-xs italic">Category</div>
                            <div class="text-5xl font-bold
+                            md:text-xl">
                            Not so important news!</div>
                            <div class="text-sm
+                            md:hidden">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Curabitur pulvinar nisl
                            a volutpat sagittis. Pellentesque habitant morbi
                            tristique senectus et netus et malesuada fames ac
                            turpis egestas. Curabitur nec lectus lorem. Proin et
                            egestas mauris. Mauris imperdiet, sapien eu rhoncus
                            efficitur, orci tellus ullamcorper metus, ut euismod
                            justo nunc sed ex.</div>
                            <div class="text-xs">Author name</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <div class="pb-4 w-full flex flex-row border-t-2 border-gray-950
                dark:border-gray-300">
                    <div class="w-full p-2 bg-gray-950 text-white
                    dark:bg-gray-300 dark:text-black
+                    md:w-fit">
                    Recent news</div>
                </div>
                <div class="flex flex-col w-full gap-y-2
+                            md:flex-row md:flex-wrap md:mb-8">
                    <div class="w-full flex flex-col gap-y-2 mb-2
+                                md:w-1/2 md:px-2">
                        <div class="text-xl font-bold">
                            First, Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                        </div>
                        <div class="text-xs">Author name</div>
                        <div class="w-full border-t mb-2 border-gray-300
                        dark:border-gray-700"></div>
                    </div>
                    <div class="w-full flex flex-col gap-y-2 mb-2
+                                md:w-1/2 md:px-2">
                        <div class="text-xl font-bold">
                            Second, Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                        </div>
                        <div class="text-xs">Author name</div>
                        <div class="w-full border-t mb-2 border-gray-300
                        dark:border-gray-700"></div>
                    </div>
                    <div class="w-full flex flex-col gap-y-2 mb-2
+                                md:w-1/2 md:px-2 ">
                        <div class="text-xl font-bold">
                            Third, Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                        </div>
                        <div class="text-xs">Author name</div>
                        <div class="w-full border-t mb-2 border-gray-300
                        dark:border-gray-700
+                        md:hidden"></div>
                    </div>
                    <div class="w-full flex flex-col gap-y-2 mb-2
+                                md:w-1/2 md:px-2">
                        <div class="text-xl font-bold">
                            Fourth, Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                        </div>
                        <div class="text-xs">Author name</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex flex-col
+                    md:flex-row md:flex-wrap md:mb-8">
            <div class="w-full
+                        md:w-1/3 md:px-4">
                <div class="w-full p-2 bg-gray-950 text-white dark:bg-gray-300
                dark:text-black
+                md:w-fit">Business</div>
                <div class="w-full flex flex-col gap-y-2 mb-8">
                    <div class="w-full h-80 bg-[url('imagemBusiness.jpg')]
                    bg-center bg-cover
+                    md:h-32"></div>
                    <div class="text-xl font-bold">
                        First important business news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Second important business news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Third important business news.
                    </div>
                </div>
            </div>
            <div class="w-full
+                        md:w-1/3 md:px-4">
                <div class="w-full p-2 bg-gray-950 text-white dark:bg-gray-300
                dark:text-black
+                md:w-fit">Science</div>
                <div class="w-full flex flex-col gap-y-2 mb-8">
                    <div class="w-full h-80 bg-[url('imagemScience.jpg')]
                    bg-center bg-cover
+                    md:h-32"></div>
                    <div class="text-xl font-bold">
                        First important science news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Second important science news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Third important science news.
                    </div>
                </div>
            </div>
            <div class="w-full
+                        md:w-1/3 md:px-4">
                <div class="w-full p-2 bg-gray-950 text-white dark:bg-gray-300
                dark:text-black
+                md:w-fit">Culture</div>
                <div class="w-full flex flex-col gap-y-2 mb-8">
                    <div class="w-full h-80 bg-[url('imagemCulture.jpg')]
                    bg-center bg-cover
+                    md:h-32"></div>
                    <div class="text-xl font-bold">
                        First important culture news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Second important culture news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Third important culture news.
                    </div>
                </div>
            </div>
            <div class="w-full
+                        md:w-1/3 md:px-4">
                <div class="w-full p-2 bg-gray-950 text-white dark:bg-gray-300
                dark:text-black
+                md:w-fit">Sports</div>
                <div class="w-full flex flex-col gap-y-2 mb-8">
                    <div class="w-full h-80 bg-[url('imagemSports.jpg')]
                    bg-center bg-cover
+                    md:h-32"></div>
                    <div class="text-xl font-bold">
                        First important sports news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Second important sports news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Third important sports news.
                    </div>
                </div>
            </div>
            <div class="w-full
+                        md:w-1/3 md:px-4">
                <div class="w-full p-2 bg-gray-950 text-white dark:bg-gray-300
                dark:text-black
+                md:w-fit">Entertainment</div>
                <div class="w-full flex flex-col gap-y-2 mb-8">
                    <div class="w-full h-80 bg-[url('imagemEntertainment.jpg')]
                    bg-center bg-cover
+                    md:h-32"></div>
                    <div class="text-xl font-bold">
                        First important entertainment news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Second important entertainment news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Third important entertainment news.
                    </div>
                </div>
            </div>
            <div class="w-full
+                        md:w-1/3 md:px-4">
                <div class="w-full p-2 bg-gray-950 text-white dark:bg-gray-300
                dark:text-black
+                md:w-fit">Tech</div>
                <div class="w-full flex flex-col gap-y-2 mb-8">
                    <div class="w-full h-80 bg-[url('imagemTech.jpg')] bg-center
                    bg-cover
+                    md:h-32"></div>
                    <div class="text-xl font-bold">
                        First important tech news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Second important tech news.
                    </div>
                    <div class="w-full border-t mb-2 border-gray-300
                    dark:border-gray-700"></div>
                    <div class="text-xl font-bold">
                        Third important tech news.
                    </div>
                </div>
            </div>
        </div>
        <div class="p-8 rounded bg-red-800 text-white text-3xl">
            Compre! Compre! Compre!
        </div>
    </div>
    <div class="w-full p-8 bg-black text-white flex flex-col">
        <div class="w-full font-bold cursor-pointer select-none
        text-center">NEWS</div>
        <div class="w-full text-center text-xs mt-8">
            NEWS is a private company, focused on bringing the latest news based
            on what the market wants to read. We have no responsibility with
            informing the truth, nor checking all the facts. We are only
            interested in money. And responsive design.
        </div>
    </div>
</body>

</html>
```