1. Instalar node.js (https://nodejs.org/)
    1.1. Instalar uma extensão para React (ex: React Developer Tools by Facebook para Chrome)
2. Abrir o terminal, criar uma pasta e executar o seguinte comando:

```sh
npx create-react-app alo-mundo-react

cd alo-mundo-react
npm start
```

3. Será exibida uma janela do browser com a página criada
4. Abrir o arquivo `src/App.js` e modificar seu conteúdo para incluir um estado e alguns componentes. Primeiro veremos no estilo orientado a objetos.

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

5. Testar
6. Incluir eventos de alteração do estado. Modificar o código:

```diff
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      texto: 'Alo mundo',
    }
  }

+  handleTextChanged(e) {
+    this.setState({ texto: e.target.value });
+    console.log('handleTextChanged:' + this.state.texto);
+  }

+  handleButtonClick() {
+    this.setState({ texto: 'Alo mundo' });
+    console.log('handleButtonClick:' + this.state.texto);
+  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{this.state.texto}</h1>
          <p>Digite o texto:</p>
+          <input type="text" onChange={(e) => this.handleTextChanged(e)}/>
+          <button onClick={() => this.handleButtonClick()}>Restaurar</button>
        </header>
      </div>
    );
  }
}

export default App;
```

7. Testar e mostrar (usando o console.log) que o novo estado não é imediatamente visível
8. Adicionar uma chamada assíncrona e testar novamente

```jsx
  handleTextChanged(e) {
    this.setState({ texto: e.target.value }, () => {
      console.log('handleTextChanged:' + this.state.texto);
    });
  }

  handleButtonClick() {
    this.setState({ texto: 'Alo mundo' }, () => {
      console.log('handleButtonClick:' + this.state.texto);
    });
  }
```

9. Agora vamos criar componentes
10. Criar novo arquivo `src/Painel.js`

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

11. Modificar o arquivo App.js para incluir o painel

```diff
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
+import Painel from './Painel';

class App extends Component {
  constructor() {
    super();
    this.state = {
      texto: 'Alo mundo',
    }
  }

  handleTextChanged(e) {
    this.setState({ texto: e.target.value }, () => {
      console.log('handleTextChanged:' + this.state.texto);
    });
  }

  handleButtonClick() {
    this.setState({ texto: 'Alo mundo' }, () => {
      console.log('handleButtonClick:' + this.state.texto);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{this.state.texto}</h1>
          <p>Digite o texto:</p>
          <input type="text" onChange={(e) => this.handleTextChanged(e)} />
          <button onClick={() => this.handleButtonClick()}>Restaurar</button>
+          <Painel texto={this.state.texto}/>
        </header>
      </div>
    );
  }
}

export default App;
```

12. Testar
13. Agora vamos adicionar elementos à lista dinamicamente
14. Modificar o arquivo `App.js` para conter o estado da aplicação

```diff
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Painel from './Painel';

class App extends Component {
  constructor() {
    super();
+    this.state = {
+      nome: '',
+      cor: '',
+      lista: [
+        { nome: 'vermelho', valor: 'red' },
+        { nome: 'preto', valor: 'black' },
+        { nome: 'verde', valor: 'green' },
+        { nome: 'azul', valor: 'blue' },
+      ]
+    }
  }

  handleTextChanged(e) {
+    const n = e.target.name;
+    const v = e.target.value;
+    this.setState({
+      [n]: v,
+    });
  }

  handleButtonClick() {
+    const listaNova = this.state.lista.slice();
+    listaNova.push( { nome: this.state.nome, valor: this.state.cor });
+    this.setState( {
+      lista: listaNova
+    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
+          <h1>Lista de cores</h1>
          <p>Digite o texto:</p>
+          <input type="text" name="nome" onChange={(e) => this.handleTextChanged(e)} />
+          <input type="text" name="cor" onChange={(e) => this.handleTextChanged(e)} />
+          <button onClick={() => this.handleButtonClick()}>Adicionar</button>
+          <Painel lista={this.state.lista} />
        </header>
      </div>
    );
  }
}

export default App;
```

15. Modificar o arquivo Painel.js para receber a lista via propriedades

```diff
import React from 'react';

class Painel extends React.Component {
-    constructor() { ... }
    render() {
+        const listaDeCores = this.props.lista.map(e => <li key={e.nome} style={{color: e.valor}}>{e.nome}</li>)

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

16. Testar e ver que agora o estado é mantido em um único local. Abrir o console do navegador para ver a mensagem de erro. Notar que não é recomendável haver dois componentes com a mesma chave (particularidade do React)
17. Agora vamos modificar o estado do pai a partir de um componente filho
18. Modificar o arquivo `Painel.js` para incluir um botão para remover elementos da lista, com evento vinculado a um prop

```diff
import React from 'react';

class Painel extends React.Component {
    render() {
        const listaDeCores = this.props.lista.map(e =>
            <li key={e.nome} style={{ color: e.valor }}>
                {e.nome}
+                <button onClick={() => this.props.removerElemento(e.nome)}>Remover</button>
            </li>
        )

        return (
            <div>
                <h2>Painel</h2>
                <ul style={{ textAlign: 'left' }}>
                    {listaDeCores}
                </ul>
            </div>

        );
    }
}

export default Painel;
```

19. Modificar o arquivo App.js para tratar o evento gerado no filho

```diff
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Painel from './Painel';

class App extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      cor: '',
      lista: [
        { nome: 'vermelho', valor: 'red' },
        { nome: 'preto', valor: 'black' },
        { nome: 'verde', valor: 'green' },
        { nome: 'azul', valor: 'blue' },
      ]
    }
  }

  handleTextChanged(e) {
    const n = e.target.name;
    const v = e.target.value;
    this.setState({
      [n]: v,
    });
  }

  handleButtonClick() {
    const listaNova = this.state.lista.slice();
    listaNova.push({ nome: this.state.nome, valor: this.state.cor });
    this.setState({
      lista: listaNova
    });
  }

+  removerElemento(nome) {
+    const listaNova = [];
+    for (let i = 0; i < this.state.lista.length; i++) {
+      if (this.state.lista[i].nome !== nome) {
+        listaNova.push(this.state.lista[i]);
+      }
+    }
+    this.setState({
+      lista: listaNova
+    });
+  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Lista de cores</h1>
          <p className="App-intro">Digite o texto a seguir:</p>
          <input type="text" name="nome" onChange={(e) => this.handleTextChanged(e)} />
          <input type="text" name="cor" onChange={(e) => this.handleTextChanged(e)} />
          <button onClick={() => this.handleButtonClick()}>Adicionar</button>
+          <Painel lista={this.state.lista} removerElemento={(nome) => this.removerElemento(nome)} />
        </header>
      </div>
    );
  }
}

export default App;
```

20. Testar
21. Agora vamos validar a entrada, para proibir elementos repetidos
22. Modificar o arquivo `App.js` para incluir a validação

```diff
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Painel from './Painel';

class App extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      cor: '',
      lista: [
        { nome: 'vermelho', valor: 'red' },
        { nome: 'preto', valor: 'black' },
        { nome: 'verde', valor: 'green' },
        { nome: 'azul', valor: 'blue' },
      ],
+      botaoDesabilitado: true,
    }
  }

+  existeNome(nome) {
+    for (let i = 0; i < this.state.lista.length; i++) {
+      if (this.state.lista[i].nome === nome) {
+        return true;
+      }
+    }
+    return false;
+  }

  handleTextChanged(e) {
    const n = e.target.name;
    const v = e.target.value;

    this.setState({
      [n]: v,
+    }, () => this.validar());
  }

+  validar() {
+    const b = this.state.nome.length === 0 || this.existeNome(this.state.nome);
+    this.setState( {
+      botaoDesabilitado: b,
+    });
+  }

  handleButtonClick() {
    const listaNova = this.state.lista.slice();
    listaNova.push({ nome: this.state.nome, valor: this.state.cor });
    this.setState({
      lista: listaNova
+    }, () => this.validar());
  }

  removerElemento(nome) {
    const listaNova = [];
    for (let i = 0; i < this.state.lista.length; i++) {
      if (this.state.lista[i].nome !== nome) {
        listaNova.push(this.state.lista[i]);
      }
    }
    this.setState({
      lista: listaNova
+    }, () => this.validar());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Lista de cores</h1>
          <p className="App-intro">Digite o texto a seguir:</p>
+          <input type="text" name="nome" value={this.state.nome} onChange={(e) => this.handleTextChanged(e)} />
+          <input type="text" name="cor" value={this.state.cor} onChange={(e) => this.handleTextChanged(e)} />
+          <button onClick={() => this.handleButtonClick()} disabled={this.state.botaoDesabilitado}>Adicionar</button>
          <Painel lista={this.state.lista} removerElemento={(nome) => this.removerElemento(nome)} />
        </header>
      </div>
    );
  }
}

export default App;
```

23. Testar
24. Adicionar uma mensagem que é exibida condicionalmente

```diff
        <button onClick={() => this.handleButtonClick()} disabled={this.state.botaoDesabilitado}>Adicionar</button>
+        {this.state.botaoDesabilitado &&
+          (<p style={{color:'red'}}>Erro!</p>)
+        }
        <Painel lista={this.state.lista} removerElemento={(nome) => this.removerElemento(nome)} />
```

25. Testar
26. Essa solução não está muito boa. Além da duplicação de código (chamada para `validar()` repetidas vezes), estamos criando uma variável de estado desnecessária (`botaoDesabilitado`). Mas vamos deixar para corrigir isso em um próximo exemplo!
