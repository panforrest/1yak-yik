"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

var zone = _interopRequire(require("../reducers/zone"));

//import { zone } from '../reducers/zone'

var store;

module.exports = {

	configureStore: function () {
		var reducers = combineReducers({ //var reducers = combineReducers(

			zone: zone

		});

		store = createStore( //store = createStore({
		reducers, applyMiddleware(thunk));

		return store;
	},

	currentStore: function () {
		return store;
	}
};