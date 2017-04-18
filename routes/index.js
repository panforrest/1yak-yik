var express = require('express');
var router = express.Router();
var Promise = require('bluebird')
var AccountController = require('../controllers/AccountController')
var controllers = require('../controllers')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var __BUILD_DIR__ = '../public/build'
var serverapp = require(__BUILD_DIR__+'/es5/serverapp')
var store = require(__BUILD_DIR__+'/es5/stores/store')
var Home = require(__BUILD_DIR__+'/es5/components/layout/Home')
var ProfileInfo = require(__BUILD_DIR__+'/es5/components/layout/ProfileInfo')

// var serverapp = require('../public/build/es5/serverapp')
// var store = require('../public/build/es5/stores/store')
// var Home = require('../public/build/es5/components/layout/Home')

matchRoutes = function(req, routes){
	return new Promise(function(resolve, reject){
		ReactRouter.match({ routes: routes, location: req.url }, function(error, redirectLoactoin, renderProps){
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
    	// console.log('CURRENT USER: '+JSON.stringify(result))    	
    	reducers['account'] = { //Populate store/reducer with current user:
    		user: result
    	}
    	// fetch zones
    	return controllers.zone.get(null)
    })
    .then(function(zones){
        console.log('ZONES: '+JSON.stringify(zones))
        reducers['zone'] = {
        	list: zones,
		    selectedZone: 0,
		    appStatus: 'ready'
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

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))//TAKE REACT COMPONENT TO HTML
        res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) })
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

router.get('/:page/:slug', function(req, res, next){
	var page = req.params.page
	var slug = req.params.slug

	var initialStore = null
	var reducers = {}

	if (page == 'api'){
		next()
		return
	}

	if (page == 'account'){
		next()
		return
	}

	controllers.profile.get({username: slug})
	.then(function(profiles){
        var profile = profiles[0]
        var profileMap = {}
        profileMap[slug] = profile

        reducers['profile'] = {
	        list: [profile],   //list: profile,
	        map: profileMap,
	        appStatus: 'ready'
	    }

	    initialStore = store.configureStore(reducers)

	    var routes = {
			path: '/profile/:username',
			component: serverapp,
		    initial: initialStore,
			indexRoute: {
				component: ProfileInfo   //Home
			}
	    }

	    return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))//TAKE REACT COMPONENT TO HTML
        res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) })
    })
    .catch(function(err){

    })
})

// router.get('/:page', function(req, res, next) {
//     res.render(req.params.page, null);	
// });

router.get('/createzone', function(req, res, next) {
  res.render('createzone', null)
})

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null)
})

module.exports = router;
