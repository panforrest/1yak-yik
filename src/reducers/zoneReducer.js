import constants from '../constants/constants'

var initialState = {

	list: []

}

export default (state=initialState, action)=> {
    
	switch(action.type){
		case constants.ZONES_RECEIVED:
		    let updated = Object.assign([], state)
		    console.log('ZONES_RECEIVED: '+JSON.stringify(action.zones))
		    updated['list'] = action.zones
		    return updated  //THIS IS THE EQUIVALENT TO this.setState({...})

		default:
		    return state    
	}
}

