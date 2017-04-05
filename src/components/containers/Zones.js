        // const listItems = this.state.list.map((zone, i) => {
        // 	return (
        //         <li key={i}><Zone currentZone={zone} /></li>  //<li key={zone._id}>{zone.name}</li>
        // 	)
        // })
import React, { Component } from 'react'
import Zone from '../presentation/Zone'
// import superagent from 'superagent'
import { APIManager } from '../../utils'

class Zones extends Component {
    constructor(){
    	super()
        this.state = {
        	zone: {
        		name:'',
                zipCode:''
        	},

        	list: [
        	//     {name:'Zone 1', zipCode:'10012', numComments:10},
        	//     {name:'Zone 2', zipCode:'10013', numComments:20},
        	//     {name:'Zone 3', zipCode:'10014', numComments:30},
        	//     {name:'Zone 4', zipCode:'10015', numComments:40},
        	//     {name:'Zone 5', zipCode:'10016', numComments:50}
        	]
        	// zones: [

        	// ]
        }
    }

    componentDidMount(){
        APIManager.get('/api/zone', null, (err, response) => {
            if (err){
                alert('ERROR: '+err.message)
                return
            }
            var results = response.results
            this.setState({
                list: results
            })
        })
    }

    submitZone(){
        console.log('submitZone: '+JSON.stringify(this.state.zone))
        
        // updatedList.push(this.state.zone)
        // this.setState({
        // 	list: updatedList
        // })
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone['zipCodes'] = updatedZone.zipCode.split(',')

        APIManager.post('/api/zone', updatedZone, (err, response) => {    //APIManager.post('/api/zone', this.state.zone, (err, response) => {
            if (err) {
                alert('ERROR: '+err.message)
                return
            }
            console.log('submitZone: '+JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList
            })
        })
    }

    updateZone(event){
    	console.log('updateName: '+event.target.id+' == '+event.target.value)
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone[event.target.id] = event.target.value
        this.setState({
        	zone: updatedZone
        })
    }

    // updateZipcode(event){
    // 	console.log('updateZipcode: '+event.target.value)//console.log('updateZipcode: '+JSON.stringify(this.state.zone))
    // 	let updatedZone = Object.assign({}, this.state.zone)
    // 	updatedZone['zipCode'] = event.target.value
    // 	this.setState({
    //         zone: updatedZone
    // 	})
    // }

	render(){
        const listItems = this.state.list.map((zone, i) => {
        	return (
                <li key={i}><Zone currentZone={zone} /></li>
        	)
        })

		return(
			<div>
			    <ol>
                    {listItems} 
                </ol> 

                <input className="form-control" onChange={this.updateZone.bind(this)} type="text" id="name" placeholder="Name" />
                <input className="form-control" onChange={this.updateZone.bind(this)} type="text" id="zipCode" placeholder="Zip Code" /><br />
                <button className="btn btn-danger" onClick={this.submitZone.bind(this)}>Add Zone</button>
                

			</div>
		)
	}
}

export default Zones