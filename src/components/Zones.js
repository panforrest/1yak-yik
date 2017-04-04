import React, { Component } from 'react'
import Zone from './Zone'

class Zones extends Component {
	render(){
		return(
			<div>
			    <ol>
			        <li><Zone name="Zone 1" zipCode="10012" numComments={10} /></li>
			        <li><Zone name="Zone 11" zipCode="10013" numComments={20} /></li>
			        <li><Zone name="Zone 3" zipCode="10014" numComments={30} /></li>
			        <li><Zone name="Zone 4" zipCode="10015" numComments={40} /></li>
				</ol>    
			</div>
		)
	}
}

export default Zones