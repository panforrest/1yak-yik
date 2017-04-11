import React, { Component } from 'react'

class Profile extends Component {
    render(){
    	return(
    		<div>
    		    <h3>{this.props.username}</h3>
    		</div>
    	)
    }
}

export default Profile