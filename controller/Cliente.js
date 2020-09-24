const { getAllCliente } = require('../db/cliente')

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
    console.log('query cliente: ', req.query);

    res.json({ meg: 'novo Cliente recebido' });
}