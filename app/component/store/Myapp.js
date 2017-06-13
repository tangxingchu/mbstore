import React, {Component} from 'react';
import {Button} from 'antd';
import { connect } from 'react-redux';

class Myapp extends Component {
	
	constructor() {
		super();
		
	}

	render() {
		let {url, test} = this.props;
		return(
			<div>
				<div style={styles.title}><span style={styles.myapp}>我的应用</span><Button type='primary' onClick={() => {}}>添加新应用</Button>{test.name}</div>
				<div>2</div>
			    <div>2</div>
			    <div>2</div>
			</div>
		)
	}

}

const styles = {
	title: {
		fontSize: '20px',
		backgroundColor: '#f8f8f8',	
		borderLeft: '1px solid #bdbdbd',
		borderRight: '1px solid #bdbdbd',
		borderBottom: '1px solid #bdbdbd',
		height: '60px',
		padding: '14px',
	},
	myapp: {
		marginRight:'10px',
	}
}

export default connect((state) => {
	return {
		test: state.test,
	}
}, (dispatch) => {
	return {}
})(Myapp);