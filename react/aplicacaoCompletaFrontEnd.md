Neste exemplo faremos o front-end da aplicação, utilizando [React](https://reactjs.org/) e [TailwindCSS](https://tailwindcss.com/). Para compreender melhor o que iremos construir, primeiro confira o [design completo da interface](designInterfaceFrontend.md).

Agora iremos construir a solução passo-a-passo. Se quiser testar antes, para ver a aplicação rodando, basta acessar [essa pasta do repositório](./aplicacaoCompleta/).

1. O primeiro passo é criar um projeto React, com o comando:

```
npx create-react-app worldcup-pool-frontend
```

2. Em seguida, podemos instalar o TailwindCSS, seguindo [as instruções na página oficial](https://tailwindcss.com/docs/guides/create-react-app).

* Ao término da configuração, adicione uma configuração para definir o tema claro/escuro com base em classe. Modifique o arquivo `tailwind.config.js`:

```diff
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
+    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
        },
    },
    plugins: [],
}
```

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

22. Experimente navegar, digitando as diferentes rotas na barra de endereços do navegador:

* `http://localhost:3000/` - Página inicial
* `http://localhost:3000/placeBet` - Página para fazer uma aposta
* `http://localhost:3000/viewBets` - Página para ver as apostas

23. Vamos começar construindo alguns componentes reutilizáveis.
24. Criar arquivo `src/components/Button.js`:

```js
import { Link } from "react-router-dom";

export function Button({label, color, link, action}) {
    let buttonColorClasses = ''
    if(color === 'green') {
        buttonColorClasses = 'bg-green-700 hover:bg-green-900 text-white active:bg-green-500';
    } else if(color === 'blue') {
        buttonColorClasses = 'bg-blue-700 hover:bg-blue-900 text-white active:bg-blue-500';
    } else {
        throw 'Button must have either blue or green color';
    }

    const buttonClasses = buttonColorClasses + ' p-3 rounded-2xl text-center';

    if(typeof(action) === 'string') {
        action = () => {}
    }

    if(link) {
        return <Link to={link} className={buttonClasses}>{label}</Link>
    } else if(action) {
        return <button onClick={action} className={buttonClasses}>{label}</button>
    } else {
        throw 'Button must have either link or action property defined';
    }
}
```

25. Criar arquivo `src/components/FormInput.js`:

```js
export function FormInput({ id, value, label, type, size, onChange }) {

    let sizeClass = null;
    if (size === 'full') {
        sizeClass = '';
    } else if (size === 'half') {
        sizeClass = 'sm:w-[48%]';
    } else {
        throw 'size must be full or half';
    }

    const outerDivClasses = "flex flex-col text-sm w-full "+sizeClass;

    return <div className={outerDivClasses}>
        <label htmlFor={id} className="mt-2 dark:text-white">{label}</label>
        <input value={value} onChange={onChange} id={id} type={type} className="p-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-white" />
    </div>;
}
```

26. Criar arquivo `src/components/MessageBanner.js`:

```js
export function MessageBanner({ content, type }) {
    let bannerColorClasses = ''
    if (type === 'warning') {
        bannerColorClasses = 'bg-amber-200 dark:bg-amber-900 dark:text-white';
    } else if (type === 'info') {
        bannerColorClasses = 'bg-green-200 dark:bg-green-900 dark:text-white';
    } else if (type === 'error') {
        bannerColorClasses = 'bg-red-200 dark:bg-red-900 dark:text-white';
    } else {
        throw 'Banner must be either warning, info or error';
    }

    const bannerClasses = bannerColorClasses + ' text-center rounded p-2 w-full max-w-lg text-sm';

    return <div className={bannerClasses}>
        {content}
    </div>;

}
```

27. Criar arquivo `src/components/NavBar.js`:

```js
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

export function NavBar() {
    const [floatMenuShown, setFloatMenuShown] = useState(false);

    function toggleFloatMenuShown() {
        setFloatMenuShown(!floatMenuShown);
    }

    return (
        <div className="w-full bg-gray-300 dark:bg-slate-800 text-white flex flex-row p-3 justify-between items-center">
            <Link to="/" className="text-blue-800 dark:text-blue-400 text-center text-base sm:text-2xl font-black uppercase select-none">Bolão da copa</Link>
            <div className="cursor-pointer">
                <MdMenu onClick={toggleFloatMenuShown} className="text-2xl sm:hidden text-green-700 dark:text-green-400 dark:hover:text-green-200 hover:text-green-900 select-none" />
                <div className="relative">
                    <div className={`absolute right-0 top-0 flex sm:hidden flex-col items-center bg-gray-300 dark:bg-slate-800 border-solid border-2 border-white dark:border-slate-600 rounded-xl p-4 drop-shadow transition-all duration-500 ${floatMenuShown ? 'visible opacity-100' : 'collapse opacity-0'}`}>
                        <Link to="/placeBet" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mb-4 select-none">Palpitar</Link>
                        <Link to="/viewBets" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 select-none">Ver</Link>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex items-center">
                <Link to="/placeBet" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-10 select-none">Palpitar</Link>
                <Link to="/viewBets" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 select-none">Ver</Link>
            </div>
        </div>
    );
}
```

28. Experimente usar esses componentes para ver como eles funcionam
29. Também vamos precisar de uma função auxiliar. Ainda que seja uma só, vamos criar um arquivo para guardar essa e outras que possam surgir.
30. Criar arquivo `src/utils/utils.js`:

```js
export function formatDate(date) {
    const dateObj = new Date(date);
    dateObj.setTime( dateObj.getTime() + dateObj.getTimezoneOffset()*60*1000 );
    return dateObj.toLocaleDateString();
}
```

31. Agora já podemos começar a construir as páginas.
32. Substituir o conteúdo do arquivo `src/pages/Home.js`:

```js
import { Button } from "../components/Button";

function Home() {
    return (
        <div className="bg-white dark:bg-slate-900 w-full h-full min-h-screen flex flex-col justify-center items-center">
            <div className="bg-gray-300 dark:bg-slate-800 flex flex-col justify-center items-center w-full h-full min-h-screen sm:w-fit sm:min-h-fit sm:p-16 sm:rounded-3xl">
                <div className="text-blue-800 dark:text-blue-400 text-center pb-12 text-2xl font-black uppercase">Bolão da copa</div>
                <div className="flex flex-col justify-center items-stretch">
                    <Button label="Palpitar" link="/placeBet" color='green' />
                    <div className="m-2"></div>
                    <Button label="Ver" link="/viewBets" color='green' />
                </div>
            </div>
        </div>
    );
}

export default Home;
```

33. Substituir o conteúdo do arquivo `src/pages/PlaceBet.js`:

```js
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";
import { formatDate } from '../utils/utils';

function PlaceBet() {

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center m-2">

                <MessageBanner type='info' content='Mensagem de aviso' />
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white">Para começar, digite seu e-mail</div>
                    <input onChange={e => { }} value='' className="flex-1 text-center p-2 rounded bg-blue-200 dark:bg-blue-900 dark:text-white max-w-full" type="text" />
                    <div className="m-1"></div>
                    <Button label='Pesquisar' action={() => { }} color='blue' />
                </div>
                <div className='m-2'></div>
                <MessageBanner type='error' content='Digite um e-mail válido' />
                <div>
                    <MessageBanner type='warning' content={`Já existe um palpite feito em ${formatDate('2023-02-10')}. Se quiser substituir, modifique os valores e pressione o botão no final`} />

                    <MessageBanner type='info' content='Nenhum palpite encontrado. Digite os dados a seguir e pressione o botão no final' />

                    <div className='m-2'></div>

                    <div className='flex flex-row flex-wrap justify-between max-w-lg'>
                        <FormInput id='gamblerName' label='Nome' value='' type='text' size='full' onChange={e => { }} />
                        <FormInput id='gamblerPhone' label='Telefone' value='' type='text' size='half' onChange={e => { }} />
                        <FormInput id='gamblerBirthDate' label='Data de nascimento' value='' type='date' size='half' onChange={e => { }} />
                        <FormInput id='betChampion' label='Campeão' type='text' size='half' value='' onChange={e => { }} />
                        <FormInput id='betRunnerUp' label='Vice-campeão' type='text' size='half' value='' onChange={e => { }} />
                    </div>

                    <div className="m-4"></div>

                    <div className="flex flex-col items-center">
                        <Button label='Substituir palpite' action={() => { }} color='green' />
                        <Button label='Gravar palpite' action={() => { }} color='green' />
                    </div>
                </div>
                <div className="m-2"></div>
            </div>
        </div >
    );
}

export default PlaceBet;
```

34. Substituir o conteúdo do arquivo `src/pages/ViewBets.js`:

```js
import { NavBar } from "../components/NavBar";
import { formatDate } from "../utils/utils";

function ViewBets() {
    const bets = [
        { 
            bet_id: '1',
            gambler_name: 'Fulano',
            champion: 'Campeão',
            runner_up: 'Vice',
            bet_date: '2023-02-10'
        },
        { 
            bet_id: '2',
            gambler_name: 'Fulano',
            champion: 'Campeão',
            runner_up: 'Vice',
            bet_date: '2023-02-10'
        },
        { 
            bet_id: '3',
            gambler_name: 'Fulano',
            champion: 'Campeão',
            runner_up: 'Vice',
            bet_date: '2023-02-10'
        },
        { 
            bet_id: '4',
            gambler_name: 'Fulano',
            champion: 'Campeão',
            runner_up: 'Vice',
            bet_date: '2023-02-10'
        }
    ];

    const betRows = bets.map(e => <tr key={e.bet_id} className="border-t border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800">
        <td className="text-center p-2">{e.gambler_name}</td>
        <td className="text-center p-2">{e.champion}</td>
        <td className="text-center p-2">{e.runner_up}</td>
        <td className="text-center p-2">{formatDate(e.bet_date)}</td>
    </tr>);

    let text = bets.length + ' palpites até o momento';
    if (bets.length === 0) {
        text = 'Nenhum palpite feito';
    }

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center w-full">
                <div className="flex flex-col items-center justify-center w-full sm:m-2 sm:max-w-lg">
                    <div className="p-2 dark:text-white my-2">{text}</div>

                    {bets.length > 0 &&
                        <table className="table-auto text-sm w-full bg-slate-200 dark:bg-slate-700 dark:text-white sm:rounded-xl overflow-hidden">
                            <thead>
                                <tr className="border-b-2 border-slate-300 dark:border-slate-500">
                                    <th className="text-center p-2">Palpiteiro</th>
                                    <th className="text-center p-2">Campeão</th>
                                    <th className="text-center p-2">Vice-campeão</th>
                                    <th className="text-center p-2">Data</th>
                                </tr>
                            </thead>
                            <tbody>{betRows}</tbody>
                        </table>}
                    <div className="m-2"></div>
                </div>
            </div>
        </div>
    );
}

export default ViewBets;
```

35. Agora vamos implementar a lógica das telas.
36. Modificar o arquivo `src/pages/PlaceBet.js`:

```diff
+import { useState } from 'react';

import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";
import { formatDate } from '../utils/utils';

function PlaceBet() {

+    const [gamblerEmail, setGamblerEmail] = useState('');
+    const [gamblerName, setGamblerName] = useState('');
+    const [gamblerPhone, setGamblerPhone] = useState('');
+    const [gamblerBirthDate, setGamblerBirthDate] = useState('');
+    const [betChampion, setBetChampion] = useState('');
+    const [betRunnerUp, setBetRunnerUp] = useState('');
+    const [invalidEmail, setInvalidEmail] = useState(false);
+    const [searchConcluded, setSearchConcluded] = useState(false);
+    const [message, setMessage] = useState('');
+    const [existingGambler, setExistingGambler] = useState(null);
+    const [existingBet, setExistingBet] = useState(null);

+    function resetForm() {
+        setGamblerEmail('');
+        setGamblerName('');
+        setGamblerPhone('');
+        setGamblerBirthDate('');
+        setBetChampion('');
+        setBetRunnerUp('');
+        setInvalidEmail(false);
+        setSearchConcluded(false);
+        setExistingGambler(null);
+        setExistingBet(null);
+    }

+    async function retrieveGamblerByEmail() {
+        if (gamblerEmail.trim().length === 0) {
+            setInvalidEmail(true);
+            setSearchConcluded(true);
+            return;
+        } else {
+            setInvalidEmail(false);
+            setSearchConcluded(true);
+            try {
+                const getGamblerResponse = await fetch('http://localhost:5000/gambler?email=' + gamblerEmail);
+                if (getGamblerResponse.status === 200) {
+                    const gambler = await getGamblerResponse.json();
+                    const getBetResponse = await fetch('http://localhost:5000/bet?gambler_id=' + gambler.id);
+                    if (getBetResponse.status === 200) {
+                        const bets = await getBetResponse.json();
+                        const bet = bets[0];
+                        setExistingGambler(gambler);
+                        setExistingBet(bet);
+                        setGamblerName(gambler.name);
+                        setGamblerPhone(gambler.phone);
+                        setGamblerBirthDate(gambler.birth_date);
+                        setBetChampion(bet.champion);
+                        setBetRunnerUp(bet.runner_up);
+                        return;
+                    }
+                }

+                setExistingGambler(null);
+                setExistingBet(null);
+                setGamblerName('');
+                setGamblerPhone('');
+                setGamblerBirthDate('');
+                setBetChampion('');
+                setBetRunnerUp('');
+            }
+            catch (err) {
+                console.log('Error: ' + err);
+            }
+        }
+    }

+    async function saveOrUpdateBet() {
+        const gamblerRequestBody = {
+            name: gamblerName,
+            email: gamblerEmail,
+            phone: gamblerPhone,
+            birth_date: gamblerBirthDate
+        };
+        const betRequestBody = {
+            champion: betChampion,
+            runner_up: betRunnerUp,
+            bet_date: new Date().toISOString().split('T')[0]
+        }
+        if (existingGambler !== null) {
+            gamblerRequestBody.id = existingGambler.id;
+        }
+        if (existingBet !== null) {
+            betRequestBody.id = existingBet.id;
+        }
+        const putGamblerResponse = await fetch('http://localhost:5000/gambler', {
+            headers: { 'Content-Type': 'application/json' },
+            method: 'PUT',
+            body: JSON.stringify(gamblerRequestBody),
+        });
+        if (putGamblerResponse.status === 200) {
+            const gambler = await putGamblerResponse.json();
+            betRequestBody.gambler_id = gambler.id;
+            const putBetResponse = await fetch('http://localhost:5000/bet', {
+                headers: { 'Content-Type': 'application/json' },
+                method: 'PUT',
+                body: JSON.stringify(betRequestBody),
+            });
+            if (putBetResponse.status === 200) {
+                resetForm();
+                setMessage('Seu palpite foi registrado');
+                return;
+            }
+        }
+        throw 'Error while saving/update bet/gambler. See server log for details.';
+    }

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center m-2">
+                {message &&
+                    <MessageBanner type='info' content={message} />
+                }
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white">Para começar, digite seu e-mail</div>
+                    <input onChange={e => setGamblerEmail(e.target.value)} value={gamblerEmail} className="flex-1 text-center p-2 rounded bg-blue-200 dark:bg-blue-900 dark:text-white max-w-full" type="text" />
                    <div className="m-1"></div>
+                    <Button label='Pesquisar' action={retrieveGamblerByEmail} color='blue' />
                </div>
                <div className='m-2'></div>
+                {searchConcluded && invalidEmail &&
                    <MessageBanner type='error' content='Digite um e-mail válido' />
+                }
+                {searchConcluded && !invalidEmail && <div>
+                    {existingGambler !== null &&
+                        <MessageBanner type='warning' content={`Já existe um palpite feito em ${formatDate(existingBet.bet_date)}. Se quiser substituir, modifique os valores e pressione o botão no final`} />
+                    }
+                    {existingGambler == null &&
                        <MessageBanner type='info' content='Nenhum palpite encontrado. Digite os dados a seguir e pressione o botão no final' />
+                    }

                    <div className='m-2'></div>

                    <div className='flex flex-row flex-wrap justify-between max-w-lg'>
+                        <FormInput id='gamblerName' label='Nome' value={gamblerName} type='text' size='full' onChange={e => setGamblerName(e.target.value)} />
+                        <FormInput id='gamblerPhone' label='Telefone' value={gamblerPhone} type='text' size='half' onChange={e => setGamblerPhone(e.target.value)} />
+                        <FormInput id='gamblerBirthDate' label='Data de nascimento' value={gamblerBirthDate} type='date' size='half' onChange={e => setGamblerBirthDate(e.target.value)} />
+                        <FormInput id='betChampion' label='Campeão' type='text' size='half' value={betChampion} onChange={e => setBetChampion(e.target.value)} />
+                        <FormInput id='betRunnerUp' label='Vice-campeão' type='text' size='half' value={betRunnerUp} onChange={e => setBetRunnerUp(e.target.value)} />
                    </div>

                    <div className="m-4"></div>

                    <div className="flex flex-col items-center">
+                        {existingGambler !== null && <Button label='Substituir palpite' action={saveOrUpdateBet} color='green' />}
+                        {existingGambler === null && <Button label='Gravar palpite' action={saveOrUpdateBet} color='green' />}
                    </div>
+                </div>}
                <div className="m-2"></div>
            </div>
        </div >
    );
}

export default PlaceBet;
```

37. Modificar o arquivo `src/pages/ViewBets.js`:

```diff
+import { useEffect, useState } from "react";

import { NavBar } from "../components/NavBar";
import { formatDate } from "../utils/utils";

function ViewBets() {
+    const [bets, setBets] = useState([]);
+    useEffect(() => {
+        async function fetchBets() {
+            const response = await fetch('http://localhost:5000/bet');
+            if (response.status === 200) {
+                setBets(await response.json());
+            }
+        }
+        fetchBets();
+    }, []);

    const betRows = bets.map(e => <tr key={e.bet_id} className="border-t border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800">
        <td className="text-center p-2">{e.gambler_name}</td>
        <td className="text-center p-2">{e.champion}</td>
        <td className="text-center p-2">{e.runner_up}</td>
        <td className="text-center p-2">{formatDate(e.bet_date)}</td>
    </tr>);

    let text = bets.length + ' palpites até o momento';
    if (bets.length === 0) {
        text = 'Nenhum palpite feito';
    }

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center w-full">
                <div className="flex flex-col items-center justify-center w-full sm:m-2 sm:max-w-lg">
                    <div className="p-2 dark:text-white my-2">{text}</div>

                    {bets.length > 0 &&
                        <table className="table-auto text-sm w-full bg-slate-200 dark:bg-slate-700 dark:text-white sm:rounded-xl overflow-hidden">
                            <thead>
                                <tr className="border-b-2 border-slate-300 dark:border-slate-500">
                                    <th className="text-center p-2">Palpiteiro</th>
                                    <th className="text-center p-2">Campeão</th>
                                    <th className="text-center p-2">Vice-campeão</th>
                                    <th className="text-center p-2">Data</th>
                                </tr>
                            </thead>
                            <tbody>{betRows}</tbody>
                        </table>}
                    <div className="m-2"></div>
                </div>
            </div>
        </div>
    );
}

export default ViewBets;
```

35. Pronto, agora é só testar.