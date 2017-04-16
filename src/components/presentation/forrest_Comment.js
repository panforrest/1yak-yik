			    // <h2>{this.state.currentComment.username}</h2>  //SHOULD BE props NOT state
			    //<img src=ImageHelper.thumbnail({author.image}, 44) />
import React, { Component } from 'react'
import { Link } from 'react-router'
import { ImageHelper } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class Comment extends Component {
    constructor(){
    	super()
    	this.state = {
    		isEditing: false,
    		updated: {

    		}
    	}
    }
 
    toggleEdit(event){
    	event.preventDefault()
    	// console.log('EDIT: ')
    	this.setState({
    		isEditing: !this.state.isEditing
    	})
    }

    componentDidUpdate(){
    	console.log('isEditing: '+this.state.isEditing)
    }

    update(event){
    	console.log('update:'+event.target.id+' == '+event.target.value)
    	this.setState({
    		updated: event.target.value
    	})
    }	

     //    const endpoint = '/api/comment/'+comment._id
    	// APIManager.put(endpoint, this.state.updatedComment, (err, response) => {
    	// 	if (err) {
    	// 		alert(err)
    	// 		return
    	// 	}
    	// 	console.log('update:'+JSON.stringify(response))
    	// })
    submitBody(event){
    	console.log('submitBody: '+JSON.stringify(this.state.updated))
    	if (Object.keys(this.state.updated).length == 0){   //if (Object.keys(this.props.user).length == 0){
            alert('No Changes Made!!')
            return
        }

        this.props.updateComment(this.props.body, this.state.updated) 
    }

	render(){
		const currentComment = this.props.currentComment
        const author = currentComment.author
        const radius = 16

        let content = null
        if (this.state.isEditing == true) {
        	content = (
	        	<div>
				    <textarea onChange={this.update.bind(this)} defaultValue={currentComment.body} style={{width:100+'%'}} id="body"></textarea>
				    <br />

				    <img style={{borderRadius:radius, marginRight:6}} src={ImageHelper.thumbnail(author.image, radius * 2)} />
				    <span style={{fontWeight:200}}>
				        <Link to={'/profile/'+author.username}>{author.username}</Link>
				    </span>
				    <span style={{fontWeight:200, marginLeft:12, marginRight:12}}>|</span>
				    <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
				    <button onClick={this.submitBody.bind(this)}>Done</button>
				    <hr />
				    <br />				   				    
				</div>  
        	) 
        }
        else{ 
        	content = (
	        	<div>
				    <p style={{fontSize:20, fontWeight:400}}> 
				        {currentComment.body}<br />
				    </p>

				    <img style={{borderRadius:radius, marginRight:6}} src={ImageHelper.thumbnail(author.image, radius * 2)} />
				    <span style={{fontWeight:200}}>
				        <Link to={'/profile/'+author.username}>{author.username}</Link>
				    </span>
				    <span style={{fontWeight:200, marginLeft:12, marginRight:12}}>|</span>
				    <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
				    <button onClick={this.toggleEdit.bind(this)}>Edit</button>
				    <hr />
				    <br />				   				    
				</div>
            )
        }

		return (
			<div>
			    {content}			    
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
        comment: state.comment.comment
	}
}

const dispatchToProps = (dispatch) => {
    return {
        updateComment: (comment) => dispatch(actions.updateComment(comment))
    }
}

export default connect(stateToProps, dispatchToProps)(Comment)