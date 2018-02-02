import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col
,Tree} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux, Link } from 'dva/router';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {TreeNode} = Tree;

@connect(({ loading,paper }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  paper
}))
@Form.create()
export default class AddTechForms extends PureComponent {
  
  state={
    parentId:null,
    parentTitle:null
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.paper);
    if (nextProps.paper.status === 'ok') {
      this.props.dispatch(routerRedux.push({
        pathname: '/paper/list'
      }));
    }
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
    console.log(treeData);
    return (
      <PageHeaderLayout title="添加试卷" content="">
        <Card bordered={false}>
              <Form
                onSubmit={this.handleSubmit}
                hideRequiredMark
                style={{ marginTop: 8 }}
              >
                <Tooltip>{this.state.parentTitle?this.state.parentTitle:""}</Tooltip>
                <FormItem
                  {...formItemLayout}
                  label="试卷标题"
                >
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true, message: '请输入试卷标题',
                    }],
                  })(
                    <Input placeholder="请输入试卷标题" />
                    )}
                </FormItem>               

                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                  </Button>
                  <Button style={{ marginLeft: 8 }}>保存</Button>
                </FormItem>
              </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
