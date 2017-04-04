                // <li><Comment currentComment={comment} ></li>  //DONT'S FORGET /
import React, { Component } from 'react'
import Comment from './Comment'
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

	render(){
        const commentList = this.state.list.map((comment, i) => {
            return(
                <li><Comment currentComment={comment} /></li>
            )
        })

		return (
			<div>
			    <h2>Comments: Zone 1</h2>
			    <div style={styles.comment.commentsBox}>
				    <ul style={styles.comment.commentsList}>
	                    {commentList} 
				    </ul>
                </div>
			</div>
		)
	}
}

export default Comments