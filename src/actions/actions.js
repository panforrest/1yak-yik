import constants from '../constants/constants'

export default {
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
	}
}