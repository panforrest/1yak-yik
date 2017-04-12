import constants from '../constants/constants'

var initialState = {

	list: [],
    zone: {},
    selectedZone: 0,
    appStatus: 'ready'
}

export default (state=initialState, action)=> {
    var updated = Object.assign([], state)    
	switch(action.type){
		
		case constants.ZONES_RECEIVED:
		    // let updated = Object.assign([], state)
		    // console.log('ZONES_RECEIVED: '+JSON.stringify(action.zones))
		    updated['list'] = action.zones
		    updated['appStatus'] = 'ready'
		    return updated  //THIS IS THE EQUIVALENT TO this.setState({...})

		case constants.ZONE_CREATED: 
		    console.log('ZONE_CREATED: '+JSON.stringify(action.zone))

		    let updatedList = Object.assign([], updated.list)    //let updatedList = updated['list']
		    updatedList.push(action.zone)
		    updated['list'] = updatedList
		    return updated 

		case constants.SELECT_ZONE:
		    // console.log('SELECT_ZONE: '+JSON.stringify(action.selectedZone))    //+JSON.stringify(action.index)
            updated['selectedZone'] = action.selectedZone    //SHIT I AM SO STUPID: updated['index'] = action.index
            return updated

        case constants.APPLICATION_STATUS:
            if (action.reducer != 'zone') {
                return updated
            }
            updated['appStatus'] = action.appStatus
            return updated

		default:
		    return state    
	}
}

