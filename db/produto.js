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
    console.log(`new product with id ${productPromise.insertId} was add`);
    db.end();
}

const removeProduto = async (id) => {
    const sql = `select keyproduto from itemProduto where keyproduto = ${id};`;
    const db = criarConexao();
    let resultado = { meg: '', sucess: false };

    const p = consulta(sql, db);

    await p.then(results => {
        if(results.length === 0){
            console.log('product '+id+' was removed');
            consulta(`delete from produto where id = ${id};`, db);
            resultado.meg = `produto ${id} removido com sucesso`;
            resultado.sucess = true;
        }else{
            //console.log('todos os pedido com esse produto devem ser deletados para excluir esse produto');
            resultado.meg = "todos os pedido com esse produto devem ser deletados para excluir esse produto";
        }
    })

    db.end()
    return new Promise((resolve, reject) => {
        resolve(resultado);
        reject('erro');
    })
}

const updateProduct = async (id, name, type, price) => {
    if(!id){
        return new Promise((resolve) => {
            resolve({ meg: 'id esta como undefined', sucess: false });
        });
    }
    const sql = `update produto set tipo = '${type}', nome = '${name}', preço = '${price}' where id = ${id};`;
    const db = criarConexao();
    let resultado = { meg: '', sucess: false };

    const ud = consulta(sql, db);

    await ud.then(res => {
        console.log('product '+id+' was update');
        resultado.meg = `item ${id} atualizado`;
        resultado.sucess = true;
    }).catch(erro => {
        console.log(erro);
        resultado.meg = `ocoreu um erro ao atualizar item`;
        resultado.sucess = false;
    })
    db.end();

    return new Promise((resolve) => {
        resolve(resultado);
    })

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

module.exports = { getAllProduto, addProduto, removeProduto, updateProduct };