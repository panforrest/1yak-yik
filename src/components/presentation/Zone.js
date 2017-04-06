// <span>{numComments} comments</span>
import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {
    

	render(){
		const style = styles.zone
		const zipCode = this.props.currentZone.zipCodes[0]  //const zipCode = this.state.zone.zipCodes[0]
        const title = (this.props.isSelected) ? <a style={style.title} href="#">{this.props.currentZone.name}</a> : <a href="#">{this.props.currentZone.name}</a> 

		return(
            <div style={style.container}>
                <h2 style={style.header}>
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