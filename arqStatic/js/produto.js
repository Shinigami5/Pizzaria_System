

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