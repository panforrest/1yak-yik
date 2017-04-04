import React, { Component } from 'react'
import ReactDom from 'react-dom'
// import Zones from './components/Zones'
import Home from './components/Home'

class App extends Component {
	render() {
		return (
			<div>
			    This is react app. How are you today?
			    <Home />
			</div>

		)
	}
}

ReactDom.render(<App />, document.getElementById('root'))

