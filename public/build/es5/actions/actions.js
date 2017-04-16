"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var APIManager = require("../utils").APIManager;
module.exports = {

	fetchProfile: function (params) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: "loading",
				reducer: "profile"
			});

			APIManager.get("/api/profile", params, function (err, response) {
				if (err) {
					console.log("ERR: " + err);
					return;
				}

				// console.log('fetchProfile: '+JSON.stringify(response))
				if (response.results.length == 0) {
					alert("Profile Not Found.");
					return;
				}

				var profile = response.results[0];

				//artifically delay the callbakc:
				setTimeout(function () {
					dispatch({
						type: constants.PROFILE_RECEIVED,
						profile: profile
					});
				}, 3000);
			});
		};
	},

	zonesReceived: function (zones) {
		return {
			type: constants.ZONES_RECEIVED, //action: constants.ZONES_RECEIVED,
			zones: zones //type: zones
		};
	},

	commentsReceived: function (comments, zone) {
		return {
			type: constants.COMMENTS_RECEIVED, //action: constants.COMMENTS_RECEIVED,
			comments: comments, //type: comments
			zone: zone
		};
	},

	commentCreated: function (comment) {
		return {
			type: constants.COMMENT_CREATED,
			comment: comment
		};
	},

	fetchZones: function (params) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: "loading",
				reducer: "zone"
			});

			APIManager.get("/api/zone", params, function (err, response) {
				if (err) {
					alert("ERR: " + err);
					return;
				}

				console.log("fetchZones: " + JSON.stringify(response));
				// this.props.zonesReceived(response)
				var zones = response.results; //MY ATTEMPT DIDN'T WORK BECAUSE I MISSED THIS LINE OF CODE

				setTimeout(function () {
					dispatch({
						type: constants.ZONES_RECEIVED,
						zones: zones
					});
				}, 3000);
			});
		};
	},

	zoneCreated: function (zone) {
		return {
			type: constants.ZONE_CREATED,
			zone: zone
		};
	},

	selectZone: function (index) {
		//selectZone: (zone) => {
		return {
			type: constants.SELECT_ZONE,
			selectedZone: index //zone: index
		};
	},

	currentUserReceived: function (user) {
		return {
			type: constants.CURRENT_USER_RECEIVED,
			user: user
		};
	},

	updateProfile: function (profile, updated) {
		//updateProfile: (updated) => {
		return function (dispatch) {
			//THIS IS THE ONE WAY DATA FLOW
			// 	dispatch({
			// 		type: constants.CURRENT_USER_RECEIVED
			// 		profile: profile
			// 	})
			var endpoint = "/api/profile/" + profile._id;
			APIManager.put(endpoint, updated, function (err, response) {
				if (err) {
					alert("ERROR: " + JSON.stringify(err));
					return;
				}
				var updatedProfile = response.result;
				dispatch({
					type: constants.PROFILE_UPDATED,
					profile: updatedProfile
				});
			});
		};
	},

	updateComment: function (comment, params) {
		return function (dispatch) {
			var endpoint = "/api/comment/" + comment._id;
			APIManager.put(endpoint, params, function (err, response) {
				if (err) {
					alert("ERROR: " + JSON.stringify(err));
					return;
				}
				console.log("Comment Updated: " + JSON.stringify(response));
				var updatedComment = response.result;
				dispatch({
					type: constants.COMMENT_UPDATED,
					comment: updatedComment
				});
			});
		};
	}

	// profileCreated: (profile) => {
	// 	return {
	// 		type: constants.PROFILE_CREATED,
	// 		profile: profile
	// 	}
	// }

	// profileReceived: (profile) => {
	// 	return{
	// 		type: constants.PROFILE_RECEIVED,
	// 		profile: profile
	// 	}
	// }
};
// console.log('Profile Updated: '+JSON.stringify(response))