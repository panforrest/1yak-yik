import constants from '../constants/constants'

var initialState = {
	// commentsLoaded: false,
	// list: [],
	comment: {},
    map: {},  //TO STORE ALL THE COMMENTS HERE, NO LONGER ARRAY, BUT OBJECT WITH ARRAYS WITH KEYS
    // updated: {}
}

export default (state=initialState, action) => {
    var updated = Object.assign({}, state)
    let updatedMap = Object.assign({}, updated.map)
	switch(action.type){
		case constants.COMMENTS_RECEIVED:
            // let updated = Object.assign({}, state)
		    // console.log('COMMENTS_RECEIVED: '+JSON.stringify(action.comments))
      //       console.log('COMMENTS_RECEIVED FROM ZONE: '+JSON.stringify(action.zone))
            updated['list'] = action.comments
            // let updatedMap = Object.assign({}, updated.map)
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
            // updated['commentsLoaded'] = true

            // console.log('COMMENTS_RECEIVED: '+JSON.stringify(updated))

            return updated

        case constants.COMMENT_CREATED:
            console.log('COMMENT_CREATED: '+JSON.stringify(action.comment))  

            // let updatedMap = Object.assign({}, updated.map)
            let commentsList = updatedMap[action.comment.zone]
            if (commentsList == null){
                commentsList = []
            }
            else {
                commentsList = Object.assign([], commentsList)
            }

            commentsList.push(action.comment)

            updatedMap[action.comment.zone] = commentsList
            updated['map'] = updatedMap

            return updated 

        case constants.SELECT_ZONE:
            // console.log('SELECT_ZONE: '+JSON.stringify(action.selectedZone))    //+JSON.stringify(action.index)
            // updated['commentsLoaded'] = false
            return updated

        case constants.COMMENT_UPDATED:
            console.log('COMMENT_UPDATED: '+JSON.stringify(action.comment))
            // if (action.comment._id != updated.comment._id)
            //     return updated

            // updated['comment'] = action.comment
            return updated

		default:
		    return state
	}
}