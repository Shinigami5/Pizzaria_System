

function enviar(){
    const e = document.querySelectorAll('input');
    const nome = e[0].value;
    let tele = e[1].value;

    console.log(tele.length);

    if( isNumber(tele)  && (tele.length >= 8 && tele.length <= 11) ){

        console.log(nome);
        console.log(tele);
        fetch(`/cliente?nome=${nome}&tele=${tele}`, { method: 'post' }).then(request => {
            if(request.status === 200){
                request.json().then(res => {
                    console.log(res);
                    $.notify(res.meg, {
                        className: 'success',
                        autoHideDelay: 5000,
                    })
                });
            }else{
                console.error('Status: ', request.status);
                $.notify('requisiçao retornou com estaus: ' + request.status, {
                    className: 'error',
                    autoHideDelay: 5000,
                })
            }
        })
    }else{
        console.log('o telefone tem que está entre 8 digitos a 11 digitos');
        $.notify('o telefone tem que está entre 8 digitos a 11 digitos', {
            className: 'error',
            autoHideDelay: 5000,
        })
    }

}

function isNumber(string){                     // code of web
    return !isNaN(parseFloat(string)) && isFinite(string);
}

function AddNewClient(){
    const e = document.getElementById('fomulario');
    const classes = e.classList
    if(e.className === 'Add'){
        classes.add('oculto');
    }else if(e.className === 'Add oculto'){
        classes.remove('oculto');
    }
}

function editClient(event){
    const e = event.target.parentElement;
    const id = e.id;
    const Ps = e.querySelectorAll('p');
    let nome = Ps[1].innerText;
    let tele = Ps[2].innerText;

    nome = nome.replace('nome: ', '');
    tele = tele.replace('telefone: ', '');

    console.log(nome);
    console.log(tele);


    fetch(`/cliente/edita?nome=${nome}&tele=${tele}&id=${id}`, { method: 'get' }).then(res => {
        if(res.status === 200){
            console.log(res);
            res.text().then(novoHTML => {
                document.open();
                document.write(novoHTML);
            })
        }else{
            console.error('erro: requisiçao retorno com status ' + res.status);
            console.log(res);
            $.notify(res, {
                className: 'error',
                autoHideDelay: 3000,
            })
        }
    })
}

function deleteClient(event){
    const id = event.target.parentElement.id;
    fetch(`./cliente?id=${id}`, { method: 'delete' }).then(res => {
        if(res.status === 200){
            res.json().then(obj => { 
                //console.log(obj);
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
        }
    })
}