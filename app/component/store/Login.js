import React, {Component} from 'react';
import {Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import loginActions from '../../actions/login';
import {Redirect} from 'react-router-dom';

const FormItem = Form.Item;

class Login extends Component {
	
	constructor(props) {
        super(props);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			this.props.loginActions.login(values.userName, values.password).catch(err => {console.log(err)});
		  }
		});
	}

	componentWillMount() {
		let token = window.localStorage.getItem('token');
		if(token) this.props.loginActions.loginByToken(token);
	}

	render() {
		if(this.props.login.isLogin) {
			return (<Redirect to="/extensions"/>);
		}
		const { getFieldDecorator } = this.props.form;
		return (
		 <Row>
		  <Col span={8}></Col>
		  <Col span={8}>
		  <Form onSubmit={this.handleSubmit} style={styles.form}>
		{!this.props.login.loginstatus ? 
			<FormItem>
			  <label style={{color:'red'}}>{this.props.login.data.token}</label>
			</FormItem> : ""}
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
			  
			  <Button type="primary" htmlType="submit" style={styles.loginBtn}>
				登录
			  </Button>
			</FormItem>
		  </Form>
				 </Col>
				  <Col span={8}></Col>
				  </Row>
		);
	}

}

const WrappedNormalLoginForm = Form.create()(Login);

export default connect((state) => {
	return {
		login: state.login,
	}
}, (dispatch) => {
	return {
		loginActions: bindActionCreators(loginActions, dispatch),
	}
})(WrappedNormalLoginForm)



const styles = {
	form: {
		fontSize: '16px',
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