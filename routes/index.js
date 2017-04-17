var express = require('express');
var router = express.Router();
var Promise = require('bluebird')
var AccountController = require('../controllers/AccountController')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var serverapp = require('../public/build/es5/serverapp')
var store = require('../public/build/es5/stores/store')
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

    var initialStore = null
    var reducers = {}

    // get current user
    AccountController.currentUser(req)
    .then(function(result){
    	console.log('CURRENT USER: '+JSON.stringify(result))
    	//Populate store/reducer with current user:
    	reducers['account'] = {
    		user: result
    	}
    })
    .then(function(){
	    console.log('REDUCERS: '+JSON.stringify(reducers))
	    initialStore = store.configureStore(reducers)
		var routes = {
			path: '/',
			component: serverapp,
		    initial: initialStore,
			indexRoute: {
				component: Home
			}
		}

		matchRoutes(req, routes)
		.then(function(renderProps){
			var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))//TAKE REACT COMPONENT TO HTML
	        // console.log('TEST 1'+html) //console.log('TEST 1: ')  
	        res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) })
		})
		.catch(function(err){
	        console.log('ERROR: '+err)
		})
    })
    .catch(function(err){
    	console.log('NOT LOGGED IN: ')    	
    })

 //    console.log('REDUCERS: '+JSON.stringify(reducers))

 //    initialStore = store.configureStore(reducers)

	// var routes = {
	// 	path: '/',
	// 	component: serverapp,
	//     initial: initialStore,
	// 	indexRoute: {
	// 		component: Home
	// 	}
	// }

	// matchRoutes(req, routes)
	// .then(function(renderProps){
	// 	var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))//TAKE REACT COMPONENT TO HTML
 //        console.log('TEST 1'+html) //console.log('TEST 1: ')  
 //        res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) })
	// })
	// .catch(function(err){
 //        console.log('TEST 2: '+err)
	// })

    // res.render('index', { react: ''});
  // res.render('createzone', { title: 'Express' });
});

router.get('/:page', function(req, res, next) {
    res.render(req.params.page, null);	

});

module.exports = router;
