import React, {Component} from 'react';
import {Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';


const FormItem = Form.Item;

class Login extends Component {
	
	constructor() {
		super();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', values);
		  }
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
		 <Row>
		  <Col span={8}></Col>
		  <Col span={8}>
		  <Form onSubmit={this.handleSubmit} style={styles.form}>
			<FormItem>
			  {getFieldDecorator('userName', {
				rules: [{ required: true, message: '请输入用户名!' }],
			  })(
				<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
			  )}
			</FormItem>
			<FormItem>
			  {getFieldDecorator('password', {
				rules: [{ required: true, message: '请输入密码!' }],
			  })(
				<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
			  )}
			</FormItem>
			<FormItem>
			  {getFieldDecorator('remember', {
				valuePropName: 'checked',
				initialValue: true,
			  })(
				<Checkbox>记住我</Checkbox>
			  )}
			  <a style={styles.forgot} href="">忘记密码</a>
			  <Button type="primary" htmlType="submit" style={styles.loginBtn}>
				登录
			  </Button>
			  <a href="">马上注册!</a>
			</FormItem>
		  </Form>
				 </Col>
				  <Col span={8}></Col>
				  </Row>
		);
	}

}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;

const styles = {
	form: {
		fontSize: '14px',
		width: '100%',
		maxWidth: '320px', 
		height: '1px',
		paddingTop:'100px'
	},
	forgot: {
		float: 'right'
	},
	loginBtn: {
		width: '100%'
	}
}