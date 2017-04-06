import constants from '../constants/constants'

var initialState = {

	list: []   //zones: null

} 

export default (state=initialState, action) => {
	// let updated = Object.assign([], state)
	switch(action.type) {    //switch(action.type) => {
        case constants.ZONES_RECEIVED:
            let updated = Object.assign({}, state)  //let updated = Object.assign([], state)
            updated['list'] = action.zones
            console.log('ZONES_RECEIVED: '+JSON.stringify(action.zones))
            return updated

        default:
            return state
	}
}