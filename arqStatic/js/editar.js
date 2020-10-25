
function updateProduct(){
    const inputs = document.querySelectorAll('input');
    const name = inputs[0].value;
    const type = inputs[1].value;
    const price = inputs[2].value;
    let id = document.body.querySelector('.container');
    id = id.id;

    if(id !== '0'){
        fetch(`produto/atualizar?nome=${name}&tipo=${type}&price=${price}&id=${id}`, { method: 'post' }).then(res => {
            res.json().then(obj => { console.log(obj.meg); } )
        })
    }else{
        console.log('sem produto para atualizar');
    }

}

function updateClient(){
    const inputs = document.querySelectorAll('input');
    const name = inputs[0].value;
    const tele = inputs[1].value;
    let id = document.body.querySelector('.container');
    id = id.id;

    if(id !== '0'){
        fetch(`cliente/atualizar?nome=${name}&tele=${tele}&id=${id}`, { method: 'post' }).then(res => {
            res.json().then(obj => { 
                console.log(obj.meg);
            })
        })
    }else{
        console.log('sem cliente para atualizar');
    }
}