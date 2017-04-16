"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {

  list: [] //zones: null

};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  // let updated = Object.assign([], state)
  switch (action.type) {//switch(action.type) => {
    case constants.ZONES_RECEIVED:
      var updated = Object.assign({}, state); //let updated = Object.assign([], state)
      updated.list = action.zones;
      console.log("ZONES_RECEIVED: " + JSON.stringify(action.zones));
      return updated;

    default:
      return state;
  }
};