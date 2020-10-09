const { promiseImpl } = require('ejs');
const { consulta, criarConexao } = require('./db'); 


const getAllCliente = async () => {
    const db = criarConexao();
    const sql = 'select * from cliente';

    const clientesPromise = await consulta(sql,db);
    db.end();

    return clientesPromise;
}

const addClient = async (nome, tele) => {
    const db = criarConexao();
    const sql = `insert into cliente(nome, tele) value ('${nome}', '${tele}')`;

    const addPromise = await consulta(sql, db);
    db.end();
}

const removeClient = async (id) => {
    const sql = `select fk_cliente from ordem_pedido where fk_cliente = ${id}`;
    const db = criarConexao();
    let resultado = { meg: '', sucess: false };

    const client = consulta(sql, db);

    await client.then(res => {
        if(res.length === 0){
            //console.log(`delete from cliente where = ${id}`);
            consulta(`delete from cliente where id = ${id}`, db);
            resultado.meg = `cliente ${id} removido com sucesso`;
            resultado.sucess = true;
        }else{
            resultado.meg = 'todos os pedido com esse cliente devem ser deletados para excluir esse cliente';
        }
    })
    db.end();

    return new Promise((resolve) => {
        resolve(resultado);
    })
}

const updateClient = async (nome, tele, id) => {
    if(id){
        const sql = `update cliente set nome = '${nome}', tele = '${tele}' where id = ${id};`;
        const db = criarConexao();
        let resultado = { meg: '', sucess: false };

        const promese = consulta(sql, db);

        await promese.then(results => {
            //console.log(results);
            console.log('client ' +id+' was updated');
            resultado.meg = `cliente ${id} atualizado`;
            resultado.sucess = true;
        }).catch(erro => {
            console.log(erro);
            resultado.meg = `ocoreu um erro ao atualizar cliente`;
            resultado.sucess = false;
        })
        db.end();

        return new Promise(resolve => {
            resolve(resultado);
        })
    }else{
        return new Promise(resolve => {
            resolve({ meg: 'id esta como undefined', sucess: false });
        })
    }
}


/*
const dado = getAllCliente();
dado.then(res => {
    //console.log(res);
    for (const item of res) {
        console.log('id: ', item.id);
        console.log('nome: ', item.nome);
        console.log('tele', item.tele);
        console.log();
    }
    
})
const tmp = removeClient(7);
tmp.then(r => {
    if(r.sucess){
        console.log('meg:', r.meg);
    }else{
        console.log('erro:', r.meg);
    }

})
*/


module.exports = { getAllCliente, addClient, removeClient, updateClient };