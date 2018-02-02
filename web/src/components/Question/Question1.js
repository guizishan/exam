import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.tech = this.props.tech;
      values.type = this.props.type;
      if (!err) {
        console.log(values);
        this.props.dispatch({
          type: 'question/add',
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
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
          
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="请输入题干" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="A"
            >
              {getFieldDecorator('A', {
                rules: [{
                  required: true, message: '请输入A选项',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入A选项" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="B"
            >
              {getFieldDecorator('B', {
                rules: [{
                  required: true, message: '请输入B选项',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入B选项" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="C"
            >
              {getFieldDecorator('C', {
                rules: [{
                  required: true, message: '请输入C选项',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入C选项" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="D"
            >
              {getFieldDecorator('D', {
                rules: [{
                  required: true, message: '请输入D选项',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入D选项" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="正确答案"
            >
              <div>
                {getFieldDecorator('answer', {
                  initialValue: 'A',
                })(
                  <Radio.Group>
                    <Radio value="A">A</Radio>
                    <Radio value="B">B</Radio>
                    <Radio value="C">C</Radio>
                    <Radio value="D">D</Radio>
                  </Radio.Group>
                )}                
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
    );
  }
}
