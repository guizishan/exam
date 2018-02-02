import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col
,Tree} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TechTree from '../../components/TechTree';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {TreeNode} = Tree;

@connect(({ loading,tech }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  treeData:tech.treeData
}))
@Form.create()
export default class AddTechForms extends PureComponent {
  
  state={
    parentId:null,
    parentTitle:null
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let payload = null;
      if(this.state.parentId){
        payload = {
          id:this.state.parentId,
          child:values
        }
      }
      console.log(payload);
      if (!err) {
        this.props.dispatch({
          type: 'tech/add',
          payload: payload?payload:values,
        });
        this.props.form.resetFields();
      }
    });
  }


  onSelect=(selectedKeys,e)=>{
    console.log(selectedKeys);
    // 如果用户选中了某一个节点，表示用户希望将新增加的节点添加到选择的节点中
    if(e.selected){
      // 将当前元素的id保存到parentId里
      let cid = selectedKeys[selectedKeys.length-1];
      // // 1.使用字符串的substr方法获取字符串中的部分内容
      // let  id = null;
      // // id = cid.substr(cid.lastIndexOf('-')+1);
      // // 2.使用正则表达式获取部分内容
      // let p = /^(\d+)-(\d+)$/;
      // id = p.exec(cid)[2];

      this.setState({
        parentId:cid,
        parentTitle:e.node.props.title
      });
    }else{
      this.setState({
        parentId:null,
        parentTitle:null
      });
    }
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
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const {treeData} = this.props;
    // console.log(this.onSelect);
    return (
      <PageHeaderLayout title="添加技术" content="">
        <Card bordered={false}>
          <Row gutter={30}>
            <Col xs={24} sm={6}>
              <TechTree onSelect={this.onSelect}></TechTree>
            </Col>
            <Col xs={24} sm={18}>
              <Form
                onSubmit={this.handleSubmit}
                hideRequiredMark
                style={{ marginTop: 8 }}
              >
                <Tooltip>{this.state.parentTitle?this.state.parentTitle:""}</Tooltip>
                <FormItem
                  {...formItemLayout}
                  label="技术名称"
                >
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true, message: '请输入技术名称',
                    }],
                  })(
                    <Input placeholder="请输入技术名称" />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="技术描述"
                >
                  {getFieldDecorator('desc', {
                    rules: [{
                      required: true, message: '请输入技术描述',
                    }],
                  })(
                    <TextArea style={{ minHeight: 32 }} placeholder="请输入新技术的使用场景、优点、缺点" rows={4} />
                    )}
                </FormItem>

                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                  </Button>
                  <Button style={{ marginLeft: 8 }}>保存</Button>
                </FormItem>
              </Form>
            </Col>            
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
