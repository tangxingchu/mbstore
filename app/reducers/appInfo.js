
import createReducers from '../utils/createReducers'
import {AppInfo} from '../utils/constants'


const initState = {
	u_loading: {},
	q_loading: false,
	q_data: [],
	loading: null,
	data: {},
	currAppId: null,
}

const appInfoHandler = {
	[AppInfo.ADDAPPINFO]: (state, action) => {
		state.q_data.push(action.data);
		return Object.assign({}, state, {
			loading: false,
			data: action.data,
		});
	},
	[AppInfo.UPDATEAPPINFO]: (state, action) => {
		let idx = state.q_data.findIndex(d => d.app_id === action.data.app_id);
		state.q_data.splice(idx, 1, action.data);
		return Object.assign({}, state, {
			loading: false,
			data: action.data,
		});
	},
	[AppInfo.UPDATEAPPINFO_PENDING]: (state, action) => {
		return Object.assign({}, state, {
			loading: true,
		});
	},
	[AppInfo.ADDAPPINFO_PENDING]: (state, action) => {
		return Object.assign({}, state, {
			loading: true,
		});
	},
	[AppInfo.GETMYAPPINFO_PENDING]: (state, action) => {
		return Object.assign({}, state, {
			q_loading: true,
		});
	},
	[AppInfo.GETMYAPPINFO]: (state, action) => {
		return Object.assign({}, state, {
			q_loading: false,
			q_data: action.data,
		});
	},
	[AppInfo.SHOW_CVModal]: (state, action) => {
		return Object.assign({}, state, {
			currAppId: action.data.appId,
		});
	},
	[AppInfo.DELETE]: (state, action) => {
		return Object.assign({}, state, {
			q_data: action.data,
		});
	},
	[AppInfo.QUERYAPP_PENDING]: (state, action) => {
		return Object.assign({}, state, {
			q_loading: true,
		});
	},
	[AppInfo.QUERYAPP]: (state, action) => {
		return Object.assign({}, state, {
			data: action.data[0],
			q_loading: false,
		});
	},
	[AppInfo.UPDATERECOMMEND_PENDING]: (state, action) => {
		state.u_loading[action.data] = true;
		return Object.assign({}, state);
	},
	[AppInfo.UPDATERECOMMEND]: (state, action) => {
		let idx = state.q_data.findIndex(d => d.app_id === action.data);
		if(state.q_data[idx].recommend === 1) {
			state.q_data[idx].recommend = 0;
		} else {
			state.q_data[idx].recommend = 1;
		}
		state.u_loading[action.data] = false;
		return Object.assign({}, state);
	},
}

export default createReducers(initState, appInfoHandler);