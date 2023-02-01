Essas instruções servem para instalar o [MySQL Community Server](https://dev.mysql.com/) no Microsoft Windows sem "sujar" o sistema, ou seja, sem um instalador automático que modificar registros, variáveis, etc. Caso queira um processo mais fácil, mas que pode deixar resquícios no sistema, procure pelos instaladores oficiais.

As instruções foram obtidas da [documentação oficial](https://dev.mysql.com/doc/refman/8.0/en/windows-install-archive.html). Caso encontre problemas, leia cuidadosamente essas instruções.

1. Baixe a versão ZIP do MySQL para Windows, da [página de downloads](https://dev.mysql.com/downloads/mysql/).
2. Descompacte o arquivo em algum diretório de sua escolha. Por exemplo: `C:\Users\dlucr\Programas\mysql-8.0.32-winx64`. Cuidado, pois pode ser que o arquivo descompactado contenha outro diretório dentro dele. Certifique-se de que este diretório tem as pastas do servidor (pasta `bin`, `docs`, `include`, etc)
3. Dentro dessa pasta, crie o arquivo `my.ini` com o seguinte conteúdo (substituindo os caminhos por sua opção de diretório):

```
[mysqld]
# set basedir to your installation path
basedir=C:/Users/dlucr/Programas/mysql-8.0.32-winx64
# set datadir to the location of your data directory
datadir=C:/Users/dlucr/Programas/mysql-8.0.32-winx64/data
```

4. Abra um terminal, navegue até a pasta criada, e execute o seguinte comando:

```
.\bin\mysqld --initialize --console
```

Esse comando irá gerar uma senha raiz. Uma mensagem parecida com a seguinte será exibida:

```
A temporary password is generated for root@localhost: uPpg_Aey:7kt
```

Anote a senha gerada, pois ela é necessária para os passos seguintes.

5. Agora execute o seguinte comando:

```
.\bin\mysqld --console
```

O servidor será iniciado. Pode ser que o Windows Firewall solicite permissão para que o MySQL acesse redes públicas ou privadas. Escolha a opção que preferir (para testes locais não é necessário conceder permissão) e siga em frente.

O terminal deverá permanecer aberto enquanto o servidor estiver rodando.

6. Abra outro terminal, navegue novamente até a pasta escolhida e execute o seguinte comando:

```
 ./bin/mysql -u root -p
```

Será exigida a senha criada anteriormente. Digite-a ou cole-a aqui e siga em frente.

7. No console interativo, entre o seguinte comando:

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'senhadificil';
```

No lugar de `senhadificil` escolha uma senha pessoal. Anote-a.

8. Saia do console com o comando: `exit`

9. Agora o server está rodando. Para interrompê-lo, execute o seguinte comando:

```
.\bin\mysqladmin -u root shutdown -p
```

Digite a senha e aguarde a interrupção do server.

10. Você pode criar scripts para inicializar/encerrar o servidor facilmente pela linha de comando (será necessário especificar a senha após rodar alguns desses comandos):

- `startMySQL.ps1`:

```
C:\Users\dlucr\Programas\mysql-8.0.32-winx64\bin\mysqld --console
```

- `stopMySQL.ps1`:

```
C:\Users\dlucr\Programas\mysql-8.0.32-winx64\bin\mysqladmin -u root shutdown -p
```

- `connectMySQL.ps1`:

```
C:\Users\dlucr\Programas\mysql-8.0.32-winx64\bin\mysql -u root -p
```