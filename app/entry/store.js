import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Container from '../component/store/Container';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

require('antd/dist/antd.min.css');

var app;

app = document.createElement('div');
app.style.height = '100%';
document.body.appendChild(app);


ReactDOM.render(
	(<Router>
	  <Route path='/' component={ Container }>
	  </Route>
	</Router>),
    app
);