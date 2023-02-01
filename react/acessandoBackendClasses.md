1. Instalar node.js (https://nodejs.org/)
2. Abrir o terminal, criar uma pasta chamada `backend-cores`
3. Executar o comando `npm init`
4. Modificar o arquivo `package.json`:

```diff
{
  "name": "backend-cores",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```
4. Executar o comando `npm install express cors`
5. Criar o arquivo `src/app.js`:

```js
import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const listaDeCores = {};

function getListaDeCores() {
    return Object.keys(listaDeCores).map((key) => { 
        return { nome: key, valor: listaDeCores[key]};
    })
}

app.get('/cor', (req,res) => {
    return res.json(getListaDeCores());
});

app.put('/cor', (req, res) => {
    const data = req.body;
    listaDeCores[data.nome] = data.valor;
    return res.json(getListaDeCores());
});

app.delete('/cor/:nome', (req, res) => {
    const nome = req.params.nome;
    if(!listaDeCores[nome]) {
        res.status(404).send('Cor '+nome+' não existe');
    } else {
        delete listaDeCores[nome];
        return res.json(getListaDeCores());
    }
});

app.listen(5000, () => {
    console.log('Escutando na porta 5000');
});
```

6. Para testar, executar `node src/app.js` e enviar algumas requisições:

```
GET http://localhost:5000/cor

###

PUT http://localhost:5000/cor
Content-Type: application/json

{
    "nome": "vermelho",
    "valor": "#FF0000"
}

###

PUT http://localhost:5000/cor
Content-Type: application/json

{
    "nome": "verde",
    "valor": "#00FF00"
}

###

PUT http://localhost:5000/cor
Content-Type: application/json

{
    "nome": "azul",
    "valor": "#0000FF"
}

###

PUT http://localhost:5000/cor
Content-Type: application/json

{
    "nome": "amarelo",
    "valor": "yellow"
}

###
DELETE http://localhost:5000/cor/vermelho

###
DELETE http://localhost:5000/cor/verde

###
DELETE http://localhost:5000/cor/azul
```

7. Abrir o exemplo da [demonstração anterior](./exemploIntrodutorioClasses.md)
8. Modificar o código de `src/app.js` para sempre buscar a lista do back-end (pode criar uma cópia do arquivo caso não queira perder o conteúdo original)

```diff
import React, { Component } from 'react';
-import logo from './logo.svg';
import './App.css';
import Painel from './Painel';

class App extends Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            cor: '',
+            lista: [],
            botaoDesabilitado: true,
        }
    }

+    componentDidMount() {
+        this.buscarListaDeCores();
+    }

+    async buscarListaDeCores() {
+        try {
+            const response = await fetch('http://localhost:5000/cor')
+            this.atualizarListaDeCoresAposFetch(response);
+        } catch (e) {
+            console.log(e);
+        }
+    }

+    async adicionarCor(cor) {
+        try {
+            const response = await fetch('http://localhost:5000/cor', {
+                headers: { 'Content-Type': 'application/json' },
+                method: 'PUT',
+                body: JSON.stringify(cor),
+            })
+            this.atualizarListaDeCoresAposFetch(response);
+        } catch (e) {
+            console.log(e);
+        }
+    }

+    async removerCor(nome) {
+        try {
+            const response = await fetch('http://localhost:5000/cor/' + nome, {
+                method: 'DELETE'
+            })
+            this.atualizarListaDeCoresAposFetch(response);
+        } catch (e) {
+            console.log(e);
+        }
+    }

+    async atualizarListaDeCoresAposFetch(response) {
+        var contentType = response.headers.get("content-type");
+        if (contentType && contentType.includes("application/json")) {
+            const listaDeCoresJson = await response.json();
+            this.setState({
+                lista: listaDeCoresJson
+            }, () => this.validar());
+        }
+    }


    existeNome(nome) {
        for (let i = 0; i < this.state.lista.length; i++) {
            if (this.state.lista[i].nome === nome) {
                return true;
            }
        }
        return false;
    }

    handleTextChanged(e) {
        const n = e.target.name;
        const v = e.target.value;
        this.setState({
            [n]: v,
        }, () => this.validar());
    }

    validar() {
        const b = this.state.nome.length === 0 || this.existeNome(this.state.nome);
        this.setState({
            botaoDesabilitado: b,
        });
    }

    handleButtonClick() {
+        this.adicionarCor({ nome: this.state.nome, valor: this.state.cor });
    }

    removerElemento(nome) {
+        this.removerCor(nome);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
-                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Lista de cores</h1>
                    <p>Digite o texto:</p>
                    <input type="text" name="nome" value={this.state.nome} onChange={(e) => this.handleTextChanged(e)} />
                    <input type="text" name="cor" value={this.state.cor} onChange={(e) => this.handleTextChanged(e)} />
                    <button onClick={() => this.handleButtonClick()} disabled={this.state.botaoDesabilitado}>Adicionar</button>
                    {this.state.botaoDesabilitado &&
                        (<p style={{ color: 'red' }}>Erro!</p>)
                    }
                    <Painel lista={this.state.lista} removerElemento={(nome) => this.removerElemento(nome)} />
                </header>
            </div>
        );
    }
}

export default App;
```

9. Testar (abrir em duas janelas do navegador para mostrar que o estado se mantém)
10. Agora vamos gerar uma versão de produção. Cancelar a execução do dev-server, e executar o seguinte comando, na mesma pasta do projeto React:

`npm run build`

11. Será gerada uma pasta `build`. Copiar seu conteúdo para dentro de uma pasta `public` do projeto do back-end (sem incluir a pasta `build`)
12. Modificar o arquivo `src/app.js` do projeto do back-end (desabilitar CORS e utilizar a pasta `public` como hospedagem de arquivos estáticos, no caso o app React):

```diff
import express from 'express';
-import cors from 'cors';
const app = express();

-app.use(cors());
+app.use(express.static('public'));
app.use(express.json());

const listaDeCores = {};

function getListaDeCores() {
    return Object.keys(listaDeCores).map((key) => { 
        return { nome: key, valor: listaDeCores[key]};
    })
}

app.get('/cor', (req,res) => {
    return res.json(getListaDeCores());
});

app.put('/cor', (req, res) => {
    const data = req.body;
    listaDeCores[data.nome] = data.valor;
    return res.json(getListaDeCores());
});

app.delete('/cor/:nome', (req, res) => {
    const nome = req.params.nome;
    if(!listaDeCores[nome]) {
        res.status(404).send('Cor '+nome+' não existe');
    } else {
        delete listaDeCores[nome];
        return res.json(getListaDeCores());
    }
});

app.listen(5000, () => {
    console.log('Escutando na porta 5000');
});
```

13. Fim

