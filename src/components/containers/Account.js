import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router'  //import { Link } from 'react-redux'
import { ImageHelper } from '../../utils'
 
class Account extends Component {
    constructor(){
    	super()
    	this.state = {
    		profile: {
    			username:'',
    			password:'',
                city:'',
                gender:''
    		},
            // user: {}
    	}
    }

    componentDidMount(){
        // console.log('componentDidMount: ')
        APIManager.get('/account/currentuser', null, (err, response) => {
            if(err){   //not logged in, ignore error:
                // alert(err.message)
                return
            }
            console.log('componentDidMount currentuser'+JSON.stringify(response))
            this.props.currentUserReceived(response.user)
        })
    }

    updateProfile(event){
    	event.preventDefault()   //Dont' forget this
        console.log('updateProfile: '+event.target.id+" == "+event.target.value)
        let updated = Object.assign({}, this.state.profile)   //var
        updated[event.target.id] = event.target.value
        this.setState({
        	profile: updated
        })
    }

    login(event){
        event.preventDefault()
        // console.log('login: '+JSON.stringify(this.state.profile))
        if (this.state.profile.username.length == 0) {
            alert('key in username please!')
            return
        }

        if (this.state.profile.password.length == 0) {
            alert('key in password please!')
            return
        }

        APIManager.post('/account/login', this.state.profile, (err, response) => {
            if (err) {
                alert(err.message)   //alert(err)
                return
            }
            // console.log('SIGNUP: '+JSON.stringify(response.result))
            console.log('login: '+JSON.stringify(response.user))
            this.props.currentUserReceived(response.user)
        })
        
    }        

    signup(event){
    	event.preventDefault()
    	// console.log('signup: '+JSON.stringify(this.state.profile))
    	if (this.state.profile.username.length == 0) {
    		alert('key in username please!')
    		return
    	}

    	if (this.state.profile.password.length == 0) {
    		alert('key in password please!')
    		return
    	}

        APIManager.post('/account/signup', this.state.profile, (err, response) => {
            if (err) {
                alert(err)
                return
            }
            console.log('SIGNUP: '+JSON.stringify(response))//console.log('SIGNUP: '+JSON.stringify(response.result))
            this.props.currentUserReceived(response.user)//this.props.currentUserReceived(response.result)
        })
    	
    }

    logout(event){
        // console.log('logout: ')
        event.preventDefault()
        APIManager.get('/account/logout', null, (err, response) => {
            if (err){
                alert(err.message)
                return
            }
            // console.log('User is logged out')
            // this.props.currentUserReceived(response.user)
            // this.props.currentUserReceived(null)
            this.props.currentUserReceived(null)
        })
    }

	render() {
        let content = null
        if (this.props.user == null) {
            content = (
                <div>
                    
                    <h2>Login</h2> 
                    <input onChange={this.updateProfile.bind(this)} type="text" id="username" placeholder="username" /><br />
                    <input onChange={this.updateProfile.bind(this)} type="text" id="password" placeholder="password" /><br />
                    <br />
                    <button onClick={this.login.bind(this)}>Login</button>  
                    <h2>Sign up</h2> 
                    <input onChange={this.updateProfile.bind(this)} type="text" id="username" placeholder="username" /><br />
                    <input onChange={this.updateProfile.bind(this)} type="text" id="password" placeholder="password" /><br />
                    <input onChange={this.updateProfile.bind(this)} type="text" id="city" placeholder="city" /><br />
                    <input onChange={this.updateProfile.bind(this)} type="text" id="gender" placeholder="gender" /><br />
                    <br />                    
                    <button onClick={this.signup.bind(this)}>Join</button> 

                </div>
            )
        }
        else{
            content = ( <div>  
                          <img style={{borderRadius:36, float:'left', marginRight:12}} src={ImageHelper.thumbnail(this.props.user.image, 72)} />
                          <h2>Welcome, {this.props.user.username}</h2>
                          <span>{this.props.user.city}</span><br />
                          <button onClick={this.logout.bind(this)}>Log Out</button>
                          <Link to="/currentuser"><button>Account</button></Link>
                        </div>   
                      )
        }

		return(

            <div>
                { content }
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
        currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),  //=> IS NOT =
        // profileCreated: (profile) => dispatch(actions.profileCreated(profile))
        logout: (user) => dispatch(actions.logout(user))
    }
}
export default connect(stateToProps, dispatchToProps)(Account)