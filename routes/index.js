var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var serverapp = require('../public/build/es5/serverapp')
var Home = require('../public/build/es5/components/layout/Home')

matchRoutes = function(req, routes){
	return new Promise(function(resolve, reject){
		ReactRouter.match({ routes, location: req.url }, function(error, redirectLoactoin, renderProps){
			if (error) {
				reject(error)
				return
			}

			resolve(renderProps)
		})
	})
}

router.get('/', function(req, res, next) {

	var routes = {
		path: '/',
		component: serverapp,
	    // initial: initialStore,
		indexRoute: {
			component: Home
		}
	}

	matchRoutes(req, routes)
	.then(function(renderProps){
		// var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
        console.log('TEST 1')  //console.log('TEST 1'+html)
	})
	.catch(function(err){
        console.log('TEST 2: '+err)
	})

    res.render('index', { react: ''});
  // res.render('createzone', { title: 'Express' });
});

router.get('/:page', function(req, res, next) {
    res.render(req.params.page, null);	

});

module.exports = router;
