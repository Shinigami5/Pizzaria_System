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
*/

module.exports = { getAllCliente, addClient };