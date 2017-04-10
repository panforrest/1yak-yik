var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')

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
			res.json({
				confirmation: 'success',
				results: results
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