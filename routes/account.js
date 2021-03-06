var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var AccountController = require('../controllers/AccountController')
var bcrypt = require('bcryptjs')

router.get('/:action', function(req, res, next){

	var action = req.params.action

	if (action == 'logout'){
		req.session.reset()
		res.json({
			confirmation: 'success',
			message: 'bye',
			user: null
		})
		return
	}

	if (action == 'currentuser') {
		AccountController.currentUser(req)
		.then(function(result){
			res.json({
                confirmation: 'success',
                user: result   //result: result
			})
		})
		.catch(function(err){
			res.json({
                confirmation: 'fail',
                message: err.message
			})
		})
	}
})

router.post('/:action', function(req, res, next){

	var action = req.params.action

	if (action == 'signup'){
	    ProfileController.create(req.body, function(err, result){
	    	if (err) {
	    		res.json({
	    			confirmation: 'fail',
	    			message: err.message
	    		})
	    		return
	    	}

            // var profile = result
            // req.session.user = profile._id
            req.session.user = result._id

	    	res.json({
	    		confirmation: 'success',
	            user: result    //result: result
	    	})
	    })		
	}

	if (action == 'login') {
		ProfileController.find({username: req.body.username}, function(err, results){  //ProfileController.find({username: req.query.username}, function(err, results){
			if (err) {
				res.json({
					confirmation: 'fail',
					message: err.message
				})
				return
			} 

			if (results.length == 0) {
				res.json({
					confirmation: 'fail',
					message: 'user: '+req.body.username+' dose not exist, check your spelling'
				})
				return 				
			} 

			var profile = results[0]
            var passwordCorrect = bcrypt.compareSync(req.body.password, profile.password)   //hashCompare(result.password: req.body.password) 
            if (passwordCorrect == false){
            	res.json({
            		confirmation: 'fail',
            		message: 'please key in correct Password'
            	})
            	return
            }

            req.session.user = profile._id

            res.json({
            	confirmation: 'success',
            	message: 'user: '+req.body.username+' logged in',
            	user: profile   //user: req.body
            })
		})		
	}		
})

// router.post('/signup', function(req, res, next){
//     ProfileController.create(req.body, function(err, result){
//     	if (err) {
//     		res.json({
//     			confirmation: 'fail',
//     			message: err.message
//     		})
//     		return
//     	}
//     	res.json({
//     		confirmation: 'success',
//             result: result
//     	})
//     })
// })

module.exports = router