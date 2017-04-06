import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import zone from '../reducers/zone'  //import { zone } from '../reducers/zone'

var store

export default {

	configureStore: () => {

		const reducers = combineReducers({   //var reducers = combineReducers(

			zone: zone

		})

		store = createStore(   //store = createStore({
			reducers,
			applyMiddleware(thunk)
		)

        return store
	},

	currentStore: () => {
		return store
	}
}