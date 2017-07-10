
import Channel from '../channel'
import {Extensions} from '../utils/constants'

const getAppList = (type) => {
	return (dispatch, getState) => {
		dispatch({type: Extensions.GETALLLIST_PENDING});
		var channel = new Channel();
		return channel.getAllList(type).then(data => {
			return dispatch({
				type: Extensions.GETALLLIST,
				data,
			});
		})
	}
}

const filter = (v) => {
	return (dispatch, getState) => {
		dispatch({type: Extensions.GETALLLIST_PENDING});
		let data = getState().extensions.data.filter(item => item.appname_en.indexOf(v) > -1 || item.appname_cn.indexOf(v) > -1);
		return Promise.resolve(dispatch({type: Extensions.GETALLLIST, data}));
	}
}

export default {
	getAppList,
	filter,
}