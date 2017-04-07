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
            comment: {
                // username:'',
                // body:''
                // timestamp:''
            },

    		list:[
    		//     {username: 'dtrump', body:'comment 1', timestamp:'10:30'},
    		//     {username: 'hclinton', body:'comment 2', timestamp:'10:45'},
      //           {username: 'gjohnson', body:'comment 3', timestamp:'10:59'}
    		]
    	}
    }

    componentDidMount(){
        console.log('Comments componentDidMount: ')

        APIManager.get('/api/comment', null, (err, response) => {
            if (err) {
                alert('ERROR: '+err.message)
                return
            }
            console.log(JSON.stringify(response))
            var results = response.results
            // this.setState({
            //     list: results
            // })
            this.props.commentsReceived(results)
        })
    }

    submitComment(comment){
        console.log('before submitComment: '+JSON.stringify(comment))
        // let updatedComment = Object.assign({}, this.state.comment)
        let updatedComment = Object.assign({}, comment)
        APIManager.post('/api/comment', updatedComment, (err, response) => {
            if (err) {
                alert('ERROR: '+err.message)
                return
            }
            console.log('submitComment: '+JSON.stringify(response))
            // let updatedList = Object.assign([], this.state.list)
            // updatedList.push(response.result)
            // this.setState({
            //     list: updatedList
            // })
            var result = response.result
            this.props.commentCreated(result)
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

	render(){
        const commentList = this.props.list.map((comment, i) => {
            return(
                <li key={i}><Comment currentComment={comment} /></li>
            )
        })

		return (
			<div>
			    <h2>Comments: Zone {this.props.index}</h2>
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
        list: state.comment.list,
        index: state.zone.selectedZone  
    }
}

const dispatchToProps = (dispatch) => {
    return {
        commentsReceived: (comments) => dispatch(actions.commentsReceived(comments)),
        commentCreated: (comment) => dispatch(actions.commentCreated(comment))
    }
}

export default connect(stateToProps, dispatchToProps)(Comments)