import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col
,Tree} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux, Link } from 'dva/router';
import TechTree from '../../components/TechTree'
import QuestionList from '../../components/Paper/PaperSetup'
import style from './style.less'


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {TreeNode} = Tree;

@connect(({ loading,paper,tech,question }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  paper,
  treeData:tech.treeData,
  questions:question.questions
}))
@Form.create()
export default class PaperSetup extends PureComponent {
  
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
  
  onSelect=(selectedKeys,e)=>{
    // 当用户点击技术树的时候，获取这个技术及子技术的问题
    if(e.selected){
      this.props.dispatch({
        type:'question/queryQuestionByTech',
        payload:{
          tech:selectedKeys[0]
        }
      });
    }
    
  }

  onChange=(e)=>{
    console.log(e);
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    console.log(this.props);

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
      <PageHeaderLayout title="设置试卷" content="">
        <Card bordered={false}>
        <Row gutter={30}>
            <Col xs={24} sm={6}>
              <TechTree onSelect={this.onSelect}>
              </TechTree>
              
            </Col>
            <Col xs={24} sm={18}>
              <QuestionList questions={this.props.questions} onChange={this.onChange}/>
            </Col>            
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
