
const initState = {
	isLogin: false,
	loginstatus: true,
	data: null,
	changeuser: false,
}

export default (state = initState, action) => {
	switch(action.type) {
		case 'LOGINSUCESS':
			return Object.assign({}, state, {
				loginstatus: true,
				data: action.data,
				changeuser: false,
				isLogin: true,
			  });
			break;
		case 'LOGINFAILED':
			return Object.assign({}, state, {
				loginstatus: false,
				data: action.data,
				changeuser: false,
				isLogin: false,
			  });
		case 'LOGOUT': 
			return Object.assign({}, state, {
				loginstatus: true,
				data: action.data,
				changeuser: false,
				isLogin: false,
			  });
		case 'CHANGEUSER': 
			return Object.assign({}, state, {
				loginstatus: true,
				data: action.data,
				changeuser: true,
				isLogin: false,
			  });
		default: return state; break;
	}
}