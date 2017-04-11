import React, { Component } from 'react'
import { Profile } from '../containers'

class ProfileInfo extends Component{
    componentDidMount(){
    	//console.log('componentDidMount: '+JSON.stringify(this.props))
    	console.log('componentDidMount: '+JSON.stringify(this.props.params)) //IT IS WRONG TO USE: +JSON.stringify(this.props.user)
    }

	render(){
		return(
			<div>
			    ProfileInfo

			    <Profile username={this.props.params.username} />
			</div>
	    )
	}
}

export default ProfileInfo