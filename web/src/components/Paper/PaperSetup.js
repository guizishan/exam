import {Table,Row,Col,List,Input,Form,Button} from 'antd';

const FormItem = Form.Item;

function handleSubmit(e){
    e.preventDefault();
    console.log(12);
    this.props.form.validateFields(activeFileds, { force: true },
      (err, values) => {
          console.log(values);
        // this.props.onSubmit(err, values);
      }
    );
}
function PaperSetup({questions,onChange}){
    let selection = questions && questions.选择题.map(item=>(
        <List.Item key={item.id}>
            <Row>
                <Col xs={2}>
                    {item.id}
                </Col>
                <Col xs={20}>
                    {item.title}
                </Col>
                <Col xs={2}>
                    <Input type="checkbox" defaultValue={item.id} name="section"/>
                </Col>
            </Row>
        </List.Item>
    ));
    let ask = questions &&  questions.问答题.map(item=>(
        <List.Item key={item.id}>
            <Row>
                <Col xs={2}>
                    {item.id}
                </Col>
                <Col xs={20}>
                    {item.title}
                </Col>
                <Col xs={2}>
                    <Input type="checkbox" defaultValue={item.id} name="ask" />
                </Col>
            </Row>
        </List.Item>
    ));
    return (
        <Form onSubmit={handleSubmit}>
            <List
                header={"选择题"}
            >
                {selection}
            </List>
            <List header={"问答题"}>
                {ask}
            </List>
            <FormItem>
            <Button
              size="large"
              loading={submitting}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
          </FormItem>
        </Form>
    );
}

export default Form.create()(PaperSetup);