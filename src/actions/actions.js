import constants from '../constants/constants'
import { APIManager } from '../utils'

export default {

    fetchProfile: (params) => {
    	return (dispatch) => {

    		dispatch({
    			type: constants.APPLICATION_STATE,
    			status: 'loading',
    			reducer: 'profile'
    		})

    		APIManager.get('/api/profile', params, (err, response)=> {
                if (err) {
                	console.log('ERR: '+err)
                	return
                }

                // console.log('fetchProfile: '+JSON.stringify(response))
	            if (response.results.length == 0){
	             alert('Profile Not Found.')
	             return
	            }

	            const profile = response.results[0]

                //artifically delay the callbakc:
                setTimeout(() => {
		            dispatch({
		            	type: constants.PROFILE_RECEIVED,
		            	profile: profile
		            })
                }, 3000)
    		})
    	}
    },

	zonesReceived: (zones) => {
        return {
            type: constants.ZONES_RECEIVED,    //action: constants.ZONES_RECEIVED,
            zones: zones    //type: zones
        }
	},

	commentsReceived: (comments, zone) => {
		return {
			type: constants.COMMENTS_RECEIVED,   //action: constants.COMMENTS_RECEIVED,
			comments: comments,     //type: comments
            zone: zone
		}
	},

	commentCreated: (comment) => {
		return {
			type: constants.COMMENT_CREATED,
			comment: comment
		}
	},

	fetchZones: (params) => {
		return (dispatch) => {
            dispatch({
            	type: constants.APPLICATION_STATE,
            	status: 'loading',
            	reducer: 'zone'
            })

			APIManager.get('/api/zone', params, (err, response) => {
				if (err) {
					alert('ERR: '+err)
					return
				}

				console.log('fetchZones: '+JSON.stringify(response))
				// this.props.zonesReceived(response)
				const zones = response.results  //MY ATTEMPT DIDN'T WORK BECAUSE I MISSED THIS LINE OF CODE

                setTimeout(() => {
					dispatch({
						type: constants.ZONES_RECEIVED,
	                    zones: zones
					})
                }, 3000)

			})
		} 
	},

	zoneCreated: (zone) => {
		return {
			type: constants.ZONE_CREATED,
			zone: zone
		}
	},

	selectZone: (index) => {   //selectZone: (zone) => {
		return {
			type: constants.SELECT_ZONE,
			selectedZone: index   //zone: index
		}
	},

	currentUserReceived: (user) => {
		return {
			type: constants.CURRENT_USER_RECEIVED,
			user: user
		}
	},

	updateProfile: (profile, updated) => { //updateProfile: (updated) => {
		return(dispatch) => {    //THIS IS THE ONE WAY DATA FLOW
		// 	dispatch({
		// 		type: constants.CURRENT_USER_RECEIVED
		// 		profile: profile
		// 	})
            const endpoint = '/api/profile/'+profile._id
		    APIManager.put(endpoint, updated, (err, response) => {
                if (err) {
                	alert('ERROR: '+JSON.stringify(err))
                	return
                }
                const updatedProfile = response.result
                dispatch({
                	type: constants.PROFILE_UPDATED,
                	profile: updatedProfile
                })
                // console.log('Profile Updated: '+JSON.stringify(response))
		    })	
		}
	},

	updateComment: (comment, params) => { 
		return(dispatch) => {    
            const endpoint = '/api/comment/'+comment._id
		    APIManager.put(endpoint, params, (err, response) => {
                if (err) {
                	alert('ERROR: '+JSON.stringify(err))
                	return
                }
                // const updatedComment = response.result
                // dispatch({
                // 	type: constants.COMMENT_UPDATED,
                // 	comment: updatedComment
                // })
                console.log('Comment Updated: '+JSON.stringify(response))
		    })	
		}
	}		

	// profileCreated: (profile) => {
	// 	return {
	// 		type: constants.PROFILE_CREATED,
	// 		profile: profile
	// 	}
	// }

	// profileReceived: (profile) => {
	// 	return{
	// 		type: constants.PROFILE_RECEIVED,
	// 		profile: profile
	// 	}
	// }
}