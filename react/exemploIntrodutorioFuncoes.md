Aqui vamos refazer os mesmos exemplos [feitos anteriormente, com classes](./exemploIntrodutorioClasses.md), porém usando funções e hooks.

1. Instalar node.js (https://nodejs.org/)
    1.1. Instalar uma extensão para React (ex: React Developer Tools by Facebook para Chrome)
2. Abrir o terminal, criar uma pasta e executar o seguinte comando:

```sh
npx create-react-app alo-mundo-react-func
cd alo-mundo-react-func
npm start
```

3. Será exibida uma janela do browser com a página criada
4. Abrir o arquivo `src/App.js` e modificar seu conteúdo para incluir um estado e alguns componentes. O código orientado a objetos era assim:

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      texto : 'Alo mundo',
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{this.state.texto}</h1>
          <p>Digite o texto:</p>
          <input type="text" />
        </header>
      </div>
    );
  }
}

export default App;
```

5. Modificar para ficar assim:

```diff
-import React, { Component } from 'react';
+import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

-class App extends Component {
-  constructor() {
-    super();
-    this.state = {
-      texto : 'Alo mundo',
-    }
-  }
-  render() {
+function App() {
+    const [texto, setTexto] = useState('Alo mundo');
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
-                <h1>{this.state.texto}</h1>
+                <h1>{texto}</h1>
                <p>Digite o texto:</p>
                <input type="text" />
            </header>
        </div>
    );
-  }
}

export default App;
```

6. Incluir eventos de alteração do estado. Modificar o código:

```diff
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [texto, setTexto] = useState('Alo mundo');

+    function handleTextChanged(e) {
+        setTexto(e.target.value);
+        console.log('handleTextChanged:' + texto);
+    }

+    function handleButtonClick() {
+        setTexto('Alo mundo');
+        console.log('handleButtonClick:' + texto);
+    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>{texto}</h1>
                <p>Digite o texto:</p>
+                <input type="text" onChange={handleTextChanged} />
+                <button onClick={handleButtonClick}>Restaurar</button>
            </header>
        </div>
    );
}

export default App;
```

7. Testar e mostrar (usando o console.log) que o novo estado não é imediatamente visível
8. Se por acaso você precisar usar o valor do novo estado imediatamente, é possível usar um `useEffect`. Porém, isso [raramente é necessário](https://beta.reactjs.org/learn/you-might-not-need-an-effect#chains-of-computations). Neste caso, por exemplo, podemos obter o novo valor simplesmente olhando para a variável que foi utilizada para alterar o estado:

```jsx
    function handleTextChanged(e) {
        const newValue = e.target.value;
        setTexto(newValue);
        console.log('handleTextChanged:' + newValue);
    }

    function handleButtonClick() {
        const newValue = 'Alo mundo';
        setTexto(newValue);
        console.log('handleButtonClick:' + newValue);
    }
```

9. Agora vamos criar componentes
10. Criar novo arquivo `src/Painel.js`. Orientado a objetos, era assim:

```jsx
import React from 'react';

class Painel extends React.Component {
    constructor() {
        super();
        this.state = {
            lista: [
                { nome: 'vermelho', valor: 'red' },
                { nome: 'preto', valor: 'black' },
                { nome: 'verde', valor: 'green' },
                { nome: 'azul', valor: 'blue' },
            ]
        };
    }

    render() {
        const listaDeCores = this.state.lista.map(e => <li key={e.nome} style={{color: e.valor}}>{e.nome} - {this.props.texto}</li>)

        return (
            <div>
                <h2>Painel</h2>
                <ul style={{textAlign: 'left'}}>
                    {listaDeCores}
                </ul>
            </div>

        );
    }
}

export default Painel;
```

11. Agora, utilizando funções, ficará assim:

```diff
-import React from 'react';
+import { useState } from 'react';

-class Painel extends React.Component {
-    constructor() {
-        super();
-        this.state = {
-            lista: [
-                { nome: 'vermelho', valor: 'red' },
-                { nome: 'preto', valor: 'black' },
-                { nome: 'verde', valor: 'green' },
-                { nome: 'azul', valor: 'blue' },
-            ]
-        };
-    }
+function Painel({texto}) {
+    const [lista, setLista] = useState([
+        { nome: 'vermelho', valor: 'red' },
+        { nome: 'preto', valor: 'black' },
+        { nome: 'verde', valor: 'green' },
+        { nome: 'azul', valor: 'blue' },
+    ]);

-    render() {
-        const listaDeCores = this.state.lista.map(e => <li key={e.nome} style={{color: e.valor}}>{e.nome} - {this.props.texto}</li>)
+    const listaDeCores = lista.map(e => <li key={e.nome} style={{ color: e.valor }}>{e.nome} - {texto}</li>)

        return (
            <div>
                <h2>Painel</h2>
                <ul style={{textAlign: 'left'}}>
                    {listaDeCores}
                </ul>
            </div>

        );
-    }
}

export default Painel;
```

12. Modificar o arquivo App.js para incluir o painel

```diff
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
+import Painel from './Painel';

function App() {
    const [texto, setTexto] = useState('Alo mundo');

    function handleTextChanged(e) {
        const newValue = e.target.value;
        setTexto(newValue);
        console.log('handleTextChanged:' + newValue);
    }

    function handleButtonClick() {
        const newValue = 'Alo mundo';
        setTexto(newValue);
        console.log('handleButtonClick:' + newValue);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>{texto}</h1>
                <p>Digite o texto:</p>
                <input type="text" onChange={handleTextChanged} />
                <button onClick={handleButtonClick}>Restaurar</button>
+                <Painel texto={texto} />
            </header>
        </div>
    );
}

export default App;
```

13. Testar
14. Agora vamos adicionar elementos à lista dinamicamente
15. Modificar o arquivo `App.js` para conter o estado da aplicação

```diff
import { useState } from 'react';
-import logo from './logo.svg';
import './App.css';
import Painel from './Painel';

function App() {
-    const [texto, setTexto] = useState('Alo mundo');
+    const [nome, setNome] = useState('');
+    const [cor, setCor] = useState('');
+    const [lista, setLista] = useState([
+        { nome: 'vermelho', valor: 'red' },
+        { nome: 'preto', valor: 'black' },
+        { nome: 'verde', valor: 'green' },
+        { nome: 'azul', valor: 'blue' },
+    ]);

    function handleTextChanged(e) {
-        const newValue = e.target.value;
-        setTexto(newValue);
-        console.log('handleTextChanged:' + newValue);
+        const n = e.target.name;
+        const v = e.target.value;
+        if (n === 'nome') {
+            setNome(v);
+        } else if (n === 'cor') {
+            setCor(v);
+        }
    }

    function handleButtonClick() {
-        const newValue = 'Alo mundo';
-        setTexto(newValue);
-        console.log('handleButtonClick:' + newValue);
+        const listaNova = lista.slice();
+        listaNova.push({ nome: nome, valor: cor });
+        setLista(listaNova);
+//        Ou pode ser feito da forma a seguir
+//        setLista([...lista, { nome: nome, valor: cor }]);
+//        Só não pode ser feito assim:
+//        lista.push({ nome: nome, valor: cor });

    }

    return (
        <div className="App">
            <header className="App-header">
-                <img src={logo} className="App-logo" alt="logo" />
-                <h1>{texto}</h1>
+                <h1>Lista de cores</h1>
                <p>Digite o texto:</p>
-                <input type="text" onChange={handleTextChanged} />
+                <input type="text" name="nome" onChange={handleTextChanged} />
+                <input type="text" name="cor" onChange={handleTextChanged} />
-                <button onClick={handleButtonClick}>Restaurar</button>
+                <button onClick={handleButtonClick}>Adicionar</button>
-                <Painel texto={texto} />
+                <Painel lista={lista} />
            </header>
        </div>
    );
}

export default App;
```

16. Modificar o arquivo Painel.js para receber a lista via propriedades

```diff
-import { useState } from 'react';

-function Painel({texto}) {
+function Painel({lista}) {
-    const [lista, setLista] = useState([
-        { nome: 'vermelho', valor: 'red' },
-        { nome: 'preto', valor: 'black' },
-        { nome: 'verde', valor: 'green' },
-        { nome: 'azul', valor: 'blue' },
-    ]);

-    const listaDeCores = lista.map(e => <li key={e.nome} style={{ color: e.valor }}>{e.nome} - {texto}</li>)
+    const listaDeCores = lista.map(e => <li key={e.nome} style={{ color: e.valor }}>{e.nome}</li>)
    return (
        <div>
            <h2>Painel</h2>
            <ul style={{ textAlign: 'left' }}>
                {listaDeCores}
            </ul>
        </div>

    );
}

export default Painel;
```

17. Testar e ver que agora o estado é mantido em um único local. Abrir o console do navegador para ver a mensagem de erro. Notar que não é recomendável haver dois componentes com a mesma chave (particularidade do React)
18. Agora vamos modificar o estado do pai a partir de um componente filho
19. Modificar o arquivo `Painel.js` para incluir um botão para remover elementos da lista, com evento vinculado a um prop

```diff
import { useState } from 'react';

+function Painel({ lista, removerElemento }) {
+    const listaDeCores = lista.map(e => 
+        <li key={e.nome} style={{ color: e.valor }}>
+            {e.nome}
+            <button onClick={() => removerElemento(e.nome)}>Remover</button>
+        </li>)
    return (
        <div>
            <h2>Painel</h2>
            <ul style={{ textAlign: 'left' }}>
                {listaDeCores}
            </ul>
        </div>

    );
}

export default Painel;
```

20. Modificar o arquivo App.js para tratar o evento gerado no filho

```diff
import { useState } from 'react';
import './App.css';
import Painel from './Painel';

function App() {
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
    const [lista, setLista] = useState([
        { nome: 'vermelho', valor: 'red' },
        { nome: 'preto', valor: 'black' },
        { nome: 'verde', valor: 'green' },
        { nome: 'azul', valor: 'blue' },
    ]);

    function handleTextChanged(e) {
        const n = e.target.name;
        const v = e.target.value;
        if (n === 'nome') {
            setNome(v);
        } else if (n === 'cor') {
            setCor(v);
        }
    }

    function handleButtonClick() {
        setLista([...lista, { nome: nome, valor: cor }]);
    }

+    function removerElemento(nome) {
+        const listaNova = [];
+        for (let i = 0; i < lista.length; i++) {
+            if (lista[i].nome !== nome) {
+                listaNova.push(lista[i]);
+            }
+        }
+        setLista(listaNova);
+        // Ou pude remover assim:
+        // setLista(lista.filter(x => x.nome !== nome));
+    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Lista de cores</h1>
                <p>Digite o texto:</p>
                <input type="text" name="nome" onChange={handleTextChanged} />
                <input type="text" name="cor" onChange={handleTextChanged} />
                <button onClick={handleButtonClick}>Adicionar</button>
+                <Painel lista={lista} removerElemento={removerElemento} />
            </header>
        </div>
    );
}

export default App;
```

21. Testar
22. Agora vamos validar a entrada, para proibir elementos repetidos
23. Modificar o arquivo `App.js` para incluir a validação. Vamos usar um _effect_:

```diff
+import { useState, useEffect } from 'react';
import './App.css';
import Painel from './Painel';

function App() {
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
    const [lista, setLista] = useState([
        { nome: 'vermelho', valor: 'red' },
        { nome: 'preto', valor: 'black' },
        { nome: 'verde', valor: 'green' },
        { nome: 'azul', valor: 'blue' },
    ]);
+    const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);

+    useEffect(() => {
+        setBotaoDesabilitado(nome.length === 0 || lista.find(x => x.nome === nome));
+    }, [nome, lista]);

    function handleTextChanged(e) {
        const n = e.target.name;
        const v = e.target.value;
        if (n === 'nome') {
            setNome(v);
        } else if (n === 'cor') {
            setCor(v);
        }
    }

    function handleButtonClick() {
        setLista([...lista, { nome: nome, valor: cor }]);
    }

    function removerElemento(nome) {
        setLista(lista.filter(x => x.nome !== nome));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Lista de cores</h1>
                <p>Digite o texto:</p>
                <input type="text" name="nome" onChange={handleTextChanged} />
                <input type="text" name="cor" onChange={handleTextChanged} />
+                <button onClick={handleButtonClick} disabled={botaoDesabilitado}>Adicionar</button>
                <Painel lista={lista} removerElemento={removerElemento} />
            </header>
        </div>
    );
}

export default App;
```

24. Testar
25. A solução acima funciona, porém [segundo a documentação oficial do React](https://beta.reactjs.org/learn/you-might-not-need-an-effect), ela não é recomendada. Segundo sugerido: _If you can calculate something during render, you don’t need an Effect_. Neste caso, temos uma variável de estado desnecessária (`botaoDesabilitado`) e um efeito desnecessário. Vamos tentar corrigir?

```diff
+import { useState } from 'react';
import './App.css';
import Painel from './Painel';

function App() {
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
    const [lista, setLista] = useState([
        { nome: 'vermelho', valor: 'red' },
        { nome: 'preto', valor: 'black' },
        { nome: 'verde', valor: 'green' },
        { nome: 'azul', valor: 'blue' },
    ]);
-    const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);

-    useEffect(() => {
-        setBotaoDesabilitado(nome.length === 0 || lista.find(x => x.nome === nome));
-    }, [nome, lista]);

    function handleTextChanged(e) {
        const n = e.target.name;
        const v = e.target.value;
        if (n === 'nome') {
            setNome(v);
        } else if (n === 'cor') {
            setCor(v);
        }
    }

    function handleButtonClick() {
        setLista([...lista, { nome: nome, valor: cor }]);
    }

    function removerElemento(nome) {
        setLista(lista.filter(x => x.nome !== nome));
    }

+    const botaoDesabilitado = nome.length === 0 || lista.find(x => x.nome === nome);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Lista de cores</h1>
                <p>Digite o texto:</p>
                <input type="text" name="nome" onChange={handleTextChanged} />
                <input type="text" name="cor" onChange={handleTextChanged} />
                <button onClick={handleButtonClick} disabled={botaoDesabilitado}>Adicionar</button>
                <Painel lista={lista} removerElemento={removerElemento} />
            </header>
        </div>
    );
}

export default App;
```

26. Fim