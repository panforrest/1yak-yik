import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions/actions'
import { connect } from 'react-redux'

class Profile extends Component {
	constructor(){
		super()
		this.state = {
			// profile: null
		}
	}

    componentDidMount(){
        const profile = this.props.profiles[this.props.username]
        if (profile != null) 
            return
    
        this.props.fetchProfile({username: this.props.username})

        // APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
        //  if (err) {
        //      alert(err.message)
        //      return
        //  }
        //  console.log(JSON.stringify(response.results[0]))
        //     if (response.results.length == 0){
        //      alert('Profile Not Found.')
        //      return
        //     }

        //     const profile = response.results[0]
        //     this.props.profileReceived(profile)
        // })
    }

    componentDidUpdate(){
        console.log('componentDidUpdate: ')
    }

    render(){
        console.log('render!! ')

        let profile = this.props.profiles[this.props.username]

        let header = null
        if (profile != null){
            header = (
                <div>
                    <h3>{profile.username}</h3>
                    <p>
                        gender: {profile.gender}<br />
                        city: {profile.city}
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

const stateToProps = (state) => {
    return {
        profiles: state.profile.map //profiles: state.profile.list  //profile: state.profile.list
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
        // profileReceived: (profile) => dispatch(actions.profileReceived(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(Profile)