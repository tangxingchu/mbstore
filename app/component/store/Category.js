import React, {Component} from 'react';
import {
  Route,
  Link
} from 'react-router-dom';


export default class Category extends Component {
	
	constructor() {
		super();
	}

	render() {
		let blockStyle = this.props.active ? Object.assign({}, styles.block, styles.block_active) : Object.assign({}, styles.block);
		return(
			<Link to={this.props.to} style={styles.link}>
				<div style={blockStyle} >
					<label style={styles.text}>{this.props.name}</label>
				</div>
			</Link>
		)
	}

}

const styles = {
	link: {
        textDecoration: 'none',
		cursor: 'pointer',
    },
	block: {
		marginTop: 10,
		paddingLeft: 16,
		borderRadius: 10,
		backgroundColor:'#ccc',
		lineHeight: '40px',
	},
	block_active: {
		backgroundColor:'#5080d8',
	},
	text: {
		fontSize:'16px',
		color: '#000',
	},
}