
import createReducers from '../utils/createReducers'
import {Version} from '../utils/constants'

const initState = {
	data: null,
	loading: false,
	v_loading: {},
	v_data: {},
}

const versionHandler = {
	[Version.CREATEVERSION_PENDING]: (state, action) => {
		return Object.assign({}, state, {
			loading: true,
		});
	},
	[Version.CREATEVERSION]: (state, action) => {
		state.v_data[action.data.appId] ? state.v_data[action.data.appId].push(action.data) : '';
		return Object.assign({}, state, {
			loading: false,
			data: action.data,
		});
	},
	[Version.QUERYVERSION_PENDING]: (state, action) => {
		state.v_loading[action.data.appId] = true;
		return Object.assign({}, state);
	},
	[Version.QUERYVERSION]: (state, action) => {
		state.v_data[action.data.appId] = action.data.data;
		state.v_loading[action.data.appId] = false;
		return Object.assign({}, state);
	},
}

export default createReducers(initState, versionHandler);