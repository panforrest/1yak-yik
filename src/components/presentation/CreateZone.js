import React, { Component } from 'react'

class CreateZone extends Component {
    constructor(){
        super()
        this.state = {
        	zone: {
        		name:'',
        		zipCode:''
        	}
        }
    }

    updateZone(event){
    	console.log('updateName: '+event.target.id+' == '+event.target.value)
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone[event.target.id] = event.target.value
        this.setState({
        	zone: updatedZone
        })
    } 

    submitZone(event){
    	console.log('submitZone: '+JSON.stringify(this.state.zone))
    	let updated = Object.assign({}, this.state.zone)
    	updated['zipCodes'] = updated.zipCode.split(',')
    	this.props.onCreate(updated)
    }   

	render(){
		return(
			<div>
                <input onChange={this.updateZone.bind(this)} className="form-control" type="text" id="name" placeholder="Name" />
                <input onChange={this.updateZone.bind(this)} className="form-control" type="text" id="zipCode" placeholder="Zip Code" /><br />
                <button onClick={this.submitZone.bind(this)} className="btn btn-danger" >Add Zone</button>
			</div>
		)
	}
}

export default CreateZone