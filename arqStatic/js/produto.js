

function enviar(event){
    const e = document.querySelectorAll('input');
    const nome = e[0].value;
    const tipo = e[1].value;
    const price = Number(e[2].value);

    console.log(nome);
    console.log(tipo);
    console.log(price);

    fetch(`/produto?nome=${nome}&tipo=${tipo}&preço=${price}`, { 
        method: 'post', 
        headers:  {'Content-Type': 'application/json' },
        body: JSON.stringify({ 'nome': nome, 'tipo': tipo, 'preço': price }),
    }).then(res => {
        //console.log('status: ', res.status);
        if(res.status === 200){
            res.json().then(res2 => {
                console.log(res2);
            });
        }else{
            console.error('Status: ', res.status);
        }
    }).catch(error => {
        console.log('erro: ', error);
    });
}

function AddNewProduto(){
    const e = document.getElementById('fomulario');
    const classes = e.classList
    if(e.className === 'Add'){
        classes.add('oculto');
    }else if(e.className === 'Add oculto'){
        classes.remove('oculto');
    }
}

function editProduto(){
    console.log('editou');
}

function deleteProduto(){
    console.log('excluir');
}