
import createReducers from '../utils/createReducers'
import {Login} from '../utils/constants'

const initState = {
	isLogin: false,
	loginstatus: true,
	data: null,
	changeuser: false,
}

const loginHandler = {
	[Login.LOGINSUCESS]: (state, action) => {
		return Object.assign({}, state, {
			loginstatus: true,
			data: action.data,
			changeuser: false,
			isLogin: true,
		});
	},
	[Login.LOGINFAILED]: (state, action) => {
		return Object.assign({}, state, {
			loginstatus: false,
			data: action.data,
			changeuser: false,
			isLogin: false,
		});
	},
	[Login.LOGOUT]: (state, action) => {
		return Object.assign({}, state, {
			loginstatus: true,
			data: action.data,
			changeuser: false,
			isLogin: false,
		});
	},
	[Login.CHANGEUSER]: (state, action) => {
		return Object.assign({}, state, {
			loginstatus: true,
			data: action.data,
			changeuser: true,
			isLogin: false,
		});
	},
}

export default createReducers(initState, loginHandler);