import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Tabs, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col
,Tree} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Question1 from '../../components/Question/Question1';
import Question2 from '../../components/Question/Question2';
import TechTree from '../../components/TechTree';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const {TreeNode} = Tree;
const {TabPane} = Tabs;

@connect(({ loading,tech }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  treeData:tech.treeData
}))
@Form.create()
export default class AddQuestionForms extends PureComponent {
  
  state={
    tech:"1",
    type:"选择题",
    parentTitle:null
  }
  


  onSelect=(selectedKeys,e)=>{
    console.log(selectedKeys);
    // 如果用户选中了某一个节点，表示用户希望将新增加的节点添加到选择的节点中
    if(e.selected){
      let cid = selectedKeys[selectedKeys.length-1];

      this.setState({
        tech:cid,
        parentTitle:e.node.props.title
      });
      
    }else{
      this.setState({
        parentId:null,
        parentTitle:null
      });
    }
  }
  
  onChange=(key)=>{
    let type="";
    switch(key){
      case "1":
        type="选择题";
        break;
      case "2":
        type="问答题";
        break;
      case "3":
        type="判断题";
        break;
    }
    this.setState({
      type
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 18 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const {treeData} = this.props;
    return (
        <Card bordered={false}>
          <Row gutter={30}>
            <Col xs={24} sm={6}>
              <TechTree onSelect={this.onSelect}></TechTree>
              
            </Col>
            <Col xs={24} sm={18}>
            <Tooltip>{this.state.parentTitle?"当前技术类型是："+this.state.parentTitle:"没有选择技术类型"}</Tooltip>
            <Tabs defaultActiveKey="1" tab="Tab" onChange={this.onChange}>
              <TabPane tab="选择题" key="1">
                <Question1 tech={this.state.tech} type={this.state.type}></Question1>
              </TabPane>
              <TabPane tab="问答题" key="2">
                <Question2 tech={this.state.tech} type={this.state.type}></Question2>
              </TabPane>
              <TabPane tab="判断题" key="3">

              </TabPane>
            </Tabs>
            </Col>            
          </Row>
        </Card>
    );
  }
}
