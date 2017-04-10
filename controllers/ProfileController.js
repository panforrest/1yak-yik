var Profile = require('../models/Profile')
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

module.exports = {
	find: function(params, callback){
        Profile.find(params, function(err, profiles){
        	if(err){
        		callback(err,null)
        		return
        	}
        	callback(null, profiles)
        })
	},

	findById: function(id, callback){
		Profile.findById(id, function(err, profile){
			if(err){
				callback(err, null)
				return
			}
			callback(null, profile)
		})

	},

	create: function(params, callback){
        var password = bcrypt.hashSync(params.password, 10)
        params['password'] = password   //params.password = password
        // if (params['password'])
        //     params['password'] = bcrypt.hashSyc

		Profile.create(params, function(err, profile){
			if (err) {
				callback(err, null)
				return
			}
			callback(null, profile)
		})
	},

	update: function(id, params, callback){
		Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
			if (err) {
				callback(err, null)
				return
			}
			callback(null, profile)
		})
	},

	delete: function(id, callback){
		Profile.findByIdAndRemove(id, function(err){ //Profile.findByIdAndRemove(id, function(err, profile){
            if (err) {
            	callback(err, null)
            	return
            }
            callback(null, null)
		})
	}
}