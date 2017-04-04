			    // <h2>{this.state.currentComment.username}</h2>  //SHOULD BE props NOT state
import React, { Component } from 'react'

class Comment extends Component {
	render(){
		return (
			<div>
			    <p style={{fontSize:20, fontWeight:400}}> 
			        {this.props.currentComment.body}<br />
			    </p>
			    <span style={{fontWeight:200}}>{this.props.currentComment.username}</span>
			    <span style={{fontWeight:200, marginLeft:12, marginRight:12}}>|</span>
			    <span style={{fontWeight:200}}>{this.props.currentComment.timestamp}</span>
			    <hr />
			    <br />
			    
			    
			</div>
		)
	}
}

export default Comment