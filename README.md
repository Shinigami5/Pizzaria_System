# Pizzaria_System

Pizzaria System é um sistema simples de cadastro de ordem de pedido para pizzarias, embora possa ser utilizado para outros fins, sua interface é feita para ser exibido no browser

O sistema permite o cadastro e edição de ordem de pedido, clientes e produtos, abaixo estão as paginas do sistema

- “/Home”: é a pagina principal, nela é exibido todos os pedidos cadastrados no sistema, acima dos pedidos existe um link do lado esquerdo que leva para outra pagina para adicionar um novo pedido e ao lado direito ser tem um botão para exibir apenas os pedidos entre duas datas.

- “/cliente”: nela  é exibido todos os cliente do sistema, neles se tem a opção de edita e excluir, ao clica no botão edita a pagina mudara, exibido os campos para preencher e um botão chamado “atualizar”, ao se clica no botão excluir o cliente será excluído do sistema se não existir pedidos com o seu nome caso contrário uma mensagem informado que a ação não pode ser feita apareça.

- “/produtos”: nela é a mesma coisa na pagina cliente mas com produtos, além disso em cima dos produtos, ter um botão para adicionar novo produto, ao ser clicado os campos para preencher junto com o botão enviar apareceram, na pagina cliente também tem isso.

- “/addPedido”: é nessa pagina onde se preencher os dados para novos pedido, além dos campos normais ser tem um que não é um campo mas funcionar como um, nele tem uma lista de produtos a seres adicionado, depois de escolher um, ter que clicar no botão “add” para o produto ser adicionado, o botão “remove” retira o ultimo produto da lista, ao preencher todos os campos é só clicar em enviar para enviar o novo pedido para o servidor.

##  o código
antes de baixar é nesseario ter o node.js e MySQL instalado, depois disso é necessário criar um novo db com as tabelas SQL do sistema(essas tabelas estão em FilesSQL) 

- para roda o código, primeiro baixe o repositório e execute o comando  “node install” no console para baixar a pasta ‘node_modules’ e as dependências do projeto(express, drive mysql, ejs).

- depois crie o arquivo ‘database.json’ com as informações do banco de dados, que são host, user, senha, datebase, esse arquivo é utilizado para inicializar a conexão entre o drive do MySQL e o server.

- depois no banco de dados do MySQL utilizado, use o comando “SET SQL_SAFE_UPDATES = 0;” esse comando desativara o modo seguro de updates pois algumas ações de exclusão de itens, não funcionaram se ele estiver ativado

- e por fim a versão atual do MySQL 8.0(caso seu MySQL não seja 8.0 ou superior ignore essa última etapa) utilizar uma criptografia x entre as conexões db/app mas o drive do MySQL disponível no NPM não(ele utilizar a antiga), para garantir a conexões é necessário desativa a atual criptografia e utilizar a antiga.

- quando eu descobri isso eu utilizei um comando para desativa a altual criptografia mas não me lembro ao certo qual foi, acredito  que foi esse “flush privileges;” pois ele estava no arquivo SQL de teste, mas não tenho certeza, caso não queria arisca rode o código do jeito que esta que ira dar uma mensagem de erro, jogue-a nos Overflow da vidas que acredito que vão informá-lo como resolver. 
