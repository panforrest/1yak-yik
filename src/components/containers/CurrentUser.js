import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import Dropzone from 'react-dropzone'
import { APIManager, ImageHelper } from '../../utils'
import sha1 from 'sha1'

class CurrentUser extends Component {
    constructor(){
    	super()
    	this.state = {
    		updated: {

    		}
    	}
    }

    componentDidMount(){
    	console.log('componentDidMount: '+JSON.stringify(this.props.user))
    }

    updateCurrentUser(event){
        console.log('updateCurrentUser: '+event.target.id+' == '+event.target.value)
        var updatedProfile = Object.assign({}, this.state.updated)
        updatedProfile[event.target.id] = event.target.value

        this.setState({
        	updated: updatedProfile
        })
    }

    updateProfile(event){
        console.log('updateProfile: '+JSON.stringify(this.state.updated))

        if (Object.keys(this.state.updated).length == 0){   //if (Object.keys(this.props.user).length == 0){
            alert('No Changes Made!!')
            return
        }

        this.props.updateProfile(this.props.user, this.state.updated)  //this.props.updateProfile(profile, this.state.updated)
    }

    uploadImage(files){
        const image = files[0]
        
        const cloudName = 'haoof9otz'
        const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

        var timestamp = Date.now() / 1000
        const uploadPreset = 'xf14qb1e'
        const paramsStr = 'timestamp=' + timestamp+'&upload_preset='+uploadPreset+'6GpPDZZWUFwXJIurw27hBtVETBU'
        const signature = sha1(paramsStr)

        const params = {
            'api_key':'357199911219638',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        APIManager.upload(url, image, params, (err, response) => {
            if (err){
                // console.log('UPLOAD ERROR: '+JSON.stringify(err))
                alert(err)
                return
            } 

            // console.log('UPLOAD COMPLETE: '+JSON.stringify(response.body))
            const imageUrl = response.body['secure_url']

            let updatedProfile = Object.assign({}, this.state.updated)
            updatedProfile['image'] = response.body['secure_url']
            this.setState({
                updated: updatedProfile
            })
        })
    }

	render(){
		const currentUser = this.props.user
        const image = (this.state.updated.image == null) ? '' : ImageHelper.thumbnail(this.state.updated.image, 150) 
		return(
			
			<div>
			    <h2>Welcome, {currentUser.username}!</h2>

			    <input type="text" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} id="username" placeholder="Username" /><br />
			    <input type="text" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.city} id="city" placeholder="City" /><br />
			    <input type="text" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} id="gender" placeholder="Gender" /><br />
                <img src={image} /><br />
                <Dropzone onDrop={this.uploadImage.bind(this)} />
			    <button onClick={this.updateProfile.bind(this)}>Update Profile</button>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
    return {
        updateProfile: (profile, updated) => dispatch(actions.updateProfile(profile, updated))  //updateProfile: (profile) => dispatch(actions.updateProfile(profile)) 
    }
}

export default connect(stateToProps, dispatchToProps)(CurrentUser)