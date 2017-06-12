import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Container from '../component/store/Container';
import { Router, Route, hashHistory } from 'react-router';

require('antd/dist/antd.min.css');

var app;

app = document.createElement('div');
app.style.height = '100%';
document.body.appendChild(app);


ReactDOM.render(
	/*(<Router history={hashHistory}>
		<Route path="/" compontent={Container}/>
	</Router>),*/
	<Container/>,
    app
);