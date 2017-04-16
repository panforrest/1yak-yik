"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ReactDom = _interopRequire(require("react-dom"));

// import Zones from './components/Zones'
var _componentsLayout = require("./components/layout");

var ProfileInfo = _componentsLayout.ProfileInfo;
var Home = _componentsLayout.Home;
var CurrentUser = require("./components/containers").CurrentUser;
var store = _interopRequire(require("./stores/store"));

//import { store } from './stores/store'
var Provider = require("react-redux").Provider;
var _reactRouter = require("react-router");

var Router = _reactRouter.Router;
var Route = _reactRouter.Route;
var IndexRoute = _reactRouter.IndexRoute;
var browserHistory = _reactRouter.browserHistory;


var app = React.createElement(
	Provider,
	{ store: store.configureStore() },
	React.createElement(
		Router,
		{ history: browserHistory },
		React.createElement(Route, { path: "/", component: Home }),
		React.createElement(Route, { path: "/currentuser", component: CurrentUser }),
		React.createElement(Route, { path: "/profile/:username", component: ProfileInfo })
	)
);

ReactDom.render(app, document.getElementById("root"));