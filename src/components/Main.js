import React, { Component } from 'react'

class Main extends Component{
	render(){
		return(
            <div id="wrapper" className="clearfix">
                { this.props.children } 
            </div>
		)
	}
	
}

export default Main