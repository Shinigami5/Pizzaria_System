export function agora(){
    const t = new Date();
    let res = t.getFullYear() + '-' + addZero(t.getMonth()+1) + '-' + addZero(t.getDate());
    console.log(res);
    return res;
}

function addZero(s){
    console.log(s, s.lenght);
    return ('00'+s).slice(-2);
}