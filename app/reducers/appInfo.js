
const initState = {
	q_loading: false,
	q_data: [],
	loading: null,
	data: {},
	currAppId: null,
}

export default (state = initState, action) => {
	switch(action.type) {
		case 'ADDAPPINFO':
			state.q_data.push(action.data);
			return Object.assign({}, state, {
				loading: false,
				data: action.data,
			});
			break;
		case 'UPDATEAPPINFO':
			let idx = state.q_data.findIndex(d => d.appId === action.data.appId);
			state.q_data.splice(idx, 1, action.data);
			return Object.assign({}, state, {
				data: action.data,
			});
			break;
		case 'ADDAPPINFO_PENDING':
			return Object.assign({}, state, {
				loading: true,
			});
		case 'GETMYAPPINFO_PENDING':
			return Object.assign({}, state, {
				q_loading: true,
			});
		case 'GETMYAPPINFO':
			return Object.assign({}, state, {
				q_loading: false,
				q_data: action.data,
			});
		case 'SHOW_CVModal':
			return Object.assign({}, state, {
				currAppId: action.data.appId,
			});
		case 'DELETE':
			return Object.assign({}, state, {
				q_data: action.data,
			});
		case 'QUERY':
			return Object.assign({}, state, {
				data: action.data,
			});
		default: return state; break;
	}
}