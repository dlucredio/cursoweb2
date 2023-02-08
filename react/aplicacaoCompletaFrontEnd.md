Neste exemplo faremos o front-end da aplicação, utilizando [React](https://reactjs.org/) e [TailwindCSS](https://tailwindcss.com/). Para compreender melhor o que iremos construir, primeiro confira o [design completo da interface](designInterfaceFrontend.md).

Agora iremos construir a solução passo-a-passo. Se quiser testar antes, para ver a aplicação rodando, basta acessar [essa pasta do repositório](./aplicacaoCompleta/).

1. O primeiro passo é criar um projeto React, com o comando:

```
npx create-react-app worldcup-pool-frontend
```

2. Em seguida, podemos instalar o TailwindCSS, seguindo [as instruções na página oficial](https://tailwindcss.com/docs/guides/create-react-app).

3. Vamos começar limpando o projeto. Apagar tudo da pasta `src` e deixar somente os seguintes arquivos:

```
App.js
index.css
index.js
reportWebVitals.js
```

4. Agora vamos instalar uma fonte customizada. Se não quiser aprender o processo todo, basta copiar o código abaixo e pular para o passo 9. Se quiser aprender a instalar outras fontes, veja as instruções detalhadas nos passos 5 a 8:
```
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;500;600;700;800;900&display=swap');
```

5. Vá até o [Google fonts](https://fonts.google.com/) e procure pela fonte chamada "Unbounded" (ou outra, se preferir).

6. Selecione todas as variantes dessa fonte (procure pelos botões "Select ExtraLight 200", "Select Light 300", etc, e clique em todos)

7. Clique, na barra de ferramentas, na opção "View selected families".

8. Procure pelo código utilizado para embutir a fonte, selecionando a opção `@import`. Copie o código do `@import`, mas apenas o trecho entre `<style>` e `</style>`.

9. Abra o arquivo `src/index.css`, que você já modificou no passo 2, e cole o conteúdo copiado no topo. Vamos aproveitar que estamos aqui e vamos adicionar algumas regras CSS para poder trabalhar em modo *fullscreen* com nosso aplicativo:

```diff
+@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

+html,
+body,
+#root,
+#root>div {
+    min-height: 100%
+}
```

10. Para concluir a instalação da fonte, vamos estender o tema padrão do Tailwind para incluir a nova fonte como a prioritária na renderização. Para não perder as opções anteriores, vamos inclui-las na sequência da família `sans` (sem serifa).
11. Para isso, modificar o arquivo `tailwind.config.js`:

```diff
/** @type {import('tailwindcss').Config} */

+const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
+        extend: {
+            fontFamily: {
+                'sans': ['Unbounded', ...defaultTheme.fontFamily.sans],
+            }
+        },
    },
    plugins: [],
}
```

12. Já que acabamos de instalar uma fonte, vamos continuar com a parte visual e instalar um pacote de ícones. Utilizaremos apenas um, na verdade (para o menu na barra de navegação), mas é conveniente ter uma coleção à disposição para utilizar. Utilizaremos o [React Icons](https://react-icons.github.io/react-icons/). Para instalar, executar o comando:

```npm install react-icons```

13. Estamos quase terminando de configurar o projeto. O próximo passo é instalar o pacote `React Router`, para facilitar a transição entre as diferentes telas da aplicação. Execute o seguinte comando:

```npm install -D react-router-dom```

14. Agora podemos fazer o "esqueleto" básico da aplicação. A estrutura de diretórios será a seguinte:

* Pode criar agora os diretórios que estão faltando

```
worldcup-pool-frontend
+-- node_modules            (pacotes node, react, react-dom, etc)
+-- public                  (arquivos estáticos. Não mexeremos aqui neste exemplo)
+-- src                     (código-fonte)
|   +-- components          (componentes reutilizáveis react)
|   +-- pages               (páginas da aplicação)
|   +-- utils               (funções auxiliares)
|   +-- App.js              (código principal)
|   +-- index.css           (CSS principal. Já mexemos nele até agora, não mexeremos mais)
|   +-- index.js            (código inicial do React. Não mexeremos nele)
|   +-- reportWebVitals.js  (código inicial do React. Não mexeremos nele)
+-- (outros arquivos: package.json, .gitignore, etc)
```

15. Vamos começar criando a navegação principal do aplicativo.
16. Criar o arquivo `src/pages/Layout.js`:

* Note o código comentado. Você pode, posteriormente, trocar seu conteúdo com o da linha anterior para forçar o modo noturno.

```js
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
        {/* <div className="dark"> */}
            <Outlet />
        </div>
    )
};

export default Layout;
```

17. Criar o arquivo `src/pages/Home.js`:

```js
function Home() {
    return (
        <div>
            Pagina inicial
        </div>
    );
}

export default Home;
```

18. Criar o arquivo `src/pages/PlaceBet.js`:

```js
function PlaceBet() {
    return (
        <div>
            Pagina para fazer um palpite
        </div>
    );
}

export default PlaceBet;
```

19. Criar o arquivo `src/pages/ViewBets.js`:

```js
function ViewBets() {
    return (
        <div>
            Pagina para ver os palpites feitos
        </div>
    );
}

export default ViewBets;
```

20. Substituir o conteúdo do arquivo `src/App.js` pelo seguinte:

```js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import PlaceBet from './pages/PlaceBet';
import ViewBets from './pages/ViewBets';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="placeBet" element={<PlaceBet />} />
                    <Route path="viewBets" element={<ViewBets />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

21. Já podemos executar o projeto pela primeira vez para ver a estrutura principal funcionando:

```npm run start```