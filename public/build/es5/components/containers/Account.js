"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var Link = require("react-router").Link;
//import { Link } from 'react-redux'
var ImageHelper = _utils.ImageHelper;
var Account = (function (Component) {
    function Account() {
        _classCallCheck(this, Account);

        _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this);
        this.state = {
            profile: {
                username: "",
                password: "",
                city: "",
                gender: ""
            } };
    }

    _inherits(Account, Component);

    _prototypeProperties(Account, null, {
        componentDidMount: {
            value: function componentDidMount() {},
            writable: true,
            configurable: true
        },
        updateProfile: {
            value: function updateProfile(event) {
                event.preventDefault(); //Dont' forget this
                console.log("updateProfile: " + event.target.id + " == " + event.target.value);
                var updated = Object.assign({}, this.state.profile); //var
                updated[event.target.id] = event.target.value;
                this.setState({
                    profile: updated
                });
            },
            writable: true,
            configurable: true
        },
        login: {
            value: function login(event) {
                var _this = this;
                event.preventDefault();
                // console.log('login: '+JSON.stringify(this.state.profile))
                if (this.state.profile.username.length == 0) {
                    alert("key in username please!");
                    return;
                }

                if (this.state.profile.password.length == 0) {
                    alert("key in password please!");
                    return;
                }

                APIManager.post("/account/login", this.state.profile, function (err, response) {
                    if (err) {
                        alert(err.message); //alert(err)
                        return;
                    }
                    // console.log('SIGNUP: '+JSON.stringify(response.result))
                    console.log("login: " + JSON.stringify(response.user));
                    _this.props.currentUserReceived(response.user);
                });
            },
            writable: true,
            configurable: true
        },
        signup: {
            value: function signup(event) {
                var _this = this;
                event.preventDefault();
                // console.log('signup: '+JSON.stringify(this.state.profile))
                if (this.state.profile.username.length == 0) {
                    alert("key in username please!");
                    return;
                }

                if (this.state.profile.password.length == 0) {
                    alert("key in password please!");
                    return;
                }

                APIManager.post("/account/signup", this.state.profile, function (err, response) {
                    if (err) {
                        alert(err);
                        return;
                    }
                    console.log("SIGNUP: " + JSON.stringify(response)); //console.log('SIGNUP: '+JSON.stringify(response.result))
                    _this.props.currentUserReceived(response.user);
                });
            },
            writable: true,
            configurable: true
        },
        logout: {
            value: function logout(event) {
                var _this = this;
                // console.log('logout: ')
                event.preventDefault();
                APIManager.get("/account/logout", null, function (err, response) {
                    if (err) {
                        alert(err.message);
                        return;
                    }
                    // console.log('User is logged out')
                    // this.props.currentUserReceived(response.user)
                    // this.props.currentUserReceived(null)
                    _this.props.currentUserReceived(null);
                });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var content = null;
                if (this.props.user == null) {
                    content = React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "h2",
                            null,
                            "Login"
                        ),
                        React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "username", placeholder: "username" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "password", placeholder: "password" }),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.login.bind(this) },
                            "Login"
                        ),
                        React.createElement(
                            "h2",
                            null,
                            "Sign up"
                        ),
                        React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "username", placeholder: "username" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "password", placeholder: "password" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "city", placeholder: "city" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "gender", placeholder: "gender" }),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.signup.bind(this) },
                            "Join"
                        )
                    );
                } else {
                    content = React.createElement(
                        "div",
                        null,
                        React.createElement("img", { style: { borderRadius: 36, float: "left", marginRight: 12 }, src: ImageHelper.thumbnail(this.props.user.image, 72) }),
                        React.createElement(
                            "h2",
                            null,
                            "Welcome, ",
                            this.props.user.username
                        ),
                        React.createElement(
                            "span",
                            null,
                            this.props.user.city
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.logout.bind(this) },
                            "Log Out"
                        ),
                        React.createElement(
                            Link,
                            { to: "/currentuser" },
                            React.createElement(
                                "button",
                                null,
                                "Account"
                            )
                        )
                    );
                }

                return React.createElement(
                    "div",
                    null,
                    content
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Account;
})(Component);

var stateToProps = function (state) {
    return {
        user: state.account.user
    };
};

var dispatchToProps = function (dispatch) {
    return {
        currentUserReceived: function (user) {
            return dispatch(actions.currentUserReceived(user));
        }, //=> IS NOT =
        // profileCreated: (profile) => dispatch(actions.profileCreated(profile))
        logout: function (user) {
            return dispatch(actions.logout(user));
        }
    };
};
module.exports = connect(stateToProps, dispatchToProps)(Account);
// user: {}
// // console.log('componentDidMount: ')
// APIManager.get('/account/currentuser', null, (err, response) => {
//     if(err){   //not logged in, ignore error:
//         // alert(err.message)
//         return
//     }
//     console.log('componentDidMount currentuser'+JSON.stringify(response))
//     this.props.currentUserReceived(response.user)
// })
//this.props.currentUserReceived(response.result)