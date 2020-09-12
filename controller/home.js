const { getDataHome, getDataHomeByDate } = require('../db/db');

exports.get = (req, res) => {
    const promise = getDataHome();
    setTimeout(() => {
        promise.then((valor) => {
            //console.log(valor[0]);
            for (const p of valor) {
                p.data = p.data.toLocaleDateString();
            }
            
            res.render('home', { dados: valor } );
        })
        .catch(erro => {
            console.log(erro);
            res.render('home', { dados: null });
        });
    }, 100);
}

exports.getPedido = (req, res) => {
    console.log(req.query.data1);

    const promise = getDataHomeByDate(req.query.data1, req.query.data2);
    setTimeout(() => {
        promise.then((results) => {
            for (const p of results) {
                p.data = p.data.toLocaleDateString();
            }
            console.log(results[0].data);
            res.json(results);
        })
    }, 100);
    
}