const express = require('express');
const home = require('./controller/home');
const pedido = require('./controller/addPedido');
const produto = require('./controller/produto');
const teste = require('./controller/paginaTeste');

const router = express.Router();

router.get('/home', home.get);
router.get('/home/get', home.getPedido);
router.get('/addPedido', pedido.get);
router.post('/addPedido', pedido.post)

router.delete('/produto', produto.delete);
router.put('/produto/atualiza', produto.put);

router.get('/teste', teste.get);
router.get('/teste/get', teste.get2);


module.exports = router;