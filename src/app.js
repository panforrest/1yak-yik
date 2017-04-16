import React, { Component } from 'react'
import ReactDom from 'react-dom'
// import Zones from './components/Zones'
import { ProfileInfo, Home } from './components/layout'
import { CurrentUser } from './components/containers'
import store from './stores/store' //import { store } from './stores/store'
import { Provider } from 'react-redux' 
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const app = (
	<Provider store={ store.configureStore() }>
		<Router history={browserHistory}>
		    <Route path='/' component={Home}></Route>
		    <Route path='/currentuser' component={CurrentUser}></Route>
		    <Route path='/profile/:username' component={ProfileInfo}></Route>
		</Router>
    </Provider>
)

ReactDom.render(app, document.getElementById('root'))

