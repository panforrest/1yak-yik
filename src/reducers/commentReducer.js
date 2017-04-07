import constants from '../constants/constants'

var initialState = {
	list: [],
	comment: {}
}

export default (state=initialState, action) => {
    let updated = Object.assign({}, state)
	switch(action.type){
		case constants.COMMENTS_RECEIVED:

		    console.log('COMMENTS_RECEIVED: '+JSON.stringify(action.comments))
            updated['list'] = action.comments
            return updated

        case constants.COMMENT_CREATED:
            console.log('COMMENT_CREATED: '+JSON.stringify(action.comment))  
            let updatedList = Object.assign([], updated.list)    //I AM SO STUPID FIRSTPLACE = Object.assign([], state) 
            updatedList.push(action.comment)
            updated['list'] = updatedList   //I AM SO STUPID FIRSTPLACE updated['list'] = updatedList.list 
            // console.log('COMMENT_CREATED: '+JSON.stringify(updatedList))
            return updated 

		default:
		    return state
	}
}