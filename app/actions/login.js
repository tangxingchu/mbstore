
import Channel from '../channel'
import {Login} from '../utils/constants'

const login = (username, password) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.login(username, password).then(data => {
			if(data.success) {
				window.localStorage.setItem("token", data.token);
				window.localStorage.setItem("username", username);
				data = Object.assign({}, data, {username: username});
				return dispatch({
					type: Login.LOGINSUCESS,
					data,
				});	
			} else {
				return dispatch({
					type: Login.LOGINFAILED,
					data,
				});
			}
			
		})
	}
}

const logout = () => {
	return (dispatch, getState) => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("username");
		dispatch({type: Login.LOGOUT});
	}
}

const changeuser = () => {
	return (dispatch, getState) => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("username");
		dispatch({type: Login.CHANGEUSER});
	}
}

const loginByToken = (token) => {
	return (dispatch, getState) => {
		let data = Object.assign({}, {}, {username: window.localStorage.getItem("username")});
		dispatch({
			type: Login.LOGINSUCESS,
			data,
		});	
	}
}

export default {
	login,
	logout,
	changeuser,
	loginByToken,
}