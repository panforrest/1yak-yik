var express = require('express');
var router = express.Router();
var ZoneController = require('../controllers/ZoneController')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
    	confirmation: 'success'
    })
});

router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource

    if (resource == 'zone'){
        ZoneController.find(req.query, function(err, results){  //ZoneController.find(req.body, function(err, results){
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
    }
});

router.get('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource
    var id = req.params.id

    if (resource == 'zone'){
        ZoneController.findById(id, function(err, result){
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
    }
});

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource

    if (resource == 'zone'){
        ZoneController.create(req.body, function(err, result){   //I AM SO STUPID, ZoneController.find(req.body, function(err, result){
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
    }
});

module.exports = router;