import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {

	render(){
		return (
			<div>
			    <h2>Zone 1 comments</h2>
			    <ul>
                    <li><Comment /></li>
                    <li><Comment /></li>
                    <li><Comment /></li>
                    <li><Comment /></li>
			    </ul>

			</div>
		)
	}
}

export default Comments