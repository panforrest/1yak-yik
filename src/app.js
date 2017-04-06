import React, { Component } from 'react'
import ReactDom from 'react-dom'
// import Zones from './components/Zones'
import Home from './components/layout/Home'
import store from './stores/store' //import { store } from './stores/store'
import { Provider } from 'react-redux' 

class App extends Component {
	render() {
		return (
			<Provider store={ store.configureStore() }>
				<div>
				    Yak Yik
				    <Home />
				</div>
            </Provider>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'))

