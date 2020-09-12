class produto {
    constructor(nome, price=null){
        this.nome = nome;
        this.price = price;
    }
}

class pedido {
    constructor(id, cliente, data, done, pizzas=null, bebidas=null){
        this.id = id;
        this.cliente = cliente;
        this.data = data;
        this.done = done;
        this.pizzas = pizzas
        this.bebidas = bebidas
    }
}

module.exports = { produto, pedido };