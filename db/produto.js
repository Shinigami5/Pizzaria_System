const { consulta, criarConexao } = require('./db'); 


const getAllProduto = async () => {
    const db = criarConexao();
    const sql = 'select * from produto';

    const clientesPromise = await consulta(sql,db);
    db.end();

    return clientesPromise;
}

const addProduto = async (nome, tipo, price) => {
    const db = criarConexao();
    const sql = `insert into produto(nome, tipo, preço) value ('${nome}', '${tipo}', '${price}');`;

    const productPromise = await consulta(sql, db);
    db.end();
}

/*
const dado = getAllProduto();
dado.then(res => {
    //console.log(res);
    for (const item of res) {
        console.log('id: ', item.id);
        console.log('nome: ', item.nome);
        console.log('preço', item['preço']);
        console.log();
    }
})
*/

module.exports = { getAllProduto, addProduto };