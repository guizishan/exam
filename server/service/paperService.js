const db = require('./Db');

class PaperService {
    async add(paper){
        let paperList = null;
        
        await db.exec('insert into paper set ?', paper)
        .then(()=>{
            return db.exec('select id,title from paper')            
        })
        .then(rows=>{
             paperList = rows;   
        })
        .catch(e => {
            console.log(e);
        })

        return paperList;
    }

    async paperListInit(){
        let paperList = null;
        
        await db.exec('select id,title from paper')
        .then(rows=>{
             paperList = rows;   
        })
        .catch(e => {
            console.log(e);
        })

        return paperList;
    }
}

module.exports = new PaperService();