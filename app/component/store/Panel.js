import React, {Component} from 'react';
import {Input} from 'antd';

export default class Panel extends Component {
    
    constructor(props) {
        super(props);
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
            </div>
        )
    }
}
