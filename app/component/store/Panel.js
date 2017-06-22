import React, {Component} from 'react';
import {Input} from 'antd';
import { browserHistory } from 'react-router';
import {
  Route,
  Link
} from 'react-router-dom'

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import storeActions from '../../actions/store';

class Panel extends Component {
    
    constructor(props) {
        super(props);
		let _pd;
		if(this.props.location.search) {
			let paramsString = this.props.location.search.slice(1);
			let searchParams = new URLSearchParams(paramsString);
			_pd = searchParams.get("_pd") ? searchParams.get("_pd") : 0;
		}
		this.state = {
			active: this.props.match.url,
			raValue: _pd,
		};
		//console.log('Panel', this.props);
    }
	
	setActive = name => {
		this.setState({active: name, raValue: 0});
	}
	
	onChange = (v) => {
		this.setState({
			raValue: v,
		});
		
	}

	_filter = (v) => {
		v = v.replace(/\s+/g, "");
		let type = 1;
		if(this.props.match.url.indexOf('/themes') > -1) {
			type = 2;
		}
		if(v) {
			this.props.storeActions.filter(v);
		} else {
			this.props.storeActions.getAppList(type);
		}
	}

    render () {
		let {match} = this.props;
		let url = match.url;
        return (
            <div style={styles.root}>
            	<Link to="/extensions" style={styles.link}>
            	<div style={{height: 40}}>
            		<img src="/public/image/cmschina.png" style={{width:30, height: 30, borderRadius: 15, marginTop: 5, marginRight: 5}} alt="招证应用市场"/>
            		<span style={{fontSize:16, position: 'relative', bottom: 10}}>招证应用市场</span>
            	</div>
				</Link>
            	<div style={{marginTop: 10}}>
            		<Input placeholder="搜索应用" style={{height: 35, fontSize: 16}} onKeyDown={(e) => {if(e.keyCode == 13){
						this._filter(e.target.value);
					}}}/>
            	</div>
		
				<Category to="/extensions" label="企业类" onClick={() => {this.setActive('/extensions')}}/>
				
				<Category to="/themes" label="普通用户类" onClick={() => {this.setActive('/extensions')}}/>

				<Route path={match.url} render={() => {
					if(match.url.indexOf('/extensions') > -1 || match.url.indexOf('/themes') > -1) {
						return null;
					} else {
						return null;
					}
					
				}}/>

		{this.props.condition ? (
					<Route render={({location}) => {
						return (
						<div>
							<div style={styles.hr}>
								<hr/>
							</div>

							<div style={styles.condition}>
								<label style={styles.text}>发布时间</label>{this.state.raValue ? <span style={styles.unselected} onClick={()=>{this.setState({raValue: 0})}}><Link to={`${url}`} style={[styles.link,styles.text]}>全部不选</Link></span> : ""}
							</div>
							<div style={styles.radios}>
								<Link to={`${url}?_pd=1d`} style={styles.link}><label style={this.state.raValue === '1d' ? styles.condition_selection : styles.condition} onClick={() => {this.onChange('1d')}}>一天内</label></Link><br/>
								<Link to={`${url}?_pd=1w`} style={styles.link}><label style={this.state.raValue === '1w' ? styles.condition_selection : styles.condition} onClick={() => {this.onChange('1w')}}>一周前</label></Link><br/>
								<Link to={`${url}?_pd=1m`} style={styles.link}><label style={this.state.raValue === '1m' ? styles.condition_selection : styles.condition} onClick={() => {this.onChange('1m')}}>一个月前</label></Link><br/>
								<Link to={`${url}?_pd=3m`} style={styles.link}><label style={this.state.raValue === '3m' ? styles.condition_selection : styles.condition} onClick={() => {this.onChange('3m')}}>三个月前</label></Link><br/>
							</div>
						</div>
					)}}/>
				) : ""}
            </div>
        )
    }
}



const Category = ({ label, to, activeOnlyWhenExact, match ,onClick}) => (
	
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
		let blockStyle = match ? Object.assign({}, styles.block, styles.block_active) : Object.assign({}, styles.block);
		return (
		<Link to={to} style={styles.link}>
			<div style={blockStyle} onClick={() => {onClick()}}>
				<label style={styles.text}>{label}</label>
			</div>
		</Link>
   )}}/>

);

const styles = {
	root: {
		border: '1px solid #bdbdbd',
		borderTop: 'none',
		borderRight: 'none',
		background: '#ececec',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 5,
		height:'100%',
	},
	link: {
        textDecoration: 'none',
		cursor: 'pointer',
		color: '#000',
    },
	block: {
		marginTop: 10,
		paddingLeft: '16px',
		borderRadius: 10,
		backgroundColor:'#ccc',
		lineHeight: '40px',
	},
	block_active: {
		backgroundColor:'#5080d8',
	},
	text: {
		fontSize:'14px',
		color: '#000',
	},
	hr: {
		paddingTop: '16px',
	},
	condition: {
		fontSize: '14px',
		marginTop: '16px',
		cursor: 'pointer',
		lineHeight: '30px',
		color: '#7b7b7b',
	},
	condition_selection: {
		fontSize: '14px',
		marginTop: '16px',
		cursor: 'pointer',
		lineHeight: '30px',
		color: '#7b7b7b',
		backgroundColor: '#ccc',
	},
	radios: {
		fontSize: '14px',
		paddingTop: '16px',
		paddingLeft: '32px',
	},
	radioStyle: {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
		textDecoration: 'none',
		cursor: 'pointer',
    },
	unselected: {
		float: 'right',
		cursor: 'pointer',
		color: '#5080d8',
	},
};

export default connect((state) => {
	return {
		extensions: state.extensions,
	}
}, (dispatch) => {
	return {
		storeActions: bindActionCreators(storeActions, dispatch),
	}
})(Panel);