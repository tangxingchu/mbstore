import React, {Component} from 'react';
import {Row, Col} from 'antd';
import Panel from './Panel';
import Header from './Header';
import Content from './Content';
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
  Link
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
					<Col span={4}></Col>
					<Col span={16}>
						<Row>
							<Col span={6}>
								<Panel>
								</Panel>
							</Col>
							<Col span={18}>
								<Header></Header>
							  <Route exact path='/' component={ Extensions }>
							  </Route>
			                  <Route path='/themes' component={ Themes }>
							  </Route>
			                  <Route path='/apps' component={ Apps }>
							  </Route>
			                  <Route path='/games' component={ Games }>
							  </Route>
							  <Route path='/login' component={ Login }>
							  </Route>
							  <Route path='/myapps' component={ MyappFunc }></Route>
							</Col>
						</Row>
					</Col>
					<Col span={4}></Col>
				</Row>
			</Router>
		</Provider>
        )
    }
}


const MyappFunc = ({match}) => (
	<Myapp url={match.url} />
)

const Themes = ({match}) => (
  <div>
    <h2>{match.url}</h2>
  </div>
)
const Apps = () => (
  <div>
    <h2>Apps</h2>
  </div>
)
const Games = () => (
  <div>
    <h2>Games</h2>
  </div>
)