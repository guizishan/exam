const db = require('./Db');

class QuestionService {
    async add(question){
        let id = null;
        let tableName = "";
        switch (question.type){
            case "选择题":
                tableName = "question";
                break;
            case "问答题":
                tableName = "question2";
                break;
            case "判断题":
                tableName = "question3";
                break;
        }
        console.log(question);
        delete question.type;
        await db.exec(`insert into ${tableName} set ?`, question)
        .then(rows => {
             id = rows.insertId;
        })
        .catch(e => {
            
        })

        return id;
    }

    async queryQuestionByTech(tech){
        // 在所有的考题表中查询出tech及tech的子类型的考题
        let map = {};
        let sql = `select id,title,tech from question where locate('${tech}',tech) = 1`;
        console.log(sql);
        await db.exec(sql)
                .then(rows=>{
                    console.log(rows);
                    map.选择题=rows;
                })
                .then(()=>{
                    return db.exec(`select id,title,tech from question2 where locate('${tech}',tech) = 1`);
                })
                .then(rows=>{
                    console.log(rows);
                    map.问答题=rows;
                })
                .catch(e=>{
                    console.log(e);
                });
        return map;
    }
}

module.exports = new QuestionService();