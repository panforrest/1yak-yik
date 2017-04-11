			    // <h2>{this.state.currentComment.username}</h2>  //SHOULD BE props NOT state
import React, { Component } from 'react'
import { Link } from 'react-router'

class Comment extends Component {
	render(){
		const currentComment = this.props.currentComment
		return (
			<div>
			    <p style={{fontSize:20, fontWeight:400}}> 
			        {this.props.currentComment.body}<br />
			    </p>
			    <span style={{fontWeight:200}}>
			        <Link to={'/profile/'+currentComment.username}>{currentComment.username}</Link>
			    </span>
			    <span style={{fontWeight:200, marginLeft:12, marginRight:12}}>|</span>
			    <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
			    <hr />
			    <br />
			    
			    
			</div>
		)
	}
}

export default Comment