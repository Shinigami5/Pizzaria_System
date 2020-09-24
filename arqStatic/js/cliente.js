

function enviar(){
    const e = document.querySelectorAll('input');
    const nome = e[0].value;
    let tele = e[1].value;

    console.log(tele.length);

    if(tele.length >= 8 && tele.length <= 11){
        tele = Number(tele);
        console.log(nome);
        console.log(tele);
        fetch(`/cliente?nome=${nome}&tele=${tele}`, { method: 'post' }).then(request => {
            if(request.status === 200){
                request.json().then(res => {
                    console.log(res);
                });
            }else{
                console.error('Status: ', request.status);
            }
        })
    }else{
        console.log('o telefone tem que está entre 8 digitos a 11 digitos');
    }

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

function editClient(){
    console.log('editou');
}

function deleteClient(){
    console.log('excluir');
}