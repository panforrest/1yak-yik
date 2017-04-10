var express = require('express')
var router = express.Router()
var controller = require('../controllers/ProfileController')

router.get('/:action', function(req, res, next){

	var action = req.params.action

	if (action == 'login') {
		
		res.json({
			confirmation: 'success',
			action: action
		})
	}
		
})

router.post('/:action', function(req, res, next){

	var action = req.params.action

	if (action == 'login') {
		
		res.json({
			confirmation: 'success',
			action: action
		})
	}
		
})

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