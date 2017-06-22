
import Channel from '../channel'

const getAppList = (type) => {
	return (dispatch, getState) => {
		dispatch({type: 'GETALLLIST_PENDING'});
		var channel = new Channel();
		return channel.getAllList(type).then(function(data){
			return dispatch({
				type: 'GETALLLIST',
				data: data,
			});
		})
	}
}

const filter = (v) => {
	return (dispatch, getState) => {
		dispatch({type: 'GETALLLIST_PENDING'});
		let data = getState().extensions.data.filter(item => item.appnameEn.indexOf(v) > -1 || item.appnameCn.indexOf(v) > -1);
		dispatch({type: 'GETALLLIST', data: data});
	}
}

export default {
	getAppList,
	filter,
}