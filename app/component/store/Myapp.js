import React, {Component} from 'react';
import {Button} from 'antd';
import { connect } from 

export default class Myapp extends Component {
	
	constructor() {
		super();
		
	}

	render() {
		let {url} = this.props;
		return(
			<div>
				<div style={styles.title}><span style={styles.myapp}>我的应用</span><Button type='primary' onClick={() => {}}>添加新应用</Button></div>
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