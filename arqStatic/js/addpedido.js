import { agora } from './agora.js';

let chooseProduto = null
let catalogoProduto = null

const main = () => {
    chooseProduto = document.querySelector('#seletor');
    catalogoProduto = document.querySelector('.produts');
    document.querySelector('input').defaultValue = agora();

    const b1 = document.querySelector('#b1');
    b1.addEventListener('click', add);
    const b2 = document.querySelector('#b2');
    b2.addEventListener('click', remove);
    const b3 = document.querySelector('#enviar')
    b3.addEventListener('click', enviar);
}


const add = () => {
    const produto = chooseProduto.value;
    catalogoProduto.innerHTML += ` <p>${produto}</p>`;
    //console.log(produto);
}

const remove = () => {
    if(catalogoProduto.lastElementChild)
        catalogoProduto.removeChild(catalogoProduto.lastElementChild);
}


function getProdutos(){
    let ps = catalogoProduto.innerText;
    ps = ps.replaceAll('\n\n', '\n');
    ps = ps.split('\n');
    const form = document.querySelector('form');
    for (let i = 0; i < ps.length; i++) {
        const tmp = document.createElement('input');
        tmp.setAttribute('name', 'produto');
        tmp.value = ps[i]
        tmp.setAttribute('type', 'hidden')
        form.appendChild(tmp);
    }
    console.log(ps);
}

function enviar(event){
    event.preventDefault();
    //console.log('this is enviar');
    getProdutos();
    document.querySelector('form').submit();
    $.notify('novo pedido enviado', 'success');
    
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}

//export { chooseProduto, catalogoProduto }