import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions/actions'
import { connect } from 'react-redux'

class Account extends Component {
    constructor(){
    	super()
    	this.state = {
    		profile: {
    			username:'',
    			password:''
    		},
            user: {}
    	}
    }

    componentDidMount(){
        // console.log('componentDidMount: ')
        APIManager.get('/account/currentuser', null, (err, response) => {
            if(err){
                alert(err.message)
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
            console.log('login: '+JSON.stringify(response))
            // this.props.accountReceived(response)
        })
        
    }        

    signup(event){
    	event.preventDefault()
    	console.log('signup: '+JSON.stringify(this.state.profile))
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
            console.log('SIGNUP: '+JSON.stringify(response.result))
            // this.props.accountReceived(response.result)
        })
    	
    }

	render() {
        // const account = this.props.account.map((account) => {
        //     return(
        //        account: account
        //     )
        // })

		return(
			<div>
				<div>
	                <h2>Login</h2> 
	                <input onChange={this.updateProfile.bind(this)} type="text" id="username" placeholder="username" /><br />
	                <input onChange={this.updateProfile.bind(this)} type="text" id="password" placeholder="password" /><br />
	                <br />
	                <button onClick={this.login.bind(this)}>Login</button>	
	                <h2>Sign up</h2> 
	                <input onChange={this.updateProfile.bind(this)} type="text" id="username" placeholder="username" /><br />
	                <input onChange={this.updateProfile.bind(this)} type="text" id="password" placeholder="password" /><br />
	                <br />	
	                <button onClick={this.signup.bind(this)}>Join</button>	             
	            </div>
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
        currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))  //=> IS NOT =
    }
}
export default connect(stateToProps, dispatchToProps)(Account)