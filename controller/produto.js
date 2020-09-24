const { setDone, deletePedido } = require('../db/db');
const { getAllProduto } = require('../db/produto');


exports.get = (req, res) => {
    const promesa = getAllProduto();

    promesa.then(result => {
        let items = [];
        for (const item of result) {
            let tmp = {}
            tmp.id = item.id;
            tmp.nome = item.nome;
            tmp.tipo = item.tipo;
            tmp.price = item['preço'];
            items.push(tmp);
        }
        //console.log(items);
        res.render('produtos', { 'produtos': items });
    }).catch(erro => {
        console.log(erro);
        res.render('produtos', { 'produtos': null });
    })

}

exports.delete = (req, res) => {
    //console.log('executou ' + req.query.id);
    deletePedido(req.query.id);
    res.send(`item ${req.query.id} deletado com sucesso`);
}

exports.post = (req, res) => {
    //console.log("body ", req.body);
    console.log("query produto", req.query);

    //console.log(req.params);
    res.json({ meg: 'novo Produto recebido' });

}

exports.put = (req, res) => {
    //console.log('recebido: ' + req.query.id + ' ' + req.query.status);
    setDone(req.query.id, req.query.status);
    res.send('sucess');
}
