1. Abrir o [exemplo anterior](./acessandoBackendFuncoes.md)
2. Vamos criar um context/reducer. Crie um arquivo novo:

- `src/CoresContext.jsx`:

```jsx
import { createContext, useReducer } from 'react';

export const CoresContext = createContext(null);
export const CoresDispatchContext = createContext(null);

export function CoresProvider({ children }) {
    const [cores, dispatch] = useReducer(coresReducer, []);

    return (
        <CoresContext.Provider value={cores}>
            <CoresDispatchContext.Provider value={dispatch}>
                {children}
            </CoresDispatchContext.Provider>
        </CoresContext.Provider>
    );
}

function coresReducer(cores, action) {
    switch (action.type) {
        case 'atualizar': { // Só precisamos de uma action, pois acontece tudo no back-end
            return action.novaLista;
        }
        default: {
            throw Error("Action não existe: " + action.type);
        }
    }
}
```

3. Agora vamos migrar a lógica de acesso ao back-end para um arquivo separado. Veja como, agora, cada função cuida exclusivamente do acesso ao back-end, sem acessar nada referente ao estado mantido pelo React

- `src/AcessoAPI.jsx`

```jsx
export async function buscarListaDeCores() {
    try {
        const response = await fetch('http://localhost:5000/cor')
        return response.json();
    } catch (e) {
        console.log(e);
    }
}

export async function adicionarCor(cor) {
    try {
        const response = await fetch('http://localhost:5000/cor', {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(cor),
        });
        return response.json();
    } catch (e) {
        console.log(e);
    }
}

export async function removerCor(nome) {
    try {
        const response = await fetch('http://localhost:5000/cor/' + nome, {
            method: 'DELETE'
        });
        return response.json();
    } catch (e) {
        console.log(e);
    }
}
```

4. Vamos começar modificando o arquivo principal para criar o contexto:

- `src/main.jsx`

```diff
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
+import { CoresProvider } from './CoresContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
+    <CoresProvider>
      <App />
+    </CoresProvider>
  </StrictMode>,
)
```

5. Podemos agora modificar o Painel para acessar o contexto, ao invés das props:

- `src/Painel.jsx`:

```diff
+import { useContext } from 'react';
+import { CoresContext, CoresDispatchContext } from './CoresContext';
+import { removerCor } from './AcessoAPI';

-function Painel({ lista, removerElemento }) {
+function Painel() {
+    const lista = useContext(CoresContext);
+    const dispatchCores = useContext(CoresDispatchContext);

+    async function handleButtonClick(nome) {
+        const listaDeCores = await removerCor(nome);
+        dispatchCores({
+            type: 'atualizar',
+            novaLista: listaDeCores,
+        });
+    }

    const listaDeCores = lista.map(e =>
        <li key={e.nome} style={{ color: e.valor }}>
            {e.nome}
-            <button onClick={() => removerElemento(e.nome)}>Remover</button>
+            <button onClick={() => handleButtonClick(e.nome)}>Remover</button>
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

6. Agora vamos modificar o arquivo principal:

- `src/App.jsx`

```diff
-import { useState, useEffect } from 'react';
+import { useState, useEffect, useContext } from 'react';
import './App.css';
import Painel from './Painel';
+import { CoresContext, CoresDispatchContext } from './CoresContext';
+import { buscarListaDeCores, adicionarCor } from './AcessoAPI';

function App() {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
-  const [lista, setLista] = useState([]);
+  const dispatchCores = useContext(CoresDispatchContext);
+  const lista = useContext(CoresContext);

  useEffect(() => {
-    buscarListaDeCores();
+    async function executar() {
+      const listaDeCores = await buscarListaDeCores();
+      dispatchCores({
+        type: 'atualizar',
+        novaLista: listaDeCores,
+      });
+    }
+    executar(); // Veja como agora é necessário criar uma função async, pois precisamos rodar isso dentro de um arrow function
  }, []);

-    async function buscarListaDeCores() {
-        try {
-            const response = await fetch('http://localhost:5000/cor')
-            atualizarListaDeCoresAposFetch(response);
-        } catch (e) {
-            console.log(e);
-        }
-    }

-    async function adicionarCor(cor) {
-        try {
-            const response = await fetch('http://localhost:5000/cor', {
-                headers: { 'Content-Type': 'application/json' },
-                method: 'PUT',
-                body: JSON.stringify(cor),
-            });
-            atualizarListaDeCoresAposFetch(response);
-        } catch (e) {
-            console.log(e);
-        }
-    }

-    async function removerCor(nome) {
-        try {
-            const response = await fetch('http://localhost:5000/cor/' + nome, {
-                method: 'DELETE'
-            });
-            atualizarListaDeCoresAposFetch(response);
-        } catch (e) {
-            console.log(e);
-        }
-    }

-    async function atualizarListaDeCoresAposFetch(response) {
-        var contentType = response.headers.get("content-type");
-        if (contentType && contentType.includes("application/json")) {
-            const listaDeCoresJson = await response.json();
-            setLista(listaDeCoresJson);
-        }
-    }  

  function handleTextChanged(e) {
    const n = e.target.name;
    const v = e.target.value;
    if (n === 'nome') {
      setNome(v);
    } else if (n === 'cor') {
      setCor(v);
    }
  }

-  function handleButtonClick(e) {
-    adicionarCor({ nome: nome, valor: cor });
+  async function handleButtonClick(e) {
+    const listaDeCores = await adicionarCor({ nome: nome, valor: cor });
+    dispatchCores({
+      type: 'atualizar',
+      novaLista: listaDeCores,
+    });
  }

-  function removerElemento(nome) {
-    removerCor(nome);
-  }

  const botaoDesabilitado = nome.length === 0 || lista.find(x => x.nome === nome);

  return (
    <div className="App">
       <header className="App-header">
          <h1>Lista de cores</h1>
          <p>Digite o texto:</p>
          <input type="text" name="nome" onChange={handleTextChanged} />
          <input type="text" name="cor" onChange={handleTextChanged} />
          <button onClick={handleButtonClick} disabled={botaoDesabilitado}>Adicionar</button>
-          <Painel lista={lista} removerElemento={removerElemento} />
+          <Painel />
        </header>
      </div>
    );
}

export default App;
```

7. Pronto. Agora o estado da aplicação e as ações são acessadas via contexto, facilitando a criação de hierarquias mais complexas