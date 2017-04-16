			    // <h2>{this.state.currentComment.username}</h2>  //SHOULD BE props NOT state
			    //<img src=ImageHelper.thumbnail({author.image}, 44) />
import React, { Component } from 'react'
import { Link } from 'react-router'
import { ImageHelper } from '../../utils'

class Comment extends Component {
    constructor(){
    	super()
    	this.state = {
    		isEditing: false, 
    		updated: null
    	}
    }
 
    toggleEdit(event){
    	event.preventDefault()
    	// console.log('EDIT: ')
    	if (this.state.isEditing){
    		if (this.state.updated != null) 
    		    this.props.onUpdate(this.props.currentComment, this.state.updated)
    	}

    	this.setState({
    		isEditing: !this.state.isEditing
    	})
    }

    componentDidUpdate(){
    	console.log('isEditing: '+this.state.isEditing)
    }

    updateBody(event){
    	console.log('updateBody: '+event.target.value)
    	this.setState({
    		updated: event.target.value
    	})
    }

	render(){
		const currentComment = this.props.currentComment
        const author = currentComment.author
        const radius = 16
        const editable = (this.props.isEditable) ? this.props.isEditable : false

        let content = null
        if (this.state.isEditing == true) {
        	content = (
	        	<div>
				    <textarea onChange={this.updateBody.bind(this)} defaultValue={currentComment.body} style={{width:100+'%'}}></textarea>
				    <br />

				    <img style={{borderRadius:radius, marginRight:6}} src={ImageHelper.thumbnail(author.image, radius * 2)} />
				    <span style={{fontWeight:200}}>
				        <Link to={'/profile/'+author.username}>{author.username}</Link>
				    </span>
				    <span style={{fontWeight:200, marginLeft:12, marginRight:12}}>|</span>
				    <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
				    <button onClick={this.toggleEdit.bind(this)}>Done</button>
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
                    {(editable==true) ? <button onClick={this.toggleEdit.bind(this)}>Edit</button> : null}				    
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

export default Comment