"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
    map: {},
    profileMap: {}
};

module.exports = function (_x, action) {
    var state = arguments[0] === undefined ? initialState : arguments[0];
    var updated = Object.assign({}, state);
    var updatedMap = Object.assign({}, updated.map);
    var updatedProfileMap = Object.assign({}, updated.profileMap);

    switch (action.type) {
        case constants.COMMENTS_RECEIVED:
            console.log("COMMENTS_RECEIVED: " + JSON.stringify(action.comments));
            //          let updatedMap = Object.assign({}, updated.map)

            if (action.zone != null) {
                (function () {
                    var zoneComments = updatedMap[action.zone._id];
                    if (zoneComments == null) zoneComments = [];else zoneComments = Object.assign([], zoneComments);

                    action.comments.forEach(function (comment, i) {
                        zoneComments.push(comment);
                    });

                    updatedMap[action.zone._id] = zoneComments;
                    updated.map = updatedMap;
                })();
            }

            action.comments.forEach(function (comment, i) {
                var profileComments = updatedProfileMap[comment.author.id] ? updatedProfileMap[comment.author.id] : [];
                profileComments.push(comment);
                updatedProfileMap[comment.author.id] = profileComments;
            });

            updated.profileMap = updatedProfileMap;
            console.log("PROFILE MAP: " + JSON.stringify(updatedProfileMap));

            return updated;

        case constants.COMMENT_CREATED:
            console.log("COMMENT_CREATED: " + JSON.stringify(action.comment));

            var commentList = updatedMap[action.comment.zone];
            if (commentList == null) commentList = [];else commentList = Object.assign([], commentList);

            commentList.push(action.comment);

            updatedMap[action.comment.zone] = commentList;
            updated.map = updatedMap;

            return updated;

        case constants.COMMENT_UPDATED:
            console.log("COMMENT_UPDATED: " + JSON.stringify(action.comment));

            var list = updatedMap[action.comment.zone];
            var newList = [];

            list.forEach(function (comment, i) {
                if (comment._id == action.comment._id) newList.push(action.comment);else newList.push(comment);
            });

            updatedMap[action.comment.zone] = newList;
            updated.map = updatedMap;

            return updated;

        case constants.SELECT_ZONE:
            //          let updated = Object.assign({}, state)
            return updated;

        default:
            return state;

    }
};