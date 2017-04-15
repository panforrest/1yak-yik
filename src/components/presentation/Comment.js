			    // <h2>{this.state.currentComment.username}</h2>  //SHOULD BE props NOT state
			    //<img src=ImageHelper.thumbnail({author.image}, 44) />
import React, { Component } from 'react'
import { Link } from 'react-router'
import { ImageHelper } from '../../utils'

class Comment extends Component {
    constructor(){
    	super()
    	this.state = {
    		isEditing: false
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

	render(){
		const currentComment = this.props.currentComment
        const author = currentComment.author
        const radius = 16

        let content = null
        if (this.state.isEditing == true) {
        	content = (
        		<div>
                    EDIT COMMENT
                </div>    
        	) 
        }
        else{ 
        	content = (
	        	<div>
				    <p style={{fontSize:20, fontWeight:400}}> 
				        {this.props.currentComment.body}<br />
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

export default Comment