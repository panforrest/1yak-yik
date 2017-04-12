import React, { Component } from 'react'
import { connect } from 'react-redux'

class CurrentUser extends Component {
    componentDidMount(){
    	console.log('componentDidMount: '+JSON.stringify(this.props.user))
    }

	render(){
		return(
			const currentUser = this.props.user
			<div>
			    <h2>Welcome, {currentUser.username}!</h2>
			    
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.account.user
	}
}

export default connect(stateToProps)(CurrentUser)