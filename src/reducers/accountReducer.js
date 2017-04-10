import constants from '../constants/constants'

var initialState = {
	user: null 
	// user: {}
}

export default (state=initialState, action) => {
	var updated = Object.assign({}, state)  //let
	switch(action.type){
		case constants.CURRENT_USER_RECEIVED:		    
		    console.log('CURRENT_USER_RECEIVED: '+JSON.stringify(action.user))
		    var updatedUser = action.user
		    updated['user'] = updatedUser
		    return updated

		default: 
		    return state
	}
}