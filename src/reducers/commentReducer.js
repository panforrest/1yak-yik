import constants from '../constants/constants'

var initialState = {
	commentsLoaded: false,
	list: [],
	comment: {},
    map: {}  //TO STORE ALL THE COMMENTS HERE, NO LONGER ARRAY, BUT OBJECT WITH ARRAYS WITH KEYS
}

export default (state=initialState, action) => {
    var updated = Object.assign({}, state)
	switch(action.type){
		case constants.COMMENTS_RECEIVED:
            // let updated = Object.assign({}, state)
		    // console.log('COMMENTS_RECEIVED: '+JSON.stringify(action.comments))
      //       console.log('COMMENTS_RECEIVED FROM ZONE: '+JSON.stringify(action.zone))
            updated['list'] = action.comments

            let updatedMap = Object.assign({}, updated.map)
            // let zoneComments = (updatedMap[action.zone._id]) ? Object.assign([], updatedMap[action.zone._id]) : []
            // NOW USE THE ZONE OBJECT TO CALL
            console.log('UPDATED MAP: '+updatedMap)
            let zoneComments = updatedMap[action.zone._id]
            if (zoneComments == null){
                zoneComments = []
            }
            else {
                zoneComments = Object.assign([], zoneComments)
            }

            action.comments.forEach((comment, i) => {
                zoneComments.push(comment)
            })

            updatedMap[action.zone._id] = zoneComments
            updated['map'] = updatedMap
            updated['commentsLoaded'] = true

            console.log('COMMENTS_RECEIVED: '+JSON.stringify(updated))

            return updated

        case constants.COMMENT_CREATED:
            console.log('COMMENT_CREATED: '+JSON.stringify(action.comment))  
            let updatedList = Object.assign([], updated.list)    //I AM SO STUPID FIRSTPLACE = Object.assign([], state) 
            updatedList.push(action.comment)
            updated['list'] = updatedList   //I AM SO STUPID FIRSTPLACE updated['list'] = updatedList.list 
            // console.log('COMMENT_CREATED: '+JSON.stringify(updatedList))
            return updated 

        case constants.SELECT_ZONE:
            // console.log('SELECT_ZONE: '+JSON.stringify(action.selectedZone))    //+JSON.stringify(action.index)
            updated['commentsLoaded'] = false
            return updated

		default:
		    return state
	}
}