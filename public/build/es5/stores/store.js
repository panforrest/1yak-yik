"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var combineReducers = _redux.combineReducers;
var applyMiddleware = _redux.applyMiddleware;
var thunk = _interopRequire(require("redux-thunk"));

// import zoneReducer from '../reducers/zoneReducer'
var _reducers = require("../reducers");

var accountReducer = _reducers.accountReducer;
var commentReducer = _reducers.commentReducer;
var zoneReducer = _reducers.zoneReducer;
var profileReducer = _reducers.profileReducer;


var store;

module.exports = {
  configureStore: function (initial) {
    //configureStore () => {
    var reducers = combineReducers({

      zone: zoneReducer,
      comment: commentReducer,
      account: accountReducer,
      profile: profileReducer

    });

    store = createStore(reducers, initial, applyMiddleware(thunk));

    return store;
  },

  currentStore: function () {
    //currentStore () => {
    return store;
  }
};