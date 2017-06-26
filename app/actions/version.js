	
import Channel from '../channel'
import {Version} from '../utils/constants'

const createVersion = (versionInfo) => {
	return (dispatch, getState) => {
		dispatch({type: Version.CREATEVERSION_PENDING});
		var channel = new Channel();
		return channel.createVersion(versionInfo).then(data =>
			dispatch({
				type: Version.CREATEVERSION,
				data: data,
			})
		).catch(err => console.log(err))
	}
}

const queryVersions = (token, appId) => {
	return (dispatch, getState) => {
		dispatch({type: Version.QUERYVERSION_PENDING, data: {'appId': appId}});
		if(getState().version.v_data[appId]) {
			return dispatch({
				type: Version.QUERYVERSION,
				data: {'appId': appId, 'data' : getState().version.v_data[appId]},
			});
		} else {
			var channel = new Channel();
			return channel.queryVersion(token, appId).then(data =>
				dispatch({
					type: Version.QUERYVERSION,
					data: {'appId' : appId, 'data': data},
				})
			)
		}		
	}
}


export default {
	createVersion,
	queryVersions,
}