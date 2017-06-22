
import Channel from '../channel'

const addAppInfo = (appInfo) => {
	return (dispatch, getState) => {
		dispatch({type: 'ADDAPPINFO_PENDING'});
		fetch('/saveImages', {method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}, body : 'token=' + appInfo.token + '&appnameEn=' + appInfo.appnameEn + '&icon_50=' + appInfo.icon_50 + '&icon_100=' 
				+ appInfo.icon_100 + '&icon_200=' + appInfo.icon_200 + '&icon_50_path=' + appInfo.icon_50_path 
				+ '&icon_100_path=' + appInfo.icon_100_path + '&icon_200_path=' + appInfo.icon_200_path }).then(response => response.json());
		var channel = new Channel();
		if(appInfo.icon_50) appInfo.icon_50 = '/' + appInfo.appnameEn + '/' + appInfo.icon_50;
		if(appInfo.icon_100) appInfo.icon_100 = '/' + appInfo.appnameEn + '/' + appInfo.icon_100;
		if(appInfo.icon_200) appInfo.icon_200 = '/' + appInfo.appnameEn + '/' + appInfo.icon_200;
		return channel.addAppInfo(appInfo).then(data => {
			return dispatch({
				type: 'ADDAPPINFO',
				data: data,
			});
		})
	}
}

const updateAppInfo = (appInfo) => {
	console.log('updateAppInfo', appInfo);
	return (dispatch, getState) => {
		fetch('/saveImages', {method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}, body : 'token=' + appInfo.token + '&appnameEn=' + appInfo.appnameEn + '&icon_50=' + appInfo.icon_50 + '&icon_100=' 
				+ appInfo.icon_100 + '&icon_200=' + appInfo.icon_200 + '&icon_50_path=' + appInfo.icon_50_path 
				+ '&icon_100_path=' + appInfo.icon_100_path + '&icon_200_path=' + appInfo.icon_200_path }).then(response => response.json());
		var channel = new Channel();
		if(appInfo.icon_50) appInfo.icon_50 = '/' + appInfo.appnameEn + '/' + appInfo.icon_50;
		if(appInfo.icon_100) appInfo.icon_100 = '/' + appInfo.appnameEn + '/' + appInfo.icon_100;
		if(appInfo.icon_200) appInfo.icon_200 = '/' + appInfo.appnameEn + '/' + appInfo.icon_200;
		return channel.updateAppInfo(appInfo).then(data => {
			return dispatch({
				type: 'UPDATEAPPINFO',
				data: appInfo,
			});
		})
	}
}


const getAppInfoById = (token, appId) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.getAppInfoById(token, appId).then(data => {
			return dispatch({
				type: 'QUERY',
				data: data,
			});
		})
	}
}

const getMyAppInfo = (token) => {
	return (dispatch, getState) => {
		dispatch({type: 'GETMYAPPINFO_PENDING'});
		var channel = new Channel();
		return channel.getMyAppInfo(token).then(data =>
			dispatch({
				type: 'GETMYAPPINFO',
				data: data,
			})
		);
	}
}

const delAppInfoById = (token, appId) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.deleteAppInfoById(token, appId).then(data => {
			let q_data = getState().appInfo.q_data;
			let new_q_data = q_data.filter(v => v.appId !== appId);
			return dispatch({
				type: 'DELETE',
				data: new_q_data,
			});
		})
	}
}

const showCVModal = (appId) => {
	return (dispatch, getState) => {
		dispatch({type: 'SHOW_CVModal', data: {appId}});
	}
}

const showDetail = (appId) => {
	return (dispatch, getState) => {
		dispatch({type: 'SHOW_DETAIL', data: {appId}});
	}
}

export default {
	addAppInfo,
	getMyAppInfo,
	updateAppInfo,
	getAppInfoById,
	delAppInfoById,
	showCVModal,
	showDetail,
}