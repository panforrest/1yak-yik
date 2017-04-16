import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Main from './components/Main'
import { ProfileInfo, Home } from './components/layout'
import { CurrentUser } from './components/containers'
import store from './stores/store' //import { store } from './stores/store'
import { Provider } from 'react-redux' 
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const initialState = window.__PRELOADED_STATE__

const app = (
	<Provider store={ store.configureStore(initialState) }>
		<Router history={browserHistory}>
		    <Route path='/' component={Main}>
			    <IndexRoute component={Home}></IndexRoute>
			    <Route path='/currentuser' component={CurrentUser}></Route>
			    <Route path='/profile/:username' component={ProfileInfo}></Route>
            
		    </Route>
		</Router>
    </Provider>
)

ReactDom.render(app, document.getElementById('root'))

