// <span>{numComments} comments</span>
import React, { Component } from 'react'

class Zone extends Component {
	render(){
		return(
            <div style={styles.container}>
                <h2 style={styles.header}>
	                <a style={styles.title} href="#">{this.props.currentZone.name}</a>
	            </h2>
	            <span>{this.props.currentZone.zipCode}</span><br />
	            <span>{this.props.currentZone.numComments} comments</span>
	        </div>				    
		)
	}
}

const styles = {
	container: {
        padding:16, 
        background:'#f9f9f9', 
        marginTop:12, 
        border:'1px solid #ddd'
	},
	header: {
		marginBottom:0
	},
	title: {
		textDecoration:'none', 
		color:'red'
	}
}

export default Zone