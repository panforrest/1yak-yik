// <span>{numComments} comments</span>
import React, { Component } from 'react'

class Zone extends Component {
	render(){
		return(
            <div style={{padding:16, background:'#f9f9f9', marginTop:12, border:'1px solid #ddd'}}>
	            <h2 style={{marginBottom:0}}>
	                <a style={{textDecoration:'none', color:'red'}} href="#">{this.props.currentZone.name}</a>
	            </h2>
	            <span>{this.props.currentZone.zipCode}</span><br />
	            <span>{this.props.currentZone.numComments} comments</span>
	        </div>				    
		)
	}
}

export default Zone