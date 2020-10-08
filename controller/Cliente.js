const { getAllCliente, addClient, removeClient } = require('../db/cliente')

exports.get = (req, res) => {
    const promesa = getAllCliente();
    promesa.then(result => {
        let items = [];
        for (const item of result) {
            let tmp = {};
            tmp.id = item.id;
            tmp.nome = item.nome;
            tmp.tele = item.tele;
            items.push(tmp);
        }

        res.render('Clientes', { 'clientes': items });

    }).catch(erro => {
        console.log(erro);
        res.render('Clientes', { 'clientes': null });
    })

}

exports.post = (req, res) => {
    const nome = req.query.nome;
    const tele = req.query.tele;
    let erro = false;

    if(nome === undefined || tele === undefined){
        erro = true;
        res.json({ meg: 'alguns dos valores recebidos estao nao estao definidos!' });
        return;
    }

    if( !(tele.length >= 8 && tele.length <= 11) ){
        erro = true;
        console.log('error: tele deve ter entre 8 a 11 digitos');
        res.json({ meg: 'erro: telefone deve ter entre 8 a 11 digitos' });
    }
    if(nome.length > 70){
        erro = true;
        console.log('error: nome tem tamanho maior de 70');
        res.json({ meg: 'erro: nome é muito longo' });
    }

    if(!erro){
        addClient(nome, tele);
        res.json({ meg: 'novo Cliente recebido' });
    }
}

exports.delete = (req, res) => {
    const id = Number(req.query.id);

    if(Number.isInteger(id) && id > 0){
        const pro = removeClient(id);
        pro.then(result => {
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
    res.send('todo');
}