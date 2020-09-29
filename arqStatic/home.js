//import { agora } from './agora.js';

class produto {
    constructor(nome, price=null){
        this.nome = nome;
        this.price = price;
    }
}

class pedido {
    constructor(id, cliente, data, pizzas, bebidas){
        this.id = id;
        this.cliente = cliente;
        this.data = data;
        this.pizzas = pizzas
        this.bebidas = bebidas
    }
}


function addBloco(pedido){
    const bloco = document.createElement('div');
    const head = document.createElement('div');
    const pizza = document.createElement('div');
    const bebida = document.createElement('div');
    const total = document.createElement('div');
    bloco.className = 'bloco';
    head.className = 'InBloco';
    pizza.className = 'pizza';
    bebida.className = 'bebida';
    total.className = 'total';

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    p1.className = 'pra';
    p2.className = 'pra';
    p3.className = 'pra';
    p1.innerText = 'Pedido N.: ' + pedido.id;
    p2.innerText = 'cliente: ' + pedido.cliente;
    p3.innerText = 'Data: ' + pedido.data;

    if(pedido.pizzas){
        for (let i = 0; i < pedido.pizzas.length; i++) {
            const tmp = document.createElement('p');
            tmp.className = 'blocoPizza';
            tmp.innerText = `${pedido.pizzas[i].nome} - preço R$${pedido.pizzas[i].price.toFixed(2)}`;
            pizza.appendChild(tmp);
        }
    }
    if(pedido.bebidas){
        for (let i = 0; i < pedido.bebidas.length; i++) {
            const tmp = document.createElement('p');
            tmp.className = 'blocoBebida';
            tmp.innerText = `${pedido.bebidas[i].nome} - preço R$${pedido.bebidas[i].price.toFixed(2)}`;
            bebida.appendChild(tmp);
        }
    }
    const tp1 = document.createElement('p');
    const tp2 = document.createElement('p');
    const bt1 = document.createElement('button');
    const bt2 = document.createElement('button');

    tp1.className = 'tp';
    tp1.id = 'tp' + pedido.id;
    tp1.innerText = 'Total a pagar: R$';
    tp2.innerText = `Pedido feito: ${pedido.done ? 'sim' : 'nao'}`;
    tp2.id = 'pf';
    bt1.textContent = 'excluir';
    bt1.id = pedido.id;
    bt1.addEventListener('click', excluirItem);
    bt2.textContent = 'Feito';
    bt2.addEventListener('click', setFeito);
    bt2.id = 'F' + pedido.id;

    head.appendChild(p1);
    head.appendChild(p2);
    head.appendChild(p3);

    total.appendChild(tp1)
    total.appendChild(tp2);
    total.appendChild(bt1);
    total.appendChild(bt2);

    bloco.appendChild(head)
    bloco.appendChild(pizza)
    bloco.appendChild(bebida);
    bloco.appendChild(total);


    const cen = document.querySelector(".central");
    bloco.id = pedido.id;
    cen.appendChild(bloco);    
}

function calTotal(dados){
    for (let i = 0; i < dados.length; i++) {
        let total = 0;
        for (let p = 0; p < dados[i].pizzas.length; p++) {
            total += Number(dados[i].pizzas[p].price);
        }
        for (let b = 0; b < dados[i].bebidas.length; b++) {
            total += Number(dados[i].bebidas[b].price);
        }
        //console.log(total + " ");
        const bloco = document.getElementById(`tp${dados[i].id}`);
        bloco.innerText += total.toFixed(2);
    }

}

function excluirItem(){
    fetch(`./pedido/delete?id=${this.id}`, { method: 'delete' }).then((meg) => {
        destroyBloco(this.id);
        console.log(meg);
    })
}

function destroyBloco(id){
    document.getElementById(id).remove();
    
}

function setFeito(){
    const E = this;
    let id = E.parentElement.parentElement.id;
    const p = E.parentElement.querySelector('#pf');

    fetch(`./produto/atualiza?id=${id}&status=${p.innerText.slice(14)}`, {method: 'put' }).then((res) => {
        console.log(res);
    })

    if(p.innerText.slice(14) === 'sim'){
        p.innerText = 'Pedido feito: nao';
        return
    }
    if(p.innerText.slice(14) === 'nao'){
        p.innerText = 'Pedido feito: sim';
    }
}

function agora(){
    const t = new Date();
    let res = t.getFullYear() + '-' + addZero(t.getMonth()+1) + '-' + addZero(t.getDate());
    return res;
}

function addZero(s){
    return ('00'+s).slice(-2);
}

function updateInputDates(){
    const datas = document.querySelectorAll('input');
    datas[0].defaultValue = agora();
    datas[1].defaultValue = agora();
}

function getPedidoByDate(){
    const blocos = document.querySelectorAll('.bloco');
    for (let i = 0; i < blocos.length; i++) {
        blocos[i].remove();
    }

    const datas = document.querySelectorAll('input');
    const data1 = datas[0].value;
    const data2 = datas[1].value;

    const promise = fetch(`./home/get?data1=${data1}&data2=${data2}`, {method: 'get'}).then((res) => {
        res.json().then((pedidos) => {
            console.log(pedidos);
            for (const x of pedidos) {
                addBloco(x);
            }
            calTotal(pedidos);
        })
    })

}


function main(){
    for (const x of dados) {
        addBloco(x);
    }
    calTotal(dados);
    updateInputDates();
    
    const buttonDate = document.querySelector('#bdata');
    buttonDate.addEventListener('click', getPedidoByDate)
}

// execute as funçoes aqui
main();



