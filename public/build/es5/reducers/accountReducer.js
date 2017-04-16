"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	user: null
	// user: {}
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var updated = Object.assign({}, state); //let
	switch (action.type) {
		case constants.CURRENT_USER_RECEIVED:
			console.log("CURRENT_USER_RECEIVED: " + JSON.stringify(action.user));
			var updatedUser = action.user;
			updated.user = updatedUser;
			return updated;

		// case constants.PROFILE_CREATED:
		//     console.log('PROFILE_CREATED: '+JSON.stringify(action.profile))
		//     var updatedUser = action.profile
		//     updated['user'] = updatedUser
		//     return updated		   

		// case constants.LOGOUT:
		//     updated['user'] = null
		//     return updated

		case constants.PROFILE_UPDATED:
			console.log("PROFILE_UPDATED: " + JSON.stringify(action.profile));
			if (action.profile._id != updated.user._id) return updated;

			updated.user = action.profile;
			return updated;

		default:
			return state;
	}
};