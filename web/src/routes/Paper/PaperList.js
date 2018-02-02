import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col
,Tree,List} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux, Link } from 'dva/router';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {TreeNode} = Tree;

@connect(({ loading,paper }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  paperList:paper.paperList
}))
@Form.create()
export default class PaperList extends PureComponent {
  
  state={
    
  }

  componentDidMount(){
    this.props.dispatch({type:"paper/init"});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'paper/add',
          payload: values,
        });
      }
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
    return (
      <PageHeaderLayout title="试卷列表" content="">
        <Card bordered={false}>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={this.props.paperList}
          renderItem={item => {
            return (
              <List.Item>
                  <span>{item.title}</span>
                  <Link to={{pathname:"/paper/setup",query:{id:item.id}}}>设置考题</Link>
              </List.Item>)
              }}
        />
        </Card>
      </PageHeaderLayout>
    );
  }
}
