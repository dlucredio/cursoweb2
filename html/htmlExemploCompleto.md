1. Criar uma pasta chamada `htmlExemplo` no seu computador
2. Acesse a pasta e execute o comando `npm init` (siga todas as opções padrão)
3. Execute o comando `npm install express`
4. Modifique o arquivo `package.json` para incluir o tipo correto de projeto node:

```diff
{
  "name": "htmlforms",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
5. Vamos criar uma função para facilitar o uso de SSE broadcast. Crie um arquivo chamado `broadcast.js`, com o seguinte conteúdo:

```js
export default async function broadcast(response, channel, eventBuilder, interval) {
    response.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    response.flushHeaders();

    response.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
        if (count == channel.length) {
            await new Promise(resolve => setTimeout(resolve, interval));
        } else {
            response.write(`data: ${eventBuilder(channel, count)}\n\n`);
            count++;
        }
    }
}
```

6. Crie um arquivo chamado `index.js` com o seguinte conteúdo:

```js
import express from 'express';
import broadcast from './broadcast.js';

const app = express();

const apostas = [];

app.use(express.static('public'));

app.get('/publish', async function (req, res) {
    const cidade = req.query.cidade;
    const campeao = req.query.campeao;
    const agora = new Date().toLocaleString();
    const novaAposta = `${agora}: nova aposta de ${cidade} em ${campeao}`;
    console.log(novaAposta);
    apostas.push(novaAposta);
    res.send('Sucesso: <a href="index.html">Voltar</a>');
});

app.get('/subscribeNovasApostas', async function (req, res) {
    broadcast(res, apostas, (channel, count) => channel[count], 3000);
});

app.get('/subscribeTotalApostas', async function (req, res) {
    broadcast(res, apostas, (channel, count) => channel.length, 3000);
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
```

7. Crie uma pasta chamada `public`.
8. Crie um arquivo, dentro da pasta `public`, chamado `dashboard.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bolão da Copa</title>
</head>

<body>
    <h1>Total de apostas: <span id="totalApostas"></span></h1>
    <div id="eventos"></div>

    <script>
        if (typeof (EventSource) !== "undefined") {
            var sourceTotalApostas = new EventSource("http://localhost:8080/BolaoDaCopaHTMLAPI/api/bolao/subscribeTotalApostas");
            var sourceNovasApostas = new EventSource("http://localhost:8080/BolaoDaCopaHTMLAPI/api/bolao/subscribeNovasApostas");
            sourceNovasApostas.onmessage = function (event) {
                document.getElementById("eventos").innerHTML += event.data + "<br>";
            };
            sourceTotalApostas.onmessage = function (event) {
                document.getElementById("totalApostas").innerHTML = event.data + "<br>";
            };
        } else {
            document.getElementById("eventos").innerHTML = "Sorry, your browser does not support server-sent events...";
        }
    </script>
</body>
</html>
```

9. Testar. Executar `node index.js` e abrir o navegador no endereço:

`http://localhost:3000/dashboard.html`

10. Abrir outra janela e fazer novas apostas:

`http://localhost:3000/publish?cidade=Sanca&campeao=Brasil`

11. Veja como as apostas aparecem no dashboard
12. Criar uma página dentro de `public` chamada `index.html`, com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Bolão da Copa</title>
</head>

<body>
    <p id="mensagem"></p>

    <form id="formBolao" method="GET" action="/publish">
        Digite seu nome:
        <input type="text" name="nome" />
        <br />

        Digite sua cidade:
        <input type="text" id="cidade" name="cidade" />
        <button type="button" onclick="buscarCidade()">Preencher automaticamente</button>
        <br />

        Digite o campeão:
        <input type="text" name="campeao" />
        <br />

        <button type="submit">Enviar</button>
        <br />

    </form>

    <script>
        var x = document.getElementById("mensagem");

        function buscarCidade() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(posicaoEncontrada, mostrarErro);
            } else {
                x.innerHTML = "Geolocalização não funciona neste navegador";
            }
        }

        function posicaoEncontrada(posicao) {
            var url = "http://nominatim.openstreetmap.org/reverse?lat=" + posicao.coords.latitude + "&lon=" + posicao.coords.longitude + "&format=json&json_callback=mostrarCidade";
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }

        function mostrarCidade(infoPosicao) {
            document.getElementById("cidade").value = infoPosicao.address.city;
        }

        function mostrarErro(erro) {
            switch (erro.code) {
                case erro.PERMISSION_DENIED:
                    x.innerHTML = "User negou a permissão para geolocalização."
                    break;
                case erro.POSITION_UNAVAILABLE:
                    x.innerHTML = "Informação de localização indisponível."
                    break;
                case erro.TIMEOUT:
                    x.innerHTML = "O tempo limite para a localização esgotou."
                    break;
                case erro.UNKNOWN_ERROR:
                    x.innerHTML = "Um erro desconhecido ocorreu."
                    break;
            }
        }
    </script>

</body>

</html>
```

13. Agora vamos salvar a última aposta no *local storage*, para o usuário saber se já apostou antes
14. Modificar o arquivo `index.html`:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Bolão da Copa</title>
</head>

<body>
    <p id="mensagem"></p>

    <form id="formBolao" method="GET" action="/publish">
        Digite seu nome:
        <input type="text" name="nome" />
        <br />

        Digite sua cidade:
        <input type="text" id="cidade" name="cidade" />
        <button type="button" onclick="buscarCidade()">Preencher automaticamente</button>
        <br />

        Digite o campeão:
        <input type="text" name="campeao" />
        <br />

+        <button type="button" onclick="enviarFormulario()">Enviar</button>
        <br />

    </form>

    <script>
        var x = document.getElementById("mensagem");
+        if (typeof (Storage) !== "undefined") {
+            x.innerHTML = localStorage.getItem("ultimaAposta");
+        }

+        function enviarFormulario() {
+            document.getElementById("formBolao").submit();
+            var d = new Date();
+            var lembrete = "Você já submeteu uma aposta em " + d;
+            if (typeof (Storage) !== "undefined") {
+                localStorage.setItem("ultimaAposta", lembrete);
+            }
+            x.innerHTML = "Obrigado pela aposta!";
+        }

        function buscarCidade() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(posicaoEncontrada, mostrarErro);
            } else {
                x.innerHTML = "Geolocalização não funciona neste navegador";
            }
        }

        function posicaoEncontrada(posicao) {
            var url = "http://nominatim.openstreetmap.org/reverse?lat=" + posicao.coords.latitude + "&lon=" + posicao.coords.longitude + "&format=json&json_callback=mostrarCidade";
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }

        function mostrarCidade(infoPosicao) {
            document.getElementById("cidade").value = infoPosicao.address.city;
        }

        function mostrarErro(erro) {
            switch (erro.code) {
                case erro.PERMISSION_DENIED:
                    x.innerHTML = "User negou a permissão para geolocalização."
                    break;
                case erro.POSITION_UNAVAILABLE:
                    x.innerHTML = "Informação de localização indisponível."
                    break;
                case erro.TIMEOUT:
                    x.innerHTML = "O tempo limite para a localização esgotou."
                    break;
                case erro.UNKNOWN_ERROR:
                    x.innerHTML = "Um erro desconhecido ocorreu."
                    break;
            }
        }
    </script>

</body>

</html>

```

15. Testar e observar que agora uma mensagem aparece mostrando a última aposta do usuário. Mas a página não proíbe que ele envie novamente
16. Agora vamos modificar a forma de fazer o palpite, usando *drag and drop*
17. Baixar as imagens das bandeiras dos países [aqui](./flags) e salvar na pasta `public/flags`
18. Modificar o arquivo `index.html`:

```diff
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Bolão da Copa</title>
</head>

<body>
    <p id="mensagem"></p>

    <form id="formBolao" method="GET" action="/publish">
        Digite seu nome:
        <input type="text" name="nome" />
        <br />

        Digite sua cidade:
        <input type="text" id="cidade" name="cidade" />
        <button type="button" onclick="buscarCidade()">Preencher automaticamente</button>
        <br />

+        Digite o campeão (ou arraste uma das bandeiras para cá):
+        <input type="text" name="campeao" ondrop="dropBandeira(event)" ondragover="allowDrop(event)" />
        <br />

+        <p>
+        <img id="brFlag" src="flags/Brazil-orb.png" alt="Brasil" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="caFlag" src="flags/Canada-orb.png" alt="Canadá" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="itFlag" src="flags/Italy-orb.png" alt="Itália" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="paFlag" src="flags/Paraguay-orb.png" alt="Paraguai" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="peFlag" src="flags/Peru-orb.png" alt="Peru" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="esFlag" src="flags/Spain-orb.png" alt="Espanha" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="suFlag" src="flags/Sweden-orb.png" alt="Suécia" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="siFlag" src="flags/Switzerland-orb.png" alt="Suíca" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="euFlag" src="flags/United-States-orb.png" alt="Estados Unidos" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        <img id="urFlag" src="flags/Uruguay-orb.png" alt="Uruguai" draggable="true" ondragstart="dragBandeira(event)" width="24" height="24" />
+        </p>
        <br />

        <button type="button" onclick="enviarFormulario()">Enviar</button>
        <br />

    </form>

    <script>
        var x = document.getElementById("mensagem");
+        var idChosenFlag = "undefined";
        if (typeof (Storage) !== "undefined") {
            x.innerHTML = localStorage.getItem("ultimaAposta");
        }

+        function allowDrop(ev) {
+            ev.preventDefault();
+        }

+        function dragBandeira(ev) {
+            ev.dataTransfer.setData("campeao", ev.target.alt);
+            ev.dataTransfer.setData("id", ev.target.id);
+        }

+        function dropBandeira(ev) {
+            ev.preventDefault();
+            if(idChosenFlag !== "undefined") {
+                document.getElementById(idChosenFlag).style.display = "inline-block";
+            }
+            var data = ev.dataTransfer.getData("campeao");
+            idChosenFlag = ev.dataTransfer.getData("id");
+            ev.target.value = data;
+            document.getElementById(idChosenFlag).style.display = "none";
+        }

        function enviarFormulario() {
            document.getElementById("formBolao").submit();
            var d = new Date();
            var lembrete = "Você já submeteu uma aposta em " + d;
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("ultimaAposta", lembrete);
            }
            x.innerHTML = "Obrigado pela aposta!";
        }

        function buscarCidade() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(posicaoEncontrada, mostrarErro);
            } else {
                x.innerHTML = "Geolocalização não funciona neste navegador";
            }
        }

        function posicaoEncontrada(posicao) {
            var url = "http://nominatim.openstreetmap.org/reverse?lat=" + posicao.coords.latitude + "&lon=" + posicao.coords.longitude + "&format=json&json_callback=mostrarCidade";
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }

        function mostrarCidade(infoPosicao) {
            document.getElementById("cidade").value = infoPosicao.address.city;
        }

        function mostrarErro(erro) {
            switch (erro.code) {
                case erro.PERMISSION_DENIED:
                    x.innerHTML = "User negou a permissão para geolocalização."
                    break;
                case erro.POSITION_UNAVAILABLE:
                    x.innerHTML = "Informação de localização indisponível."
                    break;
                case erro.TIMEOUT:
                    x.innerHTML = "O tempo limite para a localização esgotou."
                    break;
                case erro.UNKNOWN_ERROR:
                    x.innerHTML = "Um erro desconhecido ocorreu."
                    break;
            }
        }
    </script>
</body>
</html>
```

19. Vamos agora utilizar um *web worker* para melhorar a responsividade da interação
20. Modificar o arquivo `pagina.html` para simular um processamento pesado antes do envio do formulário (situações reais seriam criptografia no cliente, verificação de gramática, e outras ações que demandam processamento pesado):

```diff
        function enviarFormulario() {
+            for(var i=0;i<500000;i++) {
+                console.log("Calculando "+i);
+            }
            document.getElementById("formBolao").submit();
            var d = new Date();
            var lembrete = "Você já submeteu uma aposta em " + d;
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("ultimaAposta", lembrete);
            }
            x.innerHTML = "Obrigado pela aposta!";
        }
```
21. Testar e observar que a página fica congelada até o final do processamento
22. Criar o arquivo `cripto.js` dentro da pasta `public`:

```js
var chave = 0;

function criptografar() {
    for(i=0;i<5;i++) {
        chave = Math.floor((Math.random() * 1000000000) + 1);
        pausecomp(1000)
    }
    postMessage(chave);
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

criptografar();
```

23. Modificar o arquivo `index.html` para criar um *worker*:

```diff
+        var w = undefined;
        function enviarFormulario() {
+            x.innerHTML = "Aguarde, processando...";
+            if (typeof (Worker) !== "undefined") {
+                if (w == undefined) {
+                    w = new Worker("cripto.js");
+                    w.onmessage = function (event) {
+                        criptografiaConcluida(event.data);
+                    };
+                }
+            } else {
+                criptografiaConcluida(1);
+            }
        }

+        function criptografiaConcluida(chave) {
+            w.terminate();
+            w = undefined;
+            document.getElementById("formBolao").submit();
+            var d = new Date();
+            var lembrete = "Você já submeteu uma aposta em " + d;
+            if (typeof (Storage) !== "undefined") {
+                localStorage.setItem("ultimaAposta", lembrete);
+            }
+            x.innerHTML = "Obrigado pela aposta! Chave criptográfica = " + chave;
+        }
```