import React, { Component } from 'react'
import { Zone, CreateZone, style } from '../presentation'
// import superagent from 'superagent'
import { APIManager } from '../../utils'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import store from '../../stores/store'  //THIS LINE MUST REMEMBER

class Zones extends Component {
    constructor(){
    	super()
        this.state = {
            // selected: 0,
        	list: []     	
        }
    }

    componentDidMount(){
        APIManager.get('/api/zone', null, (err, response) => {
            if (err){
                alert('ERROR: '+err.message)
                return
            }

            this.props.zonesReceived(response.results)
            // this.props.zonesReceived(zones)
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
            // console.log('submitZone: '+JSON.stringify(response))
            // let updatedList = Object.assign([], this.state.list)
            // updatedList.push(response.result)
            // this.setState({
            //     list: updatedList
            // })
            this.props.zoneCreated(response.result)
        })
    }

    selectZone(index){
        console.log('selectZone: '+index)

        this.props.selectZone(index)
    }

	render(){
        const listItems = this.props.list.map((zone, i) => {
            let selected = (i==this.props.selected)
        	return (
                <li key={i}>
                    <Zone index={i} select={this.selectZone.bind(this)} isSelected={selected} Zone currentZone={zone} />
                </li>
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

const stateToProps = (state) => {
    return {
        list: state.zone.list,
        selected: state.zone.selectedZone
    }
}

const dispatchToProps = (dispatch) => {
    return {
        zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
        zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
        selectZone: (index) => dispatch(actions.selectZone(index))
    }
}
export default connect(stateToProps, dispatchToProps)(Zones)