const express = require('express');
const home = require('./controller/home');
const pedido = require('./controller/addPedido');
const produto = require('./controller/produto');
const teste = require('./controller/paginaTeste');
const cliente = require('./controller/Cliente');

const router = express.Router();

router.get('/home', home.get);
router.get('/home/get', home.getPedido);
router.get('/addPedido', pedido.get);
router.post('/addPedido', pedido.post)
router.delete('/pedido/delete', pedido.delete);  // deleta pedido

router.get('/cliente', cliente.get);
router.post('/cliente', cliente.post);
router.delete('/cliente', cliente.delete);
router.get('/cliente/edita', cliente.editar);

router.get('/produto', produto.get);
router.post('/produto', produto.post);
router.delete('/produto', produto.delete);
router.get('/produto/edita', produto.editar);

router.post('/produto/atualizar', produto.update); // atualizar um produto

router.put('/produto/atualiza', produto.put); // edita o estado do produto

router.get('/teste', teste.get);
router.get('/teste/get', teste.get2);


module.exports = router;