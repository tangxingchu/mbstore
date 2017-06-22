import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Container from '../component/store/Container';

require('antd/dist/antd.min.css');
require('../store.css');

var app;

app = document.createElement('div');
app.style.height = '100%';
document.body.appendChild(app);


ReactDOM.render(
	(<Container/>),
    app
);