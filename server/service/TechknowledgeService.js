var jsondb = require('lo-jsondb');
var pokemons = jsondb('pokemons', {pretty: true});

let temp = null;
class TechknowledgeService{
    async addTechknowledge(tech){
        // 如果tech中有id属性，说明当前需要父节点为id的元素的children中添加子元素
        if(tech.id){
            let ids = tech.id.split('-').map(item=>{
                return +item;
            });
            console.log(ids);
            getParent(ids);
            let parent = temp;
            console.log(parent);
            if(parent.children){
                // 将新的元素添加到parent.children中                
                tech.child.id=parent.children.length+1;
            }else{
                tech.child.id=1;
                parent.children=[];
            }
            
            parent.children.push(tech.child);
            let root = pokemons.findOne(ids[0]);
            await pokemons.save(root);
        }else{
            await pokemons.save(tech);
        }
        return await pokemons.find();
    }

    async init(){
        return await pokemons.find();
    }    
}

function getParent(ids,idx,parent){
    if(!parent){
        idx=0;
        parent = pokemons.findOne(ids[idx]);
    }else{
        parent = parent.children.filter(item=>{
            return item.id==ids[idx];
        })[0];
    }
    if(idx === ids.length-1){  
        temp = parent;          
        return parent;
    }else{
        idx++;
        if(parent)
            getParent(ids,idx,parent);        
    }
}

module.exports = new TechknowledgeService();
