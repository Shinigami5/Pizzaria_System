


function enviar(event){
    const e = document.querySelectorAll('input');
    const nome = e[0].value;
    const tipo = e[1].value;
    const price = Number(e[2].value);

    // console.log(nome);
    // console.log(tipo);
    // console.log(price);


    fetch(`/produto?nome=${nome}&tipo=${tipo}&preço=${price}`, { 
        method: 'post', 
        headers:  {'Content-Type': 'application/json' },
        body: JSON.stringify({ 'nome': nome, 'tipo': tipo, 'preço': price }),
    }).then(res => {
        //console.log('status: ', res.status);
        if(res.status === 200){
            res.json().then(res2 => {
                console.log(res2);
                $.notify(res2.meg, {
                    autoHideDelay: 5000,
                    className: 'success',
                });
            });
        }else{
            console.error('Status: ', res.status);
            $.notify('requisiçao retornou com status: ' + res.status, {
                autoHideDelay: 5000,
                className: 'error'
            })
        }
    }).catch(error => {
        console.log('erro: ', error);
        $.notify('ocorreu um erro na requisiçao', {
            autoHideDelay: 5000,
            className: 'error'
        })
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

function editProduto(event){
    const e = event.target.parentElement;
    const id = e.id;
    const Ps = e.querySelectorAll('p');
    let nome = Ps[1].innerText;
    let tipo = Ps[2].innerText;
    let price = Ps[3].innerText;

    nome = nome.replace('nome: ', '');
    tipo = tipo.replace('tipo: ', '');
    price = price.replace('preço: R$', '');

    fetch(`/produto/edita?nome=${nome}&tipo=${tipo}&price=${price}&id=${id}`, { method: 'get' }).then(res => {
        if(res.status === 200){
            console.log(res);
            res.text().then(tex => {
                document.open();
                document.write(tex);
            })
            
        }else{
            console.error('erro: requisiçao retorno com status ' + res.status);
            console.log(res);
        }
    })


}

function deleteProduto(event){
    const id = event.target.parentElement.id;
    fetch(`./produto?id=${id}`, { method: 'delete' }).then(res => {
        if(res.status === 200){
            res.json().then(obj => {
                 if(obj.meg){
                    console.log(obj.meg);
                    $.notify(obj.meg, {
                        className: 'success',
                        autoHideDelay: 3000,
                    })
                    event.target.parentElement.remove();
                }
                if(obj.erro){
                    console.log(obj.erro);
                    $.notify(obj.erro, {
                        className: 'warn',
                        autoHideDelay: 3000,
                    })
                }
            })
        }else{
            console.log(res);
            $.notify('ocoreu um erro na requisiçao', {
                className: 'error',
                autoHideDelay: 3000
            })
        }
    })
}