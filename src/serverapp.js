				// <Router history={browserHistory}>
				//     <Route path='/' component={Home}></Route>
				//     <Route path='/currentuser' component={CurrentUser}></Route>
				//     <Route path='/profile/:username' component={ProfileInfo}></Route>
				// </Router>
import React, { Component } from 'react'
// import ReactDom from 'react-dom'
import Main from './components/Main'
// import { ProfileInfo, Home } from './components/layout'
// import { CurrentUser } from './components/containers'
// import store from './stores/store' //import { store } from './stores/store'
import { Provider } from 'react-redux' 
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'

class App extends Component {
	render(){
		return (
			<Provider store={this.props.route.initial}>
                <Main {...this.props} />
		    </Provider>
		)
	}
}

export default App