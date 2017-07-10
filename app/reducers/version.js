
import createReducers from '../utils/createReducers'
import {Version} from '../utils/constants'

const initState = {
	data: null,
	loading: false,
	v_loading: {},
	v_data: {},
	rollback: {},
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
	[Version.CREATEVERSION_ERROR]: (state, action) => {
		return Object.assign({}, state, {
			loading: false,
		});
	},
	[Version.QUERYVERSION_PENDING]: (state, action) => {
		state.v_loading[action.data.appId] = true;
		return Object.assign({}, state);
	},
	[Version.QUERYVERSION_CACHE]: (state, action) => {
		state.v_data[action.data.appId] = action.data.data;
		state.v_loading[action.data.appId] = false;
		return Object.assign({}, state);
	},
	[Version.QUERYVERSION]: (state, action) => {
		state.v_data[action.data.appId] = action.data.data;
		state.v_loading[action.data.appId] = false;
		state.rollback[action.data.appId] = action.data.rollback;
		return Object.assign({}, state);
	},
	[Version.DELETEVERSION]: (state, action) => {
		state.v_data[action.data.appId] = action.data.data;
		return Object.assign({}, state);
	},
	[Version.ROLLBACKVERSION_PENDING]: (state, action) => {
		state.v_loading[action.data.appId] = true;
		return Object.assign({}, state);
	},
	[Version.ROLLBACKVERSION]: (state, action) => {
		state.v_data[action.data.appId] = action.data.data;
		return Object.assign({}, state);
	},
}

export default createReducers(initState, versionHandler);