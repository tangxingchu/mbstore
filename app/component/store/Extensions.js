import React, {Component} from 'react';
import StoreCarousel from './StoreCarousel';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Card, Spin} from 'antd';
import RowCard from './RowCard'
import {
  Route,
  Link
} from 'react-router-dom'

import extActions from '../../actions/store';
import appInfoActions from '../../actions/appInfo';

class Extensions extends Component {
	
	constructor(props) {
        super(props);
	}

	componentDidMount() {
		this.props.extActions.getAppList(this.props.type).catch(erro => {console.log(erro)});
	}

	_renderItem = () => {
		return this.props.extensions.data.map((item, index) => <RowCard data={item} key={index} appInfoActions={this.props.appInfoActions}/>)
	}

	render() {
		return(
			<div>
				
				
				
				<div style={styles.carousel}>
					<StoreCarousel/>					
				</div>
				
				<div style={styles.title}>{this.props.type === 1 ? '企业类' : '普通用户类'}应用列表({this.props.extensions.data.length})&nbsp;&nbsp;{this.props.extensions.loading || this.props.appInfo.q_loading ? <Spin size='large'/> : ''}</div>
				
				<div style={styles.card}>
				{this.props.extensions.data.length > 0 ?
					<Row style={{padding: '5px'}}>
						{this._renderItem()}
					</Row> : ''
				}
				</div>
			</div>
		)
	}

}

const styles = {
	carousel: {
		width: '100%',
		height: '320px',
		padding: '8px',
		borderLeft: '1px solid #bdbdbd',
		borderRight: '1px solid #bdbdbd',
		borderBottom: '1px solid #bdbdbd',
		textAlign: 'center',
		lineHeight: '320px',
		color: '#fff',
		overflow: 'hidden',
	},
	title: {
		fontSize: '20px',
		backgroundColor: '#f8f8f8',	
		borderLeft: '1px solid #bdbdbd',
		borderRight: '1px solid #bdbdbd',
		borderBottom: '1px solid #bdbdbd',
		height: '60px',
		padding: '14px',
	},
	card: {
		border: '1px solid #bdbdbd',
		borderTop: 'none',
	}
}


export default connect((state) => {
	return {
		extensions: state.extensions,
		appInfo: state.appInfo,
	}
}, (dispatch) => {
	return {
		extActions: bindActionCreators(extActions, dispatch),
	    appInfoActions: bindActionCreators(appInfoActions, dispatch),
	}
})(Extensions);