import React, {Component} from 'react';
import {Row, Col} from 'antd';
import Panel from './Panel';
import Header from './Header';
import Extensions from './Extensions';
import Login from './Login';
import Myapp from './Myapp';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../../reducers';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, logger));

export default class Container extends Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
		<Provider store={store}>
			<Router>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<Row>
							<Col span={6}>
								<Route path="/:id" render={({match, location}) => {
									if(match.url.indexOf('/extensions') > -1 || match.url.indexOf('/themes') > -1) {
										return (<Panel match={match} location={location} condition></Panel>);
									} else {
										return (<Panel match={match} location={location}></Panel>);
									}
								}}/>
							</Col>
							<Col span={18}>
							  <Route path="/:id" component={Header}/>
							  <Route path='/extensions' render={() => <Extensions type={1}/>}></Route>
			                  <Route path='/themes' render={() => <Extensions type={2}/>}></Route>
							  <Route path='/login' component={ Login }></Route>
							  <Route path='/myapps' component={ Myapp }></Route>
							</Col>
						</Row>
					</Col>
					<Col span={2}></Col>
				</Row>
			</Router>
		</Provider>
        )
    }
}
