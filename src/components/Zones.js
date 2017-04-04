import React, { Component } from 'react'
import Zone from './Zone'

class Zones extends Component {
	render(){
	    const firstZone = {name:'Zone 1', zipCode:'10012', numComments:10}
	    const secondZone = {name:'Zone 2', zipCode:'10013', numComments:20}
	    const thirdZone = {name:'Zone 3', zipCode:'10014', numComments:30}
	    const fourthZone = {name:'Zone 4', zipCode:'10015', numComments:40}


		return(
			<div>
			    <ol>
			        <li><Zone currentZone={firstZone} /></li>
			        <li><Zone currentZone={secondZone} /></li>
			        <li><Zone currentZone={thirdZone} /></li>
			        <li><Zone currentZone={fourthZone} /></li>
				</ol>    
			</div>
		)
	}
}

export default Zones