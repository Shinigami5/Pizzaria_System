const { getProdutos, getCliente, deletePedido } = require('../db/db');
const { salvaPedido } = require('../db/salvaPedido');

exports.get = (req, res) => {
    const promise = getProdutos();
    const cliente = getCliente();

    setTimeout(() => {
        promise.then((result) => {
            cliente.then((result2) => {
                res.render('addPedido', { produtos: result, clientes: result2 });
            })
            .catch((erro) => {
                console.log(erro);
            })
        })
        .catch((erro) => {
            console.log(erro);
            res.render('addPedido', { result: null, clientes: null });
        });
    }, 100);
}

exports.post = (req, res) => {
    //console.log(req.body);
    if(req.body.produto.length === 0){
        res.redirect('./home');
    }else{
        salvaPedido(req.body);
        res.redirect('./home');
    }
}

exports.delete = (req, res) => {
    //console.log('executou ' + req.query.id);
    deletePedido(req.query.id);
    res.send(`item ${req.query.id} deletado com sucesso`);
}