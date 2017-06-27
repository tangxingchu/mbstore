import React, {Component} from 'react';
import {Row, Col, Card, Spin, Tooltip} from 'antd';
import AppDetails from './Appdetails';

export default class RowCard extends Component {

	constructor(props) {
        super(props);
		this.state = {visible: false};
	}

	showDetailModal = (appId) => {
		let token = window.localStorage.getItem('token');
		this.props.appInfoActions.getAppInfoById(token, appId).then(()=>{
			this.setState({
			  visible: true,
			});
		}).catch((err) => console.log(err));		
   }

	render() {
		return (
			<Col span={6} style={{padding: 5}}>
				<Card style={{ width: '100%',cursor:'pointer' }} bodyStyle={{ padding: 0 }} onClick={()=>{this.showDetailModal(this.props.data.app_id)}}>
					<div style={{textAlign:'center'}}>
					  <img width="200px" height="200px" src={this.props.data.icon_200 ? `/public/files${this.props.data.icon_200}` : '/public/image/default-icon.png'} />
					</div>
					<div style={{textAlign:'center'}}>
					  <h3>{this.props.data.appname_en}-{this.props.data.appname_cn}</h3>
					  <div className='desc'><Tooltip title={this.props.data.a_desc} overlayStyle={{color:'red'}}>{this.props.data.a_desc}</Tooltip></div>
					</div>
				</Card>
				<AppDetails visible={this.state.visible} cb={()=>{this.setState({
					  visible: false,
					})}}/>
			</Col>
		)
	}

}