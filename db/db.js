const mysql = require('mysql');
const { pedido, produto } = require('../classBack-end')


function criarConexao(){
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '25@wnj',
            database: 'db_pizza'
        });
        return connection;
    } catch (error) {
        console.log(error);
        return null;
    }
}



async function consulta(sql, connection){
    return new Promise(async function(resolve, reject) {
        await connection.query(sql, function(err, results, op){
            try {
                if(err) throw err;
                return resolve(results);
            } catch(error){
                reject(error);
            }     
        });    
    })
}

function getPedidos(connection){
    const sqlPedido = 'select ordem_pedido.id, cliente.nome, ordem_pedido.dataPedido, ordem_pedido.done ' +
                  'from  cliente ' +
                  'inner join ordem_pedido on ordem_pedido.fk_cliente = cliente.id;';
    return consulta(sqlPedido, connection);
}

function getPedidosByDate(connection, data1, data2){
    const sqlPedido = 'select ordem_pedido.id, cliente.nome, ordem_pedido.dataPedido, ordem_pedido.done ' +
    'from  cliente ' +
    'inner join ordem_pedido on ordem_pedido.fk_cliente = cliente.id ' +
    `where ordem_pedido.dataPedido < '${data2}' and ordem_pedido.dataPedido > '${data1}'`;
    //console.log(sqlPedido);
    return consulta(sqlPedido, connection);
}

function getProduto(connection, n){
    const selProduto = 'select itemProduto.keyPedido, tipo, nome, preço ' +
                        'from produto ' +
                        'inner join itemProduto on keyproduto = produto.id ' +
                        'where keyPedido = ' + n;
    return consulta(selProduto, connection);
    
}

async function getDataHome(){
    let listaPedido = [];
    
    connec = criarConexao();
    if(connec){
        const promisePedido = getPedidos(connec);
    
        await promisePedido.then(function(valor) {
            for (const x of valor) {
                let tmp = new pedido(x.id, x.nome, x.dataPedido, x.done, [], []);
                let produtos = getProduto(connec, tmp.id);
                produtos.then((pro) => {
                    for (const x of pro) {
                        if(x.tipo === 'pizza'){
                            tmp.pizzas.push( new produto(x.nome, x['preço']) );
                        }else{
                            tmp.bebidas.push( new produto(x.nome, x['preço']) );
                        }
                    }
                })
                listaPedido.push(tmp);
            }
        });
        connec.end();
        //console.log(listaPedido[0]);

        return new Promise((resolve,reject) => {
        resolve(listaPedido);
        reject('erro: algo de errado ocorreu com a promise')
        });
    }else{
        return new error('falha ao se conectar com o banco de dados');
    }
}

async function getDataHomeByDate(data1, data2){
    let listaPedido = [];
    
    connec = criarConexao();
    if(connec){
        const promisePedido = getPedidosByDate(connec, data1, data2);
    
        await promisePedido.then(function(valor) {
            for (const x of valor) {
                let tmp = new pedido(x.id, x.nome, x.dataPedido, x.done, [], []);
                let produtos = getProduto(connec, tmp.id);
                produtos.then((pro) => {
                    for (const x of pro) {
                        if(x.tipo === 'pizza'){
                            tmp.pizzas.push( new produto(x.nome, x['preço']) );
                        }else{
                            tmp.bebidas.push( new produto(x.nome, x['preço']) );
                        }
                    }
                })
                listaPedido.push(tmp);
            }
        });
        connec.end();
        //console.log(listaPedido[0]);

        return new Promise((resolve,reject) => {
        resolve(listaPedido);
        reject('erro: algo de errado ocorreu com a promise')
        });
    }else{
        return new error('falha ao se conectar com o banco de dados');
    }
}

function setDone(id, status){
    const con = criarConexao();
    let sql = 'update ordem_pedido ';
    if(status === 'nao'){
        sql += 'set done = 1 where id = ' + id;
    }else{
        sql += 'set done = 0 where id = ' + id;
    }
    const proDone = consulta(sql, con);
    proDone.then((results) => {
        console.log(results.affectedRows);
        con.end();
    })
    .catch((error) => { 
        console.log(error);
        con.end();
    })
}

function deletePedido(id){
    const con = criarConexao();
    sql1 = 'delete from itemProduto  where keyPedido = ' + id;
    sql2 = 'delete from ordem_pedido where id = ' + id;

    const pro1 = consulta(sql1, con);
    const pro2 = consulta(sql2, con);

    pro1.then((res) => {
        if(res.affectedRows !== 0){
            pro2.then((res) => {
                if(res.affectedRows !== 0){
                    con.end();
                    console.log('item ' + id + ' removido com sucesso');
                }
            })
        }else
            con.end();
        
    })
    .catch((erro) => {
        console.log(erro);
    })
}


function getProdutos(){
    const con = criarConexao();
    sql = 'select nome from produto';
    const produtos = consulta(sql, con);
    let ListaProdutos = [];

    produtos.then((results) => {
        for (const pro of results) {
            ListaProdutos.push(pro.nome);
        }
        //console.log(ListaProdutos);
        con.end();
    })
    .catch((erro) => {
        console.log(erro);
        con.end();
    })

    return new Promise((resolve, reject) => {
        resolve(ListaProdutos);
        reject('erro');
    });
}



function getCliente(){
    const con = criarConexao();
    sql = 'select nome from cliente';
    const produtos = consulta(sql, con);
    let ListaClientes = [];

    produtos.then((results) => {
        for (const cli of results) {
            ListaClientes.push(cli.nome);
        }
        //console.log(ListaClientes);
        con.end();
    })
    .catch((erro) => {
        console.log(erro);
        con.end();
    })

    return new Promise((resolve, reject) => {
        resolve(ListaClientes);
        reject('erro');
    });
}



module.exports = { 
    getDataHomeByDate,
    getDataHome, 
    setDone, 
    deletePedido, 
    getProdutos, 
    getCliente, 
    criarConexao, 
    consulta 
};



    


