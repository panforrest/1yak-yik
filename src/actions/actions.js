import constants from '../constants/constants'

export default {
	zonesReceived: (zones) => {
        return {
            type: constants.ZONES_RECEIVED,    //action: constants.ZONES_RECEIVED,
            zones: zones    //type: zones
        }
	},

	commentsReceived: (comments) => {
		return {
			type: constants.COMMENTS_RECEIVED,   //action: constants.COMMENTS_RECEIVED,
			comments: comments     //type: comments
		}
	}
}