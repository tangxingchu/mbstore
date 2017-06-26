
import createReducers from '../utils/createReducers'
import {Extensions} from '../utils/constants'

const initState = {
	loading: null,
	data: [],
}

const extensionHandler = {
	[Extensions.GETALLLIST]: (state, action) => {
		return Object.assign({}, state, {
			loading: false,
			data: action.data,
		});
	},
	[Extensions.GETALLLIST_PENDING]: (state, action) => {
		return Object.assign({}, state, {
			loading: true,
		});
	},
}


export default createReducers(initState, extensionHandler);