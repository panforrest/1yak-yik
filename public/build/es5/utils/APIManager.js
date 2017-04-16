"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var superagent = _interopRequire(require("superagent"));

module.exports = {

    get: function (url, params, callback) {
        // get: (params) => {
        superagent.get(url).query(params).set("Accept", "application/json").end(function (err, response) {
            if (err) {
                callback(err, null);
                return;
            }

            //HANDLE API FAILURE:
            var confirmation = response.body.confirmation;
            if (confirmation != "success") {
                callback({ message: response.body.message }, null);
                return;
            }

            callback(null, response.body);
        });
    },


    post: function (url, body, callback) {
        //post: (url, params, callback) => {
        superagent.post(url).send(body) //.send(params)
        .set("Accept", "application/json").end(function (err, response) {
            if (err) {
                callback(err, null);
                return;
            }

            var confirmation = response.body.confirmation;
            if (confirmation != "success") {
                callback({ message: response.body.message }, null); //message
                return;
            }

            callback(null, response.body);
        });
    },

    put: function (url, body, callback) {
        //put: (id) => {
        superagent.put(url) //.findByIdAndUpdate(id)
        .send(body) //
        .set("Accept", "application/json").end(function (err, response) {
            if (err) {
                callback(err, null); //alert('ERROR: '+err)
                return;
            }
            // console.log(JSON.stringify(response.body))
            var confirmation = response.body.confirmation;
            if (confirmation != "success") {
                callback({ message: response.body.message }, null);
                return;
            }

            callback(null, response.body);
        });
    },

    "delete": function () {},

    upload: function (endpoint, file, params, callback) {
        console.log("APIManager - upload: ");
        var uploadRequest = superagent.post(endpoint);

        uploadRequest.attach("file", file);
        Object.keys(params).forEach(function (key) {
            uploadRequest.field(key, params[key]);
        });

        uploadRequest.end(function (err, resp) {
            if (err) {
                callback(err, null);
                return;
            }

            callback(null, resp);
        });
    }
};
//callback(null, response)