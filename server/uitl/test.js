const Jsondb = require('./Jsondb');
const db = new Jsondb('pokemons',{pretty:true});
db.appendChild(1,{
    title:"less",
    desc:"预编译css"
});