                // <li><Comment currentComment={comment} ></li>  //DONT'S FORGET /
import React, { Component } from 'react'
import { Comment, CreateComment } from '../presentation'
import styles from './styles'
// import superagent from 'superagent'
import { APIManager } from '../../utils'
import actions from '../../actions/actions'
import { connect } from 'react-redux'

class Comments extends Component {

    constructor(){
    	super()
    	this.state = {
            commentsLoaded: false,
            index: 0
    	}
    }

    // componentDidMount(){
        // console.log('Comments componentDidMount: ')
        // let zone = this.props.zones[this.props.index]

        // if (zone == null) {
        //     console.log('NO SELECTED ZONE!!!!')
        //     return
        // }

        // APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
        //     if (err) {
        //         alert('ERROR: '+err.message)
        //         return
        //     }
        //     console.log(JSON.stringify(response))
        //     var results = response.results
        //     // this.setState({
        //     //     list: results
        //     // })
        //     this.props.commentsReceived(results)
        // })
    // }

    submitComment(comment){
        if (this.props.user == null) {
            alert('please sign up or log in to add comments')
            return
        }

        let updatedComment = Object.assign({}, comment)

        let zone = this.props.zones[this.props.index]
        updatedComment['zone'] = zone._id
        updatedComment['username'] = this.props.user.username
        updatedComment['author'] ={
            username: this.props.user.username,
            id: this.props.user._id,
            image: this.props.user.image
        }

        console.log('to submitComment this'+JSON.stringify(updatedComment))

        APIManager.post('/api/comment', updatedComment, (err, response) => {
            if (err) {
                alert('ERROR: '+err.message)
                return
            }
            // console.log('submitComment: '+JSON.stringify(response))
            const comment = response.result

            this.props.commentCreated(comment)
            // this.props.commentsReceived([comment], zone)
        })
    }

    // updateUsername(event){
    //     let updatedComment = Object.assign({}, this.state.comment)
    //     updatedComment['username'] = event.target.value

    //     this.setState({
    //         comment: updatedComment  //comment['username'] = updatedComment
    //     })
    // }

    // updateBody(event){
    //     // console.log('updateComment: '+event.target.value)
    //     let updatedComment = Object.assign({}, this.state.comment)
    //     updatedComment['body'] = event.target.value
    //     this.setState({
    //         comment: updatedComment
    //     })
    // }

    // componentWillUpdate(){
    //     console.log('COMMENTS CONTAINER: componentWillUpdate: '+this.state.index+' == '+this.props.index+'?')
    // }    

    componentDidMount(){
        let zone = this.props.zones[this.props.index]
        if (zone == null) {
            console.log('NO SELECTED ZONE!!!!')
            return
        }

        let commentsArray = this.props.commentsMap[zone._id]
        if (commentsArray != null) //COMMENTS HAVE BEEN ALREADY LOADED, NO NEED TO CALL API
            return

        APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
            if (err) {
                alert('ERROR: '+err.message)
                return
            }
            
            let comments = response.results
            this.props.commentsReceived(comments, zone)
        })        
    }

    componentDidUpdate(){
        // console.log('COMMENTS CONTAINER: componentDidUpdate: '+this.state.index+'?')
        let zone = this.props.zones[this.props.index]
        if (zone == null) {
            console.log('NO SELECTED ZONE!!!!')
            return
        }

        // this.setState({
        //     index: this.props.index
        // })

        // console.log('SELECTED ZONE IS READY == '+zone._id)
        // if (this.props.commentsLoaded == true)
        //     return

        let commentsArray = this.props.commentsMap[zone._id]
        if (commentsArray != null) //COMMENTS HAVE BEEN ALREADY LOADED, NO NEED TO CALL API
            return

        APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
            if (err) {
                alert('ERROR: '+err.message)
                return
            }
            
            let comments = response.results
            this.props.commentsReceived(comments, zone)
        })
    }

    updateComment(comment, updatedBody){
        console.log('update comment: '+comment._id+', '+updatedBody)
        this.props.updateComment(comment, {body: updatedBody})
    }

	render(){
        let selectedZone = this.props.zones[this.props.index]
        const currentUser = this.props.user // null if not logged in

        let zoneName = null
        let commentList = null

        if (selectedZone != null) {
            zoneName = selectedZone.name

            let zoneComments = this.props.commentsMap[selectedZone._id]
            // console.log('SELECTED ZONE ID ='+selectedZone._id)
            // console.log('COMMENTS MAP ='+JSON.stringify(this.props.commentsMapn))
            if (zoneComments != null) {
                commentList = zoneComments.map((comment, i) => {
                    let editable = false
                    if (currentUser != null){
                        // if (currentUser._id == comment.author.id)
                        //    editable = true
                        editable = (currentUser._id == comment.author.id) 
                    }
                    return(
                        <li key={i}><Comment onUpdate={this.updateComment.bind(this)} isEditable={editable} currentComment={comment} /></li>
                    )
                })
            }
        }

		return (
			<div>
			    <h2>{zoneName}</h2>
			    <div style={styles.comment.commentsBox}>
				    <ul style={styles.comment.commentsList}>
	                    { commentList } 
				    </ul>

                    
                    <CreateComment onCreate={this.submitComment.bind(this)} />
                </div>
			</div>
		)
	}
}

const stateToProps = (state) => {
    return {
        commentsMap: state.comment.map,
        // comments: state.comment.list,
        commentsLoaded: state.comment.commentsLoaded,
        index: state.zone.selectedZone,
        zones: state.zone.list,
        user: state.account.user
        // comment: state.comment.comment
    }
}

const dispatchToProps = (dispatch) => {
    return {
        commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
        commentCreated: (comment) => dispatch(actions.commentCreated(comment)),
        //currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
        updateComment: (comment, params) => dispatch(actions.updateComment(comment, params))
    }
}

export default connect(stateToProps, dispatchToProps)(Comments)