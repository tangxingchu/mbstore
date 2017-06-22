
const initState = {
	data: null,
	loading: false,
	v_loading: {},
	v_data: {},
}

export default (state = initState, action) => {
	switch(action.type) {
		case 'CREATEVERSION_PENDING':
			return Object.assign({}, state, {
				loading: true,
			});
			break;
		case 'CREATEVERSION':
			state.v_data[action.data.appId] ? state.v_data[action.data.appId].push(action.data) : '';
			return Object.assign({}, state, {
				loading: false,
				data: action.data,
			});
			break;
		case 'QUERY_PENDING':
			state.v_loading[action.data.appId] = true;
			return Object.assign({}, state);
			break;
		case 'QUERY':
			state.v_data[action.data.appId] = action.data.data;
			state.v_loading[action.data.appId] = false;
			return Object.assign({}, state);
			break;
		default: return state; break;
	}
}