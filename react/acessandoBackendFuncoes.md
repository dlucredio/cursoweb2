1. Abrir o [exemplo anterior](./acessandoBackendClasses.md) e recriar o back-end (não se esqueça de habilitar CORS).
2. Abrir o [exemplo anterior usando funções](./exemploIntrodutorioFuncoes.md). O código original era assim:

- `src/App.js`:

```jsx
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

    function removerElemento(nome) {
        setLista(lista.filter(x => x.nome !== nome));
    }

    const botaoDesabilitado = nome.length === 0 || lista.find(x => x.nome === nome);

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

- `src/Painel.js`:

```jsx
function Painel({ lista, removerElemento }) {
    const listaDeCores = lista.map(e => 
        <li key={e.nome} style={{ color: e.valor }}>
            {e.nome}
            <button onClick={() => removerElemento(e.nome)}>Remover</button>
        </li>)
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

3. Modificar o código de `src/App.js` para sempre buscar a lista do back-end (pode criar uma cópia do arquivo caso não queira perder o conteúdo original)

```diff
+import { useState, useEffect } from 'react';
import './App.css';
import Painel from './Painel';

function App() {
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
+    const [lista, setLista] = useState([]);

+    useEffect(() => {
+        buscarListaDeCores();
+    }, []); // To run this effect only once (first render)

+    async function buscarListaDeCores() {
+        try {
+            const response = await fetch('http://localhost:5000/cor')
+            atualizarListaDeCoresAposFetch(response);
+        } catch (e) {
+            console.log(e);
+        }
+    }

+    async function adicionarCor(cor) {
+        try {
+            const response = await fetch('http://localhost:5000/cor', {
+                headers: { 'Content-Type': 'application/json' },
+                method: 'PUT',
+                body: JSON.stringify(cor),
+            });
+            atualizarListaDeCoresAposFetch(response);
+        } catch (e) {
+            console.log(e);
+        }
+    }

+    async function removerCor(nome) {
+        try {
+            const response = await fetch('http://localhost:5000/cor/' + nome, {
+                method: 'DELETE'
+            });
+            atualizarListaDeCoresAposFetch(response);
+        } catch (e) {
+            console.log(e);
+        }
+    }

+    async function atualizarListaDeCoresAposFetch(response) {
+        var contentType = response.headers.get("content-type");
+        if (contentType && contentType.includes("application/json")) {
+            const listaDeCoresJson = await response.json();
+            setLista(listaDeCoresJson);
+        }
+    }

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
+        adicionarCor({ nome: nome, valor: cor });
    }

    function removerElemento(nome) {
+        removerCor(nome);
    }

    const botaoDesabilitado = nome.length === 0 || lista.find(x => x.nome === nome);

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

4. Para exportar a aplicação junto com o back-end, removendo CORS, basta seguir os mesmos passos finais do [exemplo anterior](./acessandoBackendClasses.md).

