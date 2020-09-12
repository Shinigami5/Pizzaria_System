const { setDone, deletePedido } = require('../db/db');


exports.delete = (req, res) => {
    console.log('executou ' + req.query.id);
    deletePedido(req.query.id);
    res.send(`item ${req.query.id} deletado com sucesso`);
}


exports.put = (req, res) => {
    console.log('recebido: ' + req.query.id + ' ' + req.query.status);
    setDone(req.query.id, req.query.status);
    res.send('sucess');
}
