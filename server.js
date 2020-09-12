const express = require('express');
const path = require('path');
const router = require('./router');




const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(router);

server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(express.static('arqStatic', {}));

server.listen(5501, () => {
    console.log('server run in port 5501');
});
