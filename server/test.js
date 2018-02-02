var jsondb = require('lo-jsondb');
var pokemons = jsondb('pokemons', {pretty: true});

function getParent(ids,idx,parent){
    if(!parent){
        idx=0;
        parent = pokemons.findOne(+ids[idx])
    }else{
        parent = parent.children.filter(item=>{
            return item.id==ids[idx];
        })[0];
    }
    if(idx < ids.length-1){
        idx++;
        return getParent(ids,idx,parent);
    }else{
        return parent;
    }
    
}

let ids = '3-2';
ids = ids.split('-').map(item=>{
    return +item;
});

// console.log(getParent(ids,0,null));;

// function jiechen(n){
//     if(n==1){
//         return n;
//     }
//     return n*jiechen(n-1)
// }

// console.log(jiechen(5));

let str='今天吃包子，明天还吃包子，后天吃两个包子';
let p = /(包子.+?)(包子)/;
let s = str.replace(p,'$1冰激凌');
console.log(s);
let m = p.exec(str);
console.log(m);