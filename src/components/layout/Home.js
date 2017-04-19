import React, { Component } from 'react'
import { Account, Comments, Zones } from '../containers'
import { Sidebar, Footer } from '../presentation'

class Home extends Component {

	render(){
		return (
            <div id="wrapper" className="clearfix">
                <Sidebar />

				<div className="container">
				    <div className="row">
				        <div className="col-md-4">
	                        <Account />
				            <Zones />
				        </div>    


				        <div className="col-md-8">
				            <Comments />
				        </div>  
				    </div>			    
				</div>

				<Footer /> 

            </div>



		)
	} 
}

export default Home