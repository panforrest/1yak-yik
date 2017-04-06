import React, { Component } from 'react'

class CreateComment extends Component{
    constructor(){
    	super()
    	this.state = {
    		comment: {
    			username:'',
    			body:''
    		}
    	}
    }

    updateComment(event){
        console.log('updateComment: '+event.target.id+' == '+event.target.value)
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment[event.target.id] = event.target.value
        this.setState({
        	comment: updatedComment
        })
    }

    submitComment(){
        console.log('submitComment: '+JSON.stringify(this.state.comment))
        this.props.onCreate(this.state.comment)
    }

	render(){
		return(
			<div>
			    <h3>CreateComment</h3>
			    <input onChange={this.updateComment.bind(this)} id="username" className="form-control" type="text" id="username" placeholder="Username" />
                <input onChange={this.updateComment.bind(this)} id="body" className="form-control" type="text" id="body" placeholder="Body"/ >
                <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
			</div>
		)
	}
}

export default CreateComment