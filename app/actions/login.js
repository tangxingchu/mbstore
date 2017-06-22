
import Channel from '../channel'

const login = (username, password) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.login(username, password).then(function(data){
			if(data.success) {
				window.localStorage.setItem("token", data.token);
				window.localStorage.setItem("username", username);
				data = Object.assign({}, data, {username: username});
				return dispatch({
					type: 'LOGINSUCESS',
					data: data,
				});	
			} else {
				return dispatch({
					type: 'LOGINFAILED',
					data: data,
				});
			}
			
		})
	}
}

const logout = () => {
	return (dispatch, getState) => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("username");
		dispatch({type: 'LOGOUT'});
	}
}

const changeuser = () => {
	return (dispatch, getState) => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("username");
		dispatch({type: 'CHANGEUSER'});
	}
}

const loginByToken = (token) => {
	return (dispatch, getState) => {
		let data = Object.assign({}, {}, {username: window.localStorage.getItem("username")});
		dispatch({
			type: 'LOGINSUCESS',
			data: data,
		});	
	}
}

export default {
	login,
	logout,
	changeuser,
	loginByToken,
}