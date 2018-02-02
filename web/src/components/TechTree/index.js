import {Tree} from 'antd';
import React,{ Component } from 'react';
import {connect} from 'dva';

const {TreeNode} = Tree;
// 根据数据库查询的技术树显示Tree

function toNode(root,upKey){
    upKey=upKey?upKey+'-':'';
    
    return root.map(item=>{
        let children =null;
        let curKey = upKey + item.id;
        if(item.children){
           children = toNode(item.children,curKey);
        }
        return <TreeNode title={item.title} key={curKey}>{children}</TreeNode>        
    })
}

// 这是一个技术树，在显示的时候需要请求技术树的数据
@connect(({tech}) => ({
    treeData:tech.treeData
  }))
class TechTree extends Component{

    componentDidMount(){
        // 触发tect/init动作，会修改tect模块中的treeData
        !this.props.treeData.length  && this.props.dispatch({
            type:'tech/init'
        });
    }

    render(){
        let children = toNode(this.props.treeData)
        console.log(this.props);
        return (
            <Tree onSelect={this.props.onSelect}>
                {children}
            </Tree>
        );
    }
}



export default TechTree;