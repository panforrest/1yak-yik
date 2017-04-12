import constants from '../constants/constants'

var initialState = {
    list: [],
    map: {}
}

export default (state=initialState, action) => {
    var updated = Object.assign({}, state)
           
	switch(action.type){
		case constants.PROFILE_RECEIVED:

		    console.log('PROFILE_RECEIVED'+JSON.stringify(action.profile))

		    let updatedList = Object.assign([], updated.list)//let updatedList = Object.assign([], updated.profile)
		    updatedList.push(action.profile)
		    updated['list'] = updatedList

		    let updatedMap = Object.assign({}, state.map)
		    updatedMap[action.profile.username] = action.profile
            updated['map'] = updatedMap

		    // updated['list'] = action.profile
		    return updated

		case constants.APPLICATION_STATE:

            console.log('APPLICATION_STATE: '+JSON.stringify(action.status))    //+JSON.stringify(action.profile))
		    return updated

		default:
		    return state    
	}
}

