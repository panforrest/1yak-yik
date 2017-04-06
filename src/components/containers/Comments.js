                // <li><Comment currentComment={comment} ></li>  //DONT'S FORGET /
import React, { Component } from 'react'
import { Comment, CreateComment } from '../presentation'
import styles from './styles'
// import superagent from 'superagent'
import { APIManager } from '../../utils'

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
            this.setState({
                list: results
            })
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
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList
            })
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
	                    { commentList } 
				    </ul>

                    
                    <CreateComment onCreate={this.submitComment.bind(this)} />
                </div>
			</div>
		)
	}
}

export default Comments