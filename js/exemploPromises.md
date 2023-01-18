Este exemplo serve para ilustrar como funcionam as `Promises` em JavaScript.

1. Crie uma pasta chamada `exemplo-promises`
2. Execute o comando `npm init`
3. Crie um arquivo `main.js`

Primeiro vamos criar um exemplo de função simples. Adicione o seguinte conteúdo ao `main.js`:

```js
function pauseExecution(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function getWordDefinition(word) {
    pauseExecution(2000);
    return 'nothing';
}

const x = 'hello';
console.log('Wait...');
const y = getWordDefinition(x);
console.log(x + ' means: ' + y);
```

4. Execute com o comando `node main.js`
5. Como existe uma demora (neste caso é uma demora forçada), é comum o uso de _callbacks_:

```diff
function pauseExecution(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

+function getWordDefinition(word, cbSuccess) {
    pauseExecution(2000);
+    cbSuccess('nothing');
}

const x = 'hello';
console.log('Wait...');
+getWordDefinition(x, y => {
+    console.log(x + ' means: ' + y);
+});
```

6. Em casos simples como esse, tudo bem. Mas e quando começam a aparecer detalhes como a necessidade de encadear chamadas demoradas ou a necessidade de tratamento de erros? Por exemplo:

```js
function pauseExecution(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}

// getWordDefinition agora retorna um objeto, e não uma string simples
// Também pode gerar um erro em alguns casos
function getWordDefinition(word) {
    pauseExecution(2000);
    if (word === 'hello') {
        throw 'Cannot define "hello"'
    }
    let definition = 'nothing';
    if (word === 'hi') {
        definition = 'something';
    }
    return { 
        'word': word,
        'meaning': definition
    };
}

// Esta função é agora necessária para extrair o significado do objeto
// gerado por getWordDefinition
function getDataFromDefinition(definition) {
    pauseExecution(2000);
    if (definition.meaning === 'nothing') {
        throw 'Cannot get data from nothing';
    }
    return definition.meaning;

}

const x = 'hi';
// const x = 'hello'; // Causa erro em getWordDefinition
// const x = 'smartphone'; // Causa erro em getDataFromDefinition
console.log('Wait...');
try {
    // Agora, o resultado de getWordDefinition tem que passar por
    // getDataFromDefinition antes de poder ser utilizado
    const y = getWordDefinition(x);
    const data = getDataFromDefinition(y);
    // Agora sim, podemos usar o resultado
    console.log(x + ' means: ' + data);
} catch (e) {
    console.log('Error: ' + e);
}
```

7. Na versão sem callbacks, tudo certo. Mas ao converter essa solução para _callbacks_, teremos a _callback pyramid of doom_. Veja no exemplo a seguir, como o encadeamento é ruim em termos de legibilidade de código, além de causar a duplicação no tratamento de erros, que neste caso deveria ser uniforme para os dois tipos de erro:

```js
function pauseExecution(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}

function getWordDefinition(word, cbSuccess, cbError) {
    pauseExecution(2000);
    if (word === 'hello') {
        cbError('Cannot define "hello"')
        return; // Necessário para interromper a execução em caso de erro
    }
    let definition = 'nothing';
    if (word === 'hi') {
        definition = 'something';
    }
    cbSuccess({
        'word': word,
        'meaning': definition
    });
}

function getDataFromDefinition(definition, cbSuccess, cbError) {
    pauseExecution(2000);
    if (definition.meaning === 'nothing') {
        cbError('Cannot get data from nothing');
        return; // Necessário para interromper a execução em caso de erro
    }
    cbSuccess(definition.meaning);

}

const x = 'hi';
// const x = 'hello'; // Causa erro em getWordDefinition
// const x = 'smartphone'; // Causa erro em getDataFromDefinition
console.log('Wait...');

// Behold... the "callback pyramid of doom"!!!!
getWordDefinition(x,
    definition => {
        getDataFromDefinition(definition,
            data => {
                console.log(x + ' means: ' + data);
            },
            errorGetData => {
                console.log('Error: ' + errorGetData); // Duplicata do código abaixo
            })
    },
    errorDefinition => {
        console.log('Error: ' + errorDefinition); // Duplicata do código acima
    }
);
```

8. Foi para isso que surgiram as `Promises`. Vamos começar retornando ao exemplo inicial, modificando-o para utilizar uma `Promise`. O código original era esse:

```js
function pauseExecution(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function getWordDefinition(word, cbSuccess) {
    pauseExecution(2000);
    cbSuccess('nothing');
}

const x = 'hello';
console.log('Wait...');
getWordDefinition(x, y => {
    console.log(x + ' means: ' + y);
});
```

9. Modificando para utilizar `Promises`:

```diff
function pauseExecution(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

+function getWordDefinition(word) {
+    return new Promise((resolve) => {
        pauseExecution(2000);
+        resolve('nothing');    
    });
}

const x = 'hello';
console.log('Wait...');
+// O segredo está na chamada "then", que redireciona corretamente o resultado
+// para um callback de acordo com o resultado, mas também permite o encadeamento
+// e tratamento de erros
+getWordDefinition(x).then(y => {
    console.log(x + ' means: ' + y);
});
```

9. Até aqui, vemos pouca vantagem. Mas vejamos como as `Promises` ajudam a derrubar a _callback pyramid of doom_:

```js
function pauseExecution(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}

function getWordDefinition(word) {
    return new Promise((resolve, reject) => {
        pauseExecution(2000);
        if (word === 'hello') {
            reject('Cannot define "hello"');
            return; // Ainda precisa interromper a execução para prevenir código sem sentido
        }
        let definition = 'nothing';
        if (word === 'hi') {
            definition = 'something';
        }
        resolve({
            'word': word,
            'meaning': definition
        });
    });
}

function getDataFromDefinition(definition) {
    return new Promise((resolve, reject) => {
        pauseExecution(2000);
        if (definition.meaning === 'nothing') {
            reject('Cannot get data from nothing');
            return; // Ainda precisa interromper a execução para prevenir código sem sentido
        }
        resolve(definition.meaning);
    });
}

const x = 'hi';
// const x = 'hello'; // Causa erro em getWordDefinition
// const x = 'smartphone'; // Causa erro em getDataFromDefinition
console.log('Wait...');

// Derrubamos a pirâmide!
getWordDefinition(x)
    .then(definition => getDataFromDefinition(definition))
    .then(data => console.log(x + ' means: ' + data))
    .catch(error => console.log('Error: ' + error));
```

10. Importante:
* Sempre retornar um valor entre um callback e outro, para poder encadear as promessas, caso contrário haverá uma promessa "flutuando"
* É possível encadear ações depois de um `catch`, apesar de não ser algo comum

11. Nota-se que o código ficou muito parecido com código síncrono. Tanto é que surgiu o padrão async/await:

```diff
function pauseExecution(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}

function getWordDefinition(word) {
    return new Promise((resolve, reject) => {
        pauseExecution(2000);
        if (word === 'hello') {
            reject('Cannot define "hello"');
            return;
        }
        let definition = 'nothing';
        if (word === 'hi') {
            definition = 'something';
        }
        resolve({
            'word': word,
            'meaning': definition
        });
    });
}

function getDataFromDefinition(definition) {
    return new Promise((resolve, reject) => {
        pauseExecution(2000);
        if (definition.meaning === 'nothing') {
            reject('Cannot get data from nothing');
            return;
        }
        resolve(definition.meaning);
    });
}

+// Precisamos encapsular tudo em uma função, pois
+// "await" só funciona em um contexto "async"
+async function execute() {
    const x = 'hi';
    // const x = 'hello'; // Causa erro em getWordDefinition
    // const x = 'smartphone'; // Causa erro em getDataFromDefinition
    console.log('Wait...');

+    // Agora com estilo síncrono de programação
+    // Parece síncrono mas é assíncrono e todo baseado em Promises
+    try {
+        const definition = await getWordDefinition(x);
+        const data = await getDataFromDefinition(definition);
+        console.log(x + ' means: ' + data);
+    } catch (error) {
+        console.log('Error: ' + error);
+    }
}

+// Basta chamar a função
+execute();
```