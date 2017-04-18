import constants from '../constants/constants'

var initialState = {
    map: {},
    // profileMap: {}
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state)
    let updatedMap = Object.assign({}, updated.map)
    // let updatedProfileMap = Object.assign({}, updated.profileMap)

    switch (action.type){
        case constants.COMMENTS_RECEIVED:
            console.log('COMMENTS_RECEIVED: '+JSON.stringify(action.comments))
            // console.log('PARAMS: '+JSON.stringify(action.params))

            let keys = Object.keys(action.params)
            let key = keys[0]  //zone
            let value = action.params[key]  //zone id number
            console.log('KEY: ' + key)
            console.log('VALUE: ' + value)

            let array = (updatedMap[value]) ? updatedMap[value] : []
            action.comments.forEach((comment, i) => {               
                array.push(comment)
            })

            updatedMap[value] = array
            updated['map'] = updatedMap

            console.log('COMMMENTS_RECEIVED: '+JSON.stringify(updatedMap))
//          let updatedMap = Object.assign({}, updated.map)
            
            // if (action.zone != null){
            //     let zoneComments = updatedMap[action.zone._id]
            //     if (zoneComments == null)
            //         zoneComments = []       
            //     else 
            //         zoneComments = Object.assign([], zoneComments)

            //     action.comments.forEach((comment, i) => {
            //         zoneComments.push(comment)
            //     })

            //     updatedMap[action.zone._id] = zoneComments
            //     updated['map'] = updatedMap
            // }

            // action.comments.forEach((comment, i) => {
            //     let profileComments = (updatedProfileMap[comment.author.id]) ? updatedProfileMap[comment.author.id] : []
            //     profileComments.push(comment)
            //     updatedProfileMap[comment.author.id] = profileComments
            // })

            // updated['profileMap'] = updatedProfileMap
            // console.log('PROFILE MAP: '+JSON.stringify(updatedProfileMap))

            return updated

        case constants.COMMENT_CREATED:
            console.log('COMMENT_CREATED: '+JSON.stringify(action.comment))

            let commentList = updatedMap[action.comment.zone]
            if (commentList == null)
                commentList = []        
            else 
                commentList = Object.assign([], commentList)

            commentList.push(action.comment)

            updatedMap[action.comment.zone] = commentList
            updated['map'] = updatedMap

            return updated          

        case constants.COMMENT_UPDATED:
            console.log('COMMENT_UPDATED: '+JSON.stringify(action.comment))

            let list = updatedMap[action.comment.zone]
            let newList = []

            list.forEach((comment, i) => {
                if (comment._id == action.comment._id)
                    newList.push(action.comment)
                else
                    newList.push(comment)
            })

            updatedMap[action.comment.zone] = newList
            updated['map'] = updatedMap

            return updated          

        case constants.SELECT_ZONE:
//          let updated = Object.assign({}, state)
            return updated

        default: 
            return state

    }

}