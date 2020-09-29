const { setDone } = require('../db/db');
const { getAllProduto, addProduto, removeProduto } = require('../db/produto');


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
    console.log("produto recebido", req.query);
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
    console.log(id);

    if(Number.isInteger(id) && id !== undefined){
        const pro = removeProduto(id);
        pro.then(result => {
            console.log(result.sucess);
            if(result.sucess == true){
                res.json({ meg: result.meg });
            }else{
                res.json({ erro: result.meg });
            }
        })
    }else{
        res.json({ erro: 'id é null' });
    }

}
