
const initState = {
	loading: null,
	data: [],
}

export default (state = initState, action) => {
	switch(action.type) {
		case 'GETALLLIST':
			return Object.assign({}, state, {
				loading: false,
				data: action.data,
			  });
			break;
		case 'GETALLLIST_PENDING':
			return Object.assign({}, state, {
				loading: true,
			  });
		default: return state; break;
	}
}