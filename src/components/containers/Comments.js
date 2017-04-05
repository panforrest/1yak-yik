                // <li><Comment currentComment={comment} ></li>  //DONT'S FORGET /
import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'

class Comments extends Component {

    constructor(){
    	super()
    	this.state = {
            comment: {
                username:'',
                body:'',
                timestamp:''
            },

    		list:[
    		    {username: 'dtrump', body:'comment 1', timestamp:'10:30'},
    		    {username: 'hclinton', body:'comment 2', timestamp:'10:45'},
                {username: 'gjohnson', body:'comment 3', timestamp:'10:59'}
    		]
    	}
    }

    submitComment(){
        console.log('submitComment: '+JSON.stringify(this.state.comment))
        let updatedList = Object.assign([], this.state.list)  //let updatedList = Object.assign({}, this.state.comment)
        updatedList.push(this.state.comment)   //updatedList.push(event.target.value)
        this.setState({
            list: updatedList
        })
    }

    updateUsername(event){
        // console.log('updateUsername: '+event.target.value)
        // this.state.comment['username'] = event.target.value //WRONG!
        // setState({
        //     comment['username']: event.target.value 
        // })
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['username'] = event.target.value

        this.setState({
            comment: updatedComment  //comment['username'] = updatedComment
        })
    }

    updateBody(event){
        // console.log('updateComment: '+event.target.value)
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['body'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    updateTimestamp(event){
        // console.log('updateComment: '+event.target.value)
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['timestamp'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

	render(){
        const commentList = this.state.list.map((comment, i) => {
            return(
                <li key={i}><Comment currentComment={comment} /></li>
            )
        })

		return (
			<div>
			    <h2>Comments: Zone 1</h2>
			    <div style={styles.comment.commentsBox}>
				    <ul style={styles.comment.commentsList}>
	                    {commentList} 
				    </ul>

                    <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" id="username" placeholder="Username" />
                    <input onChange={this.updateBody.bind(this)} className="form-control" type="text" id="body" placeholder="Body"/ >
                    <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" id="timestamp" placeholder="Timestamp"/ >
                    <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
                </div>
			</div>
		)
	}
}

export default Comments