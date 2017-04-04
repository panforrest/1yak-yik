                // <li><Comment currentComment={comment} ></li>  //DONT'S FORGET /
import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'

class Comments extends Component {

    constructor(){
    	super()
    	this.state = {
    		list:[
    		    {username: 'dtrump', body:'comment 1', timestamp:'10:30'},
    		    {username: 'hclinton', body:'comment 2', timestamp:'10:45'},
                {username: 'gjohnson', body:'comment 3', timestamp:'10:59'}
    		]
    	}
    }

    submitComment(event){
        console.log('submitComment: ')
    }

    updateUsername(event){
        console.log('updateUsername: '+event.target.value)
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
                    <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" id="body" placeholder="Body"/ >
                    <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
                </div>
			</div>
		)
	}
}

export default Comments