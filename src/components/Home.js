import React, { Component } from 'react'
import Zones from './Zones'

class Home extends Component {
	render(){
		return (
			<div className="container">
			    <div className="row">
			        <div className="col-md-4">
			            <Zones />
			        </div>    


			        <div className="col-md-8">
			            Ritght side
			        </div>  
			    </div>
			    
			</div>
		)
	} 
}

export default Home