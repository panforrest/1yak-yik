import constants from '../constants/constants'
import { APIManager } from '../utils'

export default {

    fetchProfile: (params) => {
    	return (dispatch) => {

    		dispatch({
    			type: constants.APPLICATION_STATE,
    			status: 'loading'
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