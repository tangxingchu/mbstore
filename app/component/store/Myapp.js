import React, {Component} from 'react';
import { createForm } from 'rc-form';
import {Button, Modal,Form, Select, InputNumber, Switch, Radio,
  Slider, Upload, Icon,Input,Spin,Tabs } from 'antd';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route, Link, Redirect} from 'react-router-dom';
import AppDetails from './Appdetails';
import appInfoActions from '../../actions/appInfo';
import versionActions from '../../actions/version';

class Myapp extends Component {
	
	constructor(props) {
        super(props);
		this.state = {visible: false};
	}
	
	componentDidMount() {
		let token = window.localStorage.getItem('token');
		this.props.appInfoActions.getMyAppInfo(token);
	}
		
	showDetailModal = (appId) => {
		let token = window.localStorage.getItem('token');
		this.props.appInfoActions.getAppInfoById(token, appId).then(()=>{
			this.setState({
			  visible: true,
			});
		}).catch((err) => console.log(err));		
	  }

	showConfirm = (callback) => {
		let token = window.localStorage.getItem('token');
	  confirm({
		title: '确定删除该应用吗?',
		onOk() {
		  callback(token);
		},
		onCancel() {
		  
		},
	  });
	}
	
	_renderItem = () => {
		let {url} = this.props.match;
		if(this.props.appInfo.q_data) {
			return (<div style={{padding: '10px 0px 10px', fontSize: '14px'}}>{this.props.appInfo.q_data.map((data, index) => {
				return (<div style={{border:'1px solid #ccc', padding: '10px', marginTop: '4px'}} key={index}>
					<div style={{float: 'left', marginRight: '4px'}}>
						<img style={{width:'100px', height:'100px', cursor:'pointer'}} onClick={()=>{this.showDetailModal(data.appId)}} src={data.icon_100 ? '/public/files' + data.icon_100 : '/public/image/default-icon.png'} />
					</div>
					<div style={{float: 'left'}}>
						<div style={{float: 'left', marginRight: '10px'}}>类型: <span style={{fontWeight: 'bold'}}>{data.type === 1 ? '企业类' : '普通用户类'}</span></div>
						<div style={{float: 'left', marginRight: '10px'}}>英文名称: <span style={{fontWeight: 'bold'}}>{data.appnameEn}</span></div>
						<div style={{float: 'left', marginRight: '10px'}}>中文名称: <span style={{fontWeight: 'bold'}}>{data.appnameCn}</span></div>
						<div style={{float: 'left', marginRight: '10px'}}>创建时间: <span>{data.createTime}</span></div>
						<div style={{clear: 'both'}}></div>
						<div style={{clear: 'both'}}>描述：{data.desc}</div>
					</div>
					<div style={{float:'right'}}>
						<div><Button type='primary' style={{width: '100px'}} onClick={() => {this.props.appInfoActions.showCVModal(data.appId)}}>创建新版本</Button></div>
					</div>	
					<div style={{float:'right', marginRight: '10px'}}>
						<div><Button type='danger' style={{width: '100px'}} onClick={() => {this.showConfirm((token) => {this.props.appInfoActions.delAppInfoById(token, data.appId)})}}>删除</Button></div>
					</div>
					<div style={{float:'right', marginRight: '10px'}}>
						<div><Link to={`${url}/modifyapp/${data.appId}`}><Button style={{width: '100px'}}>修改</Button></Link></div>
					</div>
					<div style={{clear: 'both'}}></div>
					<VersionInfo versionActions={this.props.versionActions} version={this.props.version} appId={data.appId}/>
					<WrappedNewVersionInfo appId={data.appId} />
				</div>)
			})} </div>);
		}
		return null;
	}

	render() {
		let {url} = this.props.match;
		if(!this.props.login.isLogin) {
			if(!this.props.login.changeuser) {
				return (<Redirect to="/extensions"/>)
			}
			return (<Redirect to="/login"/>)
		}

		return (
			<div>
				<div style={styles.title}><span style={styles.myapp}>我的应用({this.props.appInfo.q_data.length})&nbsp;&nbsp;{this.props.appInfo.q_loading ? <Spin size='large'/> : ''}</span><Link to={`${url}/newapp`}><Button type='primary'>添加新应用</Button></Link></div>

				<Route exact path={url} render={this._renderItem}/>

				<Route path={`${url}/newapp`} render={() => (
					<WrappedAddForm url={url}/>)
				}/>
				
				<Route path={`${url}/modifyapp/:id`} render={({match, location}) => {
					let search = location.search;
					return (
					<WrappedForm url={url} modify appId={match.params.id}/>)}
				}/>
				
				<AppDetails visible={this.state.visible} cb={()=>{this.setState({
					  visible: false,
					})}}/>
				
			</div>
		)
	}

}
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

class VersionInfo extends Component {
	
	constructor(props) {
        super(props);
		this.state = {down: false};
	}
	
	render() {
		let token = window.localStorage.getItem('token');
		return (
			<div style={{marginLeft: '104px', marginTop: '4px'}}>版本历史信息<Icon type={this.state.down ? 'caret-down' : 'caret-up'} style={{cursor: 'pointer'}} 
				onClick={() => {this.setState(prevState => ({down: !prevState.down}));
					this.props.versionActions.queryVersions(token, this.props.appId);
				}}/>
				{this.props.version.v_loading[this.props.appId] ? <Spin size='small'/> : ''}
				
				{this.state.down && this.props.version.v_data[this.props.appId] ? this.props.version.v_data[this.props.appId].map((item, index) => {
					return <div key={index} style={{ padding: '4px'}}><div style={{float: 'left'}}>版本号：{item.versionNo}</div><div style={{float: 'left'}}>描述：{item.desc}</div>
						<div style={{clear: 'both'}}></div>
						</div>
				}) : ''}
				{this.state.down && this.props.version.v_data[this.props.appId] && this.props.version.v_data[this.props.appId].length === 0 ? <div style={{ padding: '4px'}}>无版本信息...</div> : ''}
			</div>	
		)
	}
}


class NewVersionInfo extends Component {
	
	constructor(props) {
        super(props);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				let token = window.localStorage.getItem('token');
				let appId = this.props.appInfo.currAppId;
				let version = values['version'];
				let desc = values['desc'];
				let versionInfo = {token, appId, version, desc};
				this.props.versionActions.createVersion(versionInfo).then((data) => { console.log(data);Modal.info({
					title: '提示',
					content: (
					  <div>
						保存成功！Code: {this.props.version.data.code}
					  </div>
					),
					onOk() {},
				  });});
			}
		});
	}

	render() {
		if(this.props.appId === this.props.appInfo.currAppId) {
			const { getFieldDecorator } = this.props.form;
			const formItemLayout = {
			  labelCol: { span: 2 },
			  wrapperCol: { span: 6 },
			};
			return (
				<div style={{marginLeft: '104px', marginTop: '4px'}}>新建版本信息
				
					<Form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
						<FormItem
						  {...formItemLayout}
						  label="版本号"
						>{getFieldDecorator('version', {
							rules: [
							  { required: true, pattern: /\d+(\.\d+){0,2}/, message: '请输入正确的版本号,比如:1.0.1' },
							],
						  })(
						  <Input placeholder="版本号" />)}
						</FormItem>
						<FormItem
						  {...formItemLayout}
						  label="描述"
						>{getFieldDecorator('desc')(
						  <Input type="textarea" rows={4} />)}
						</FormItem>
						<FormItem
						  wrapperCol={{ span: 8, offset: 2 }}
						>
						  <Button type="primary" htmlType="submit" disabled={this.props.version.loading ? true : false}>{this.props.version.loading ? '保存中...' : '保存'}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
						  <Button type="default" onClick={() => {this.props.appInfoActions.showCVModal('')}} >关闭</Button>
						</FormItem>
					</Form>
				</div>	
			)
		} else {
			return null;	
		}
	}
}
const WrappedNewVersionInfo = Form.create()(connect((state) => {
	return {
		appInfo: state.appInfo,
		version: state.version,
	}
}, (dispatch) => {
	return {
		appInfoActions: bindActionCreators(appInfoActions, dispatch),
		versionActions: bindActionCreators(versionActions, dispatch),
	}
})(NewVersionInfo));


const FormItem = Form.Item;
const Option = Select.Option;

class ModifyForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
		let token = window.localStorage.getItem('token');
		let icon_50 = '', icon_50_path = '', icon_100 = '', icon_100_path = '', icon_200 = '', icon_200_path = '';
		if(values.upload50 && values.upload50.length > 0) {
			icon_50 = values.upload50[values.upload50.length - 1]['name'];
			icon_50_path = values.upload50[values.upload50.length - 1].response ? values.upload50[values.upload50.length - 1].response.files['icon50'][0].path : '';
		}
		if(values.upload100 && values.upload100.length > 0) {
			icon_100 = values.upload100[values.upload100.length - 1]['name'];
			icon_100_path = values.upload100[values.upload100.length - 1].response ? values.upload100[values.upload100.length - 1].response.files['icon100'][0].path : '';
		}
		if(values.upload200 && values.upload200.length > 0) {
			icon_200 = values.upload200[values.upload200.length - 1]['name'];
			icon_200_path = values.upload200[values.upload200.length - 1].response ? values.upload200[values.upload200.length - 1].response.files['icon200'][0].path : '';
		}
		this.props.appInfoActions.updateAppInfo({token, appId: values['appId'], appnameEn: values['appnameEn'], appnameCn: values['appnameCn'], type: values['type']
			, desc: values['desc'], icon_50, icon_100, icon_200, icon_50_path, icon_100_path, icon_200_path})
		.then(() => { Modal.info({
    title: '提示',
    content: (
      <div>
        修改成功！
      </div>
    ),
    onOk() {},
  });}).catch(err => console.log(err));
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  componentDidMount() {
	if(this.props.modify) {
		let token = window.localStorage.getItem('token');
		this.props.appInfoActions.getAppInfoById(token, this.props.appId).catch((err) => console.log(err));
	} else {
		//
	}
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
		<FormItem>{getFieldDecorator('appId')(
          <Input type='hidden'/>)}</FormItem>
	    <FormItem
          {...formItemLayout}
          label="英文名称"
        >{getFieldDecorator('appnameEn')(<Input disabled/>)}
        </FormItem>

		<FormItem
          {...formItemLayout}
          label="中文名称"
        >{getFieldDecorator('appnameCn')(<Input disabled/>)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="应用类型"
          hasFeedback
        >
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: '请选择类型!' },
            ],
          })(
			<Radio.Group>
              <Radio.Button value="1">企业类</Radio.Button>
              <Radio.Button value="2">普通用户类</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="应用说明"
        >
          {getFieldDecorator('desc')(
            <Input type="textarea" rows={8} maxLength='800'/>
          )}
        </FormItem>
		
        <FormItem
          {...formItemLayout}
          label="图标1"
          extra="50*50图标,如果上传了多个,只会选择最后一个图标."
        >
          {getFieldDecorator('upload50', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="icon50" action="/fileUpload" listType="picture" multiple={false} accept="image/*" onChange={({file, fileList, event}) => {
				if(file.status === 'done') {
				}
			}}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
		
		<FormItem
          {...formItemLayout}
          label="图标2"
          extra="100*100图标,如果上传了多个,只会选择最后一个图标."
        >
          {getFieldDecorator('upload100', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="icon100" action="/fileUpload" listType="picture" multiple={false} accept="image/*" onChange={({file, fileList, event}) => {
				if(file.status === 'done') {
				}
			}}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>

		<FormItem
          {...formItemLayout}
          label="图标3"
          extra="200*200图标,如果上传了多个,只会选择最后一个图标."
        >
          {getFieldDecorator('upload200', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="icon200" action="/fileUpload" listType="picture" multiple={false} accept="image/*" onChange={({file, fileList, event}) => {
				if(file.status === 'done') {
				}
			}}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
        
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit" disabled={this.props.appInfo.loading ? true : false}>{this.props.appInfo.loading ? '保存中...' : '保存'}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
		  <Link to={`${this.props.url}`}><Button type="default">返回我的应用</Button></Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedForm = connect((state) => {
	return {
		appInfo: state.appInfo,
	}
}, (dispatch) => {
	return {
		appInfoActions: bindActionCreators(appInfoActions, dispatch),
	}
})(createForm({
  mapPropsToFields(props) {
    //console.log('mapPropsToFields', props);
	let upload50_v = '', upload100_v = '', upload200_v = '';
	if(props.appInfo.data.icon_50) {
		let name = props.appInfo.data.icon_50.split('/');
		name = name[name.length - 1];
		upload50_v = [{uid: -1, name: name, status: 'done', url: '/public/files' + props.appInfo.data.icon_50}];
	}
	if(props.appInfo.data.icon_100) {
		let name = props.appInfo.data.icon_100.split('/');
		name = name[name.length - 1];
		upload100_v = [{uid: -1, name: name, status: 'done', url: '/public/files' + props.appInfo.data.icon_100}];
	}
	if(props.appInfo.data.icon_200) {
		let name = props.appInfo.data.icon_200.split('/');
		name = name[name.length - 1];
		upload200_v = [{uid: -1, name: name, status: 'done', url: '/public/files' + props.appInfo.data.icon_200}];
	}
    return {
      appId: {value: props.appInfo.data.appId},
	  appnameEn: {value: props.appInfo.data.appnameEn},
	  appnameCn: {value: props.appInfo.data.appnameCn},
	  type: {value: props.appInfo.data.type + ''},
	  desc: {value: props.appInfo.data.desc},
      upload50: {value: upload50_v},
	  upload100: {value: upload100_v},
      upload200: {value: upload200_v},
    };
  },
  onFieldsChange(props, fields) {
    //console.log('onFieldsChange', fields);
  },
})(ModifyForm));


class AddForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
		let token = window.localStorage.getItem('token');
		let icon_50 = '', icon_50_path = '', icon_100 = '', icon_100_path = '', icon_200 = '', icon_200_path = '';
		if(values.upload50) {
			icon_50 = values.upload50[values.upload50.length - 1]['name'];
			icon_50_path = values.upload50[values.upload50.length - 1].response ? values.upload50[values.upload50.length - 1].response.files['icon50'][0].path : '';
		}
		if(values.upload100) {
			icon_100 = values.upload100[values.upload100.length - 1]['name'];
			icon_100_path = values.upload100[values.upload100.length - 1].response ? values.upload100[values.upload100.length - 1].response.files['icon100'][0].path : '';
		}
		if(values.upload200) {
			icon_200 = values.upload200[values.upload200.length - 1]['name'];
			icon_200_path = values.upload200[values.upload200.length - 1].response ? values.upload200[values.upload200.length - 1].response.files['icon200'][0].path : '';
		}
		this.props.appInfoActions.addAppInfo({token, appnameEn: values['appnameEn'], appnameCn: values['appnameCn'], type: values['type']
			, desc: values['desc'], icon_50, icon_100, icon_200, icon_50_path, icon_100_path, icon_200_path})
		.then(() => { Modal.info({
    title: '提示',
    content: (
      <div>
        保存成功！
      </div>
    ),
    onOk() {},
  });}).catch(err => console.log(err));
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  componentDidMount() {
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
		<FormItem>{getFieldDecorator('appId')(
          <Input type='hidden'/>)}</FormItem>
	    <FormItem
          {...formItemLayout}
          label="英文名称"
        >{getFieldDecorator('appnameEn', {
            rules: [
              { required: true, pattern:  /^[A-Za-z0-9\s]+$/ , message: '请输入英文名!' },
            ],
          })(<Input placeholder="应用英文名" maxLength='30'/>) }
        </FormItem>

		<FormItem
          {...formItemLayout}
          label="中文名称"
        >{getFieldDecorator('appnameCn', {
            rules: [
              { required: true, message: '请输入中文名!' },
            ],
          })(
          <Input placeholder="应用英文名" maxLength='30'/>) }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="应用类型"
        >
          {getFieldDecorator('type', {
			initialValue: '1',
          })(
			<Radio.Group >
              <Radio.Button value="1">企业类</Radio.Button>
              <Radio.Button value="2">普通用户类</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="应用说明"
        >
          {getFieldDecorator('desc')(
            <Input type="textarea" rows={8} maxLength='800'/>
          )}
        </FormItem>
		
        <FormItem
          {...formItemLayout}
          label="图标1"
          extra="50*50图标,如果上传了多个,只会选择最后一个图标."
        >
          {getFieldDecorator('upload50', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="icon50" action="/fileUpload" listType="picture" multiple={false} accept="image/*" onChange={({file, fileList, event}) => {
				if(file.status === 'done') {
				}
			}}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
		
		<FormItem
          {...formItemLayout}
          label="图标2"
          extra="100*100图标,如果上传了多个,只会选择最后一个图标."
        >
          {getFieldDecorator('upload100', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="icon100" action="/fileUpload" listType="picture" multiple={false} accept="image/*" onChange={({file, fileList, event}) => {
				if(file.status === 'done') {
				}
			}}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>

		<FormItem
          {...formItemLayout}
          label="图标3"
          extra="200*200图标,如果上传了多个,只会选择最后一个图标."
        >
          {getFieldDecorator('upload200', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="icon200" action="/fileUpload" listType="picture" multiple={false} accept="image/*" onChange={({file, fileList, event}) => {
				if(file.status === 'done') {
				}
			}}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
        
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit" disabled={this.props.appInfo.loading ? true : false}>{this.props.appInfo.loading ? '保存中...' : '保存'}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
		  <Link to={`${this.props.url}`}><Button type="default">返回我的应用</Button></Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddForm = connect((state) => {
	return {
		appInfo: state.appInfo,
	}
}, (dispatch) => {
	return {
		appInfoActions: bindActionCreators(appInfoActions, dispatch),
	}
})(Form.create()(AddForm));

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
		login: state.login,
		appInfo: state.appInfo,
		version: state.version,
	}
}, (dispatch) => {
	return {
		appInfoActions: bindActionCreators(appInfoActions, dispatch),
		versionActions: bindActionCreators(versionActions, dispatch),
	}
})(Myapp);

