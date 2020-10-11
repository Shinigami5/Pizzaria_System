const { setDone } = require('../db/db');
const { getAllProduto, addProduto, removeProduto, updateProduct } = require('../db/produto');


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


exports.post = (req, res) => {
    //console.log("produto recebido", req.query);
    const nome = req.query.nome;
    const tipo = req.query.tipo;
    const price = req.query['preço'];
    
    if(nome === undefined || tipo === undefined || price === undefined){
        res.json({ meg: 'alguns dados estao em banco, por favor envios de novo' });
    }else{
        addProduto(nome, tipo, price);
        res.json({ meg: 'novo Produto recebido' });
    }
}

exports.put = (req, res) => {
    //console.log('recebido: ' + req.query.id + ' ' + req.query.status);
    setDone(req.query.id, req.query.status);
    res.send('sucess');
}

exports.delete = (req, res) => {
    const id = Number(req.query.id);

    if(Number.isInteger(id) && id !== undefined){
        const pro = removeProduto(id);
        pro.then(result => {
            //console.log(result.sucess);
            if(result.sucess == true){
                res.json({ meg: result.meg });
            }else{
                res.json({ erro: result.meg });
            }
        })
    }else{
        res.json({ erro: 'id é nulo' });
    }

}

exports.editar = (req, res) => {
    const obj =  { name: req.query.nome, type: req.query.tipo, price: req.query.price, id: req.query.id };
    res.render('editaProduto', obj);
}

exports.update = (req, res) => {
    const nome = req.query.nome;
    const tipo = req.query.tipo;
    const price = req.query.price;
    const id = req.query.id;

    const pro = updateProduct(id, nome, tipo, price);
    pro.then(results => {
        if(results.sucess){
            res.json({ meg: results.meg, status: true })
        }else{
            res.json({ meg: results.meg, status: false })

        }
    });

}
