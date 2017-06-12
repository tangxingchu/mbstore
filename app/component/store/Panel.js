import React, {Component} from 'react';
import {Input} from 'antd';
import Category from './Category';
import {
  NavLink
} from 'react-router-dom'

export default class Panel extends Component {
    
    constructor(props) {
        super(props);
		this.state = {active: "extensions"};
    }
	
	setActive = name => {
		this.setState({active: name});
	}

    render () {
        return (
            <div style={{border: '1px solid #bdbdbd', background: '#ececec', paddingLeft: 15, paddingRight: 15, paddingTop: 5}}>
            	
            	<div style={{height: 40}}>
            		<img src="/public/image/cmschina.png" style={{width:30, height: 30, borderRadius: 15, marginTop: 5, marginRight: 5}} alt="招证应用市场"/>
            		

            		<span style={{fontSize:16, position: 'relative', bottom: 10}}>招证应用市场</span>
            	</div>

            	<div style={{marginTop: 10}}>
            		<Input placeholder="搜索应用" style={{height: 35, fontSize: 16}} />
            	</div>
				
				<Category name="扩展程序" to="/extensions" active={this.state.active === 'extensions'}></Category>

				<Category name="主题背景" to="/themes" active={this.state.active === 'themes'}></Category>

				<Category name="应用" to="/apps" active={this.state.active === 'apps'}></Category>

				<Category name="游戏" to="/games" active={this.state.active === 'games'}></Category>


				
            </div>
        )
    }
}

const styles = {
	
};