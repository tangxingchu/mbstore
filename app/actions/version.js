	
import Channel from '../channel'
import {Version} from '../utils/constants'

const createVersion = (versionInfo) => {
	return (dispatch, getState) => {
		dispatch({type: Version.CREATEVERSION_PENDING});
		var channel = new Channel();
		return channel.createVersion(versionInfo).then(data =>
			dispatch({
				type: Version.CREATEVERSION,
				data,
			})
		).catch(err => console.log(err))
	}
}

const queryVersions = (token, appId) => {
	return (dispatch, getState) => {
		dispatch({type: Version.QUERYVERSION_PENDING, data: {appId}});
		if(getState().version.v_data[appId]) {
			return dispatch({
				type: Version.QUERYVERSION,
				data: {appId, 'data' : getState().version.v_data[appId]},
			});
		} else {
			var channel = new Channel();
			return channel.queryVersion(token, appId).then(data =>
				dispatch({
					type: Version.QUERYVERSION,
					data: {appId, data},
				})
			)
		}		
	}
}

const deleteVersion = (token, appId, versionNo) => {
	return (dispatch, getState) => {
		var channel = new Channel();
		return channel.deleteVersion(token, appId, versionNo).then(data => {
			let q_data = getState().version.v_data[appId];
			let new_q_data = q_data.filter(v => v.versionNo !== versionNo);
			dispatch({
				type: Version.DELETEVERSION,
				data: {appId, data: new_q_data},
			})
		}).catch(err => console.log(err))
	}
}

export default {
	createVersion,
	queryVersions,
	deleteVersion,
}