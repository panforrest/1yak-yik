var express = require('express');
var router = express.Router();
// var ZoneController = require('../controllers/ZoneController')
var controllers = require('../controllers')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.json({
//     	confirmation: 'success'
//     })
// });

router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null) {
        res.json({
            confirmation: 'fail',
            messsage: 'invalid resource request: '+resource
        })
        return
    }

    // if (resource == 'zone'){
    controller.find(req.query, function(err, results){  //ZoneController.find(req.body, function(err, results){
    	if (err) {
    		res.json({
    			confirmation: 'fail',
    			message: err
    		})
    		return
    	}
    	res.json({
    		confirmation: 'success',
    		results: results
    	})
    })
    // }
});

router.get('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource
    var id = req.params.id
    var controller = controllers[resource]

    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'invalid resource request: '+resource
        })
        return
    }

    // if (resource == 'zone'){
    controller.findById(id, function(err, result){
    	if (err) {
    		res.json({
    			confirmation: 'fail',
    			message: 'unable to find id: '+id
    		})
    		return
    	}
    	res.json({
    		confirmation: 'success',
    		result: result
    	})
    })
    // }
});

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'invalid resource request: '+resource
        })
        return
    }

    // if (resource == 'zone'){
    controller.create(req.body, function(err, result){   //I AM SO STUPID, ZoneController.find(req.body, function(err, result){
    	if (err) {
    		res.json({
    			confirmation: 'fail',
    			message: err
    		})
    		return
    	}
    	res.json({
    		confirmation: 'success',
    		result: result
    	})
    })
    // }
});

router.put('/:resource/:id', function(req, res, next){
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'invalid resource request: '+resource
        })
        return
    } 

    var id = req.params.id
    controller.update(id, req.body, function(err, result){   
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }
        res.json({
            confirmation: 'success',
            result: result
        })
    })

})

module.exports = router;