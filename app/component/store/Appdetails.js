import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal,Form, Select, InputNumber, Switch, Radio,
  Slider, Upload, Icon,Input,Spin,Tabs } from 'antd';
import appInfoActions from '../../actions/appInfo';

const TabPane = Tabs.TabPane;

class AppDetails extends Component {
	
	constructor(props) {
        super(props);
	}
	
	componentWillMount() {
		
	}

	componentDidMount() {
	
	}

	componentWillUpdate(nextProps, nextState) {
	
	}

	componentDidUpdate(prevProps, prevState) {

	}

	render() {
		
		return(
			<Modal
				  title="应用详情"
				  width={800}
				  footer={null}
				  visible={this.props.visible}
				  onCancel={this.props.cb}
				>
				    <Tabs defaultActiveKey="1" onChange={() => {}} tabBarStyle={{height: '40px'}}>
						<TabPane tab="概述" key="1">
							<div style={{fontSize: '14px'}}>
							<div><div style={{float:'left'}}>
									<div><img src={this.props.appInfo.data.icon_50 ? `/public/files${this.props.appInfo.data.icon_50}` : '/public/image/default-icon.png'} style={{width:'50px',height:'50px'}}/>50*50图标</div>
									<div><img src={this.props.appInfo.data.icon_100 ? `/public/files${this.props.appInfo.data.icon_100}` : '/public/image/default-icon.png'} style={{width:'100px',height:'100px'}}/>100*100图标</div>
									<div><img src={this.props.appInfo.data.icon_200 ? `/public/files${this.props.appInfo.data.icon_200}` : '/public/image/default-icon.png'} style={{width:'200px',height:'200px'}}/>200*200图标</div>
								</div>
								<div style={{float:'left'}}>
									<div><div style={{fontWeight:'bold'}}>ID:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.appId}</div></div>					
									<div><div style={{fontWeight:'bold'}}>类型:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.type === 1 ? '企业类' : '普通用户类'}</div></div>
									<div><div style={{fontWeight:'bold'}}>英文名称:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.appnameEn}</div></div>
					                <div><div style={{fontWeight:'bold'}}>中文名称:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.appnameCn}</div></div>
					                <div><div style={{fontWeight:'bold'}}>创建时间:</div><div style={{paddingLeft:'10px'}}>{this.props.appInfo.data.createTime}</div></div>
								</div>
							</div>
							<div style={{clear:'both', marginTop: '20px'}}><span style={{fontWeight:'bold'}}>描述:</span>{this.props.appInfo.data.desc}</div>
							</div>
						</TabPane>
						<TabPane tab="二维码" key="2">.</TabPane>
					</Tabs>

				</Modal>
		)
	}

}

const styles = {
	
}

export default connect((state) => {
	return {
		appInfo: state.appInfo,
	}
}, (dispatch) => {
	return {
		appInfoActions: bindActionCreators(appInfoActions, dispatch),
	}
})(AppDetails);