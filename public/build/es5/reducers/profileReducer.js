"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
				list: [],
				map: {},
				appStatus: "ready"
};

module.exports = function (_x, action) {
				var state = arguments[0] === undefined ? initialState : arguments[0];
				var updated = Object.assign({}, state);

				switch (action.type) {
								case constants.PROFILE_RECEIVED:


												console.log("PROFILE_RECEIVED" + JSON.stringify(action.profile));

												var updatedList = Object.assign([], updated.list); //let updatedList = Object.assign([], updated.profile)
												updatedList.push(action.profile);
												updated.list = updatedList;

												var updatedMap = Object.assign({}, state.map);
												updatedMap[action.profile.username] = action.profile;
												updated.map = updatedMap;

												updated.appStatus = "ready";
												// updated['list'] = action.profile
												return updated;

								case constants.APPLICATION_STATE:


												// console.log('APPLICATION_STATE: '+JSON.stringify(action.status))    //+JSON.stringify(action.profile))
												if (action.reducer != "profile") {
																return updated;
												}
												updated.appStatus = action.status;
												return updated;

								default:
												return state;
				}
};