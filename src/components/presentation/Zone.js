// <span>{numComments} comments</span>
import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {

	onSelectTitle(){
        console.log('onSelectTitle: ')
        this.props.select()
	}
    
	render(){
		const zoneStyle = styles.zone
		const zipCode = this.props.currentZone.zipCodes[0]  //const zipCode = this.state.zone.zipCodes[0]
        const title = (this.props.isSelected) ? <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a> : <a href="#">{this.props.currentZone.name}</a> 

		return(
            <div style={zoneStyle.container}>
                <h2 onClick={this.onSelectTitle.bind(this)} style={zoneStyle.header}>
	                { title }
	            </h2>
	            <span className="detail">{zipCode}</span><br />
	            <span className="detail">{this.props.currentZone.numComments} comments</span>
	        </div>				    
		)
	}
}

// const styles = {
// 	container: {
//         padding:16, 
//         background:'#f9f9f9', 
//         marginTop:12, 
//         border:'1px solid #ddd'
// 	},
// 	header: {
// 		marginBottom:0
// 	},
// 	title: {
// 		textDecoration:'none', 
// 		color:'red'
// 	}
// }

export default Zone