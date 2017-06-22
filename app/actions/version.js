	
import Channel from '../channel'

const createVersion = (versionInfo) => {
	return (dispatch, getState) => {
		dispatch({type: 'CREATEVERSION_PENDING'});
		var channel = new Channel();
		return channel.createVersion(versionInfo).then(data =>
			dispatch({
				type: 'CREATEVERSION',
				data: data,
			})
		).catch(err => {alert(err);})
	}
}

const queryVersions = (token, appId) => {
	return (dispatch, getState) => {
		dispatch({type: 'QUERY_PENDING', data: {'appId': appId}});
		if(getState().version.v_data[appId]) {
			return dispatch({
				type: 'QUERY',
				data: {'appId': appId, 'data' : getState().version.v_data[appId]},
			});
		} else {
			var channel = new Channel();
			return channel.queryVersion(token, appId).then(data =>
				dispatch({
					type: 'QUERY',
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