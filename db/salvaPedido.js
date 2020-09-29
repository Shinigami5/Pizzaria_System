const { criarConexao, consulta } = require("./db");



function getIdFromProduto(nome, connec){
    const sql = `select id from produto where nome = "${nome}" `;
    //console.log(sql);
    const promise = consulta(sql, connec);

    promise.then((res) => {
        //console.log(res[0].id);
        id = res[0].id;
    })
    .catch((erro) => {
        console.log('deu erro');
        console.log(erro);
    })

    return promise;
}

function getIDfromClient(nome, connec){
    const sql = `select id from cliente where nome = "${nome}" `;
    //console.log(sql);
    const promise = consulta(sql, connec);
    let id;

    promise.then((res) => {
        //console.log(res[0].id);
        id = res[0].id;
        //console.log('id: ', id);
    })
    .catch((erro) => {
        console.log('deu erro');
        console.log(erro);
    })

    return promise;
}


async function inserePedido(obj, connec){
    const data = obj.data;
    let done = obj.done === 'nao' ? 1 : 0;
    const promise = getIDfromClient(obj.cliente, connec);
    const retorno = { id: null};

    await promise.then((res) => {
        const sql = `insert into ordem_pedido(dataPedido, fk_cliente, done) value ('${data}', ${res[0].id}, ${done});`;
        //console.log(sql);
        const tmp = consulta(sql, connec); //
        tmp.then((r) => {
            //console.log('ok: ', r);
            retorno.id = r.insertId;
        }).catch((erro) => {
            console.log(erro);
        })
        return new Promise((results, reject) => {
            results(retorno);
            reject('erro');
        })
    })
    .catch((erro) => {
        console.log(erro);
    })

    return new Promise((results, reject) => {
        results(retorno);
        reject('erro');
    })
}


async function insereItemDePedido(Pedido, produtos, connec){
    for (let i = 0; i < produtos.length; i++) {            
        const ProId = getIdFromProduto(produtos[i], connec);
        await ProId.then(async (idProduto) => {
            const sql2 = `insert into itemProduto(keyproduto, keyPedido) value (${idProduto[0].id}, ${Pedido.id})`
            const fazNada = consulta(sql2, connec);
            fazNada.then().catch((erro) => {
                console.log(erro);
            })
        })
    }
    connec.end();
}

function salvaPedido(pedido){
    const con = criarConexao();
    const p1 = inserePedido(pedido, con);
    
    setTimeout(() => {
        p1.then((id) => {
            //console.log('line 292: ', id);
            insereItemDePedido(id, pedido.produto, con);
            con.end();
        }).catch((erro) => { 
            console.log(erro);
            con.end();
        });
    }, 100);
    //con.end();
}

module.exports = { salvaPedido };

