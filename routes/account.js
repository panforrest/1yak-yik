var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcryptjs')

router.post('/:action', function(req, res, next){

	var action = req.params.action

	if (action == 'login') {

		ProfileController.find({username: req.body.username}, function(err, results){  //ProfileController.find({username: req.query.username}, function(err, results){
			if (err) {
				res.json({
					confirmation: 'fail',
					message: err.message
				})
				return
			} 
			// res.json({
			// 	confirmation: 'success',
			// 	results: results
			// }) 
			if (results.length == 0) {
				res.json({
					confirmation: 'fail',
					message: 'user: '+req.body.username+' dose not exist, check your spelling'
				})
				return 				
			} 

			var result = results[0]
            var passwordCorrect = bcrypt.compareSync(req.body.password, result.password)   //hashCompare(result.password: req.body.password) 
            if (passwordCorrect == false){
            	res.json({
            		confirmation: 'fail',
            		message: 'please key in correct Password'
            	})
            	return
            }

            res.json({
            	confirmation: 'success',
            	message: 'user: '+req.body.username+' logged in'
            })
		})		
		// res.json({
		// 	confirmation: 'success',
		// 	action: action
		// })
	}		
})

// router.post('/:action', function(req, res, next){

// 	var action = req.params.action

// 	if (action == 'login') {
		
// 		res.json({
// 			confirmation: 'success',
// 			action: action
// 		})
// 	}
		
// })

// router.post('/signup', function(req, res, next){
//     controller.create(req.body, function(err, result){
//     	if (err) {
//     		res.json({
//     			confirmation: 'fail',
//     			message: err
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