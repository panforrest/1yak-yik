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
        if (profile == null){ 
            console.log('TEST')           
            this.props.fetchProfile({username: this.props.username})
            return
        }

        //populate server sise:
        console.log('Profile already there!')
        this.props.fetchComments({'author.id': profile._id})
    }

    componentDidUpdate(){
        // console.log('componentDidUpdate: ')
    }

    render(){
        // console.log('render!! ')

        let profile = this.props.profiles[this.props.username]

        let header = null
        if (profile != null){

            const comments = (this.props.comments[profile._id]) ? this.props.comments[profile._id] : []
            const list = comments.map((comment, i) => {
                return(<li key={i}>{comment.body}</li>)
            })

            header = (
                <div>
                    <h3>{profile.username}</h3>
                    <p>
                        gender: {profile.gender}<br />
                        city: {profile.city}
                    </p>

                    <h2>Comments</h2>
                    <ol>
                        {list}
                    </ol>
                </div>
            ) 
        }

        const content = (this.props.appStatus == 'loading') ? 'Loading...' : header

    	return(
    		<div>
    		    { content }
    		</div>
    	)
    }
}

const stateToProps = (state) => {
    return {
        comments: state.comment.map,  //comments: state.comment.profileMap, 
        profiles: state.profile.map,
        appStatus: state.profile.appStatus
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
        fetchComments: (params) => dispatch(actions.fetchComments(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Profile)