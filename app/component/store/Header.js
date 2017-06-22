import React, {Component} from 'react';
import { Menu, Dropdown, Icon, Button } from 'antd';
import {Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import loginActions from '../../actions/login';

class Header extends Component {
	
	constructor(props) {
        super(props);
	}
	
	handleMenuClick = (e) => {
		if (e.key === '3') {
			this.props.loginActions.logout();
		}
		if(e.key === '1') {
			this.props.loginActions.changeuser();
		}
	}

	componentWillMount() {
		let token = window.localStorage.getItem('token');
		if(token) this.props.loginActions.loginByToken(token);
	}

	render() {
		const menu = (
		  <Menu onClick={this.handleMenuClick}>
			<Menu.Item key="1"><Link to="/login">切换其他用户登录</Link></Menu.Item>
			<Menu.Item key="2"><Link to="/myapps">我的应用</Link></Menu.Item>
			<Menu.Item key="3">退出</Menu.Item>
		  </Menu>
		);
		if(this.props.login.isLogin) {
			return(
				<div style={styles.header}>
					<div style={styles.inner}>
						<span>
						  <Dropdown overlay={menu} trigger={['click']}>
							
							<a className="ant-dropdown-link" href="#">{this.props.login.data && this.props.login.data.username ? this.props.login.data.username : ""}<Icon type="down" /> 
							</a>
							
						  </Dropdown>
						</span>
					</div>
				</div>
			)			
		} else {
			return(
				<div style={styles.header}>
					<div style={styles.inner}>
						<span><Link to="/login"><Button>登录</Button></Link></span>
					</div>
				</div>
			)
			
		}
		
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


export default connect((state) => {
	return {
		login: state.login,
	}
}, (dispatch) => {
	return {
		loginActions: bindActionCreators(loginActions, dispatch),
	}
})(Header)