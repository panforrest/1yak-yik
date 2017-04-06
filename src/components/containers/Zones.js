import React, { Component } from 'react'
import { Zone, CreateZone } from '../presentation'
// import superagent from 'superagent'
import { APIManager } from '../../utils'

class Zones extends Component {
    constructor(){
    	super()
        this.state = {
            selected: 0,
        	list: []      	
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

    submitZone(zone){
        // console.log('submitZone: '+JSON.stringify(zone))
        
        // updatedList.push(this.state.zone)
        // this.setState({
        // 	list: updatedList
        // })
        let updatedZone = Object.assign({}, zone)
        updatedZone['zipCodes'] = updatedZone.zipCode.split(',')
        console.log('submitZone: '+JSON.stringify(updatedZone))

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

    // updateZone(event){
    // 	console.log('updateName: '+event.target.id+' == '+event.target.value)
    //     let updatedZone = Object.assign({}, this.state.zone)
    //     updatedZone[event.target.id] = event.target.value
    //     this.setState({
    //     	zone: updatedZone
    //     })
    // }

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
                <li key={i}><Zone isSelected={false} Zone currentZone={zone} /></li>
        	)
        })

		return(
			<div>
			    <ol>
                    {listItems} 
                </ol> 


                <CreateZone onCreate={this.submitZone.bind(this)}/>

			</div>
		)
	}
}

export default Zones