
const nome = 'nia';

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