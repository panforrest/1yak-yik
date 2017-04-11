import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Profile extends Component {
	constructor(){
		super()
		this.state = {
			profile: null
		}
	}

    componentDidMount(){
    	console.log('componentDidMount: '+this.props.username)
    	APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
    		if (err) {
    			alert(err.message)
    			return
    		}
    		console.log(JSON.stringify(response.results[0]))
            if (response.results.length == 0){
            	alert('Profile Not Found.')
            	return
            }

    		const profile = response.results[0]
    		this.setState({
    			profile: profile
    		})

    		// this.props.currentUserReceived(response.results)
    	})
    }

    render(){
        let header = null
        if (this.state.profile != null){
            header = (
                <div>
                    <h3>{this.state.profile.username}</h3>
                    <p>
                        city: {this.state.profile.city}
                    </p>
                </div>
            ) 
        }

    	return(
    		<div>
    		    { header }
    		</div>
    	)
    }
}

export default Profile