const Lo_jsondb = require('lo-jsondb');
const _ = require('lodash');

function Jsondb(db,options){
    Lo_jsondb.call(this,db,options)//借用父类的构造函数
}

Jsondb.prototype=Lo_jsondb();//子类构造函数的原型应该是父类型的一个实例
Jsondb.prototype.constructor=Jsondb;
Jsondb.prototype.appendChild=function(parentId,obj, write){
    if(!_.isBoolean(write)) write = true;
    if(!_.isPlainObject(obj)) return false;

    // 创建子知识点对象
    var toassign = {};
    if(this.object.settings.ai){
        toassign.id = this.object.settings.ai++
    }

    var created = _.assign(obj, toassign);
    // 找出父知识点
    let parent = this.findOne(parentId);
    if(!parent.children){
        parent.children=[]
    }
    parent.children.push(created);

    if(write) this._reopen();
    return created;
}

module.exports = Jsondb;
