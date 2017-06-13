import React, {Component} from 'react';
import { Menu, Dropdown, Icon, Button } from 'antd';
import {Link } from 'react-router-dom';

export default class Header extends Component {
	
	constructor() {
		super();
		this.state = {
			visible: false
		}
	}
	
	handleMenuClick = (e) => {
		if (e.key === '3') {
		  this.setState({ visible: false });
		}
	}

	render() {
		const menu = (
		  <Menu onClick={this.handleMenuClick}>
			<Menu.Item key="1"><Link to="/login">切换其他用户登录</Link></Menu.Item>
			<Menu.Item key="2"><Link to="/myapps">我的应用</Link></Menu.Item>
			<Menu.Item key="3">个人中心</Menu.Item>
			<Menu.Item key="4">退出</Menu.Item>
		  </Menu>
		);
		return(
			<div style={styles.header}>
				<div style={styles.inner}>
					<span><Link to="/login"><Button>登录</Button></Link></span>
					<span>
					  <Dropdown overlay={menu} trigger={['click']}>
						
						<a className="ant-dropdown-link" href="#">tangxingchu9527@163.com<Icon type="down" /> 
						</a>
						
					  </Dropdown>
					</span>
				</div>
			</div>
		)
	}

}

const styles = {
	header: {
		height: '55px',
		backgroundColor: '#ececec',
		borderLeft: '1px solid #bdbdbd',
		borderBottom: '1px solid #bdbdbd',
		borderRight: '1px solid #bdbdbd',
	},
	inner: {
		fontSize: '12px',
		float: 'right',
		marginRight: '8px',
		marginTop: '16px',
	},
	setting: {
		fontSize: '20px',
		marginLeft: '8px',
	}
}