import React, {Component} from 'react';
import {Input} from 'antd';
import {
  Route,
  Link
} from 'react-router-dom'

export default class Panel extends Component {
    
    constructor(props) {
        super(props);
		this.state = {active: ""};
    }
	
	setActive = name => {
		this.setState({active: name});
	}

    render () {
        return (
            <div style={{border: '1px solid #bdbdbd',borderTop: 'none',borderRight: 'none', background: '#ececec', paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, height:'100%'}}>
            	
            	<div style={{height: 40}}>
            		<img src="/public/image/cmschina.png" style={{width:30, height: 30, borderRadius: 15, marginTop: 5, marginRight: 5}} alt="招证应用市场"/>
            		

            		<span style={{fontSize:16, position: 'relative', bottom: 10}}>招证应用市场</span>
            	</div>

            	<div style={{marginTop: 10}}>
            		<Input placeholder="搜索应用" style={{height: 35, fontSize: 16}} />
            	</div>
				
				<Category activeOnlyWhenExact={true} to="/" label="分类1"/>
			    <Category to="/themes" label="分类2"/>
				
            </div>
        )
    }
}



const Category = ({ label, to, activeOnlyWhenExact, match }) => (
	
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
		let blockStyle = match ? Object.assign({}, styles.block, styles.block_active) : Object.assign({}, styles.block);
		return (
		<Link to={to} style={styles.link}>
		<div style={blockStyle}>
			<label style={styles.text}>{label}</label>
		</div>
		</Link>
   )}}/>

);

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
};