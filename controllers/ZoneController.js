var Zone = require('../models/Zone')   //var Comment = require('../models/Zone')
var Promise = require('bluebird')

module.exports = {

	get: function(params){    
	    return new Promise(function(resolve, reject){
			Zone.find(params, function(err, zones){    
				if (err) {
					reject(err)  
					return
				}
				resolve(zones)
			})	    	
	    })
	},

	find: function(params, callback){    //find: function(params){
		Zone.find(params, function(err, zones){    //Zone.find(params, function(err, response){
			if (err) {
				callback(err, null)  //err is always first, payload second
				return
			}
			callback(null, zones)
		})

	},

	findById: function(id, callback){
	    Zone.findById(id, function(err, zone){
	    	if (err) {
	    		callback(err, null)
	    		return
	    	}
            callback(null, zone)
	    })	

	},

	create: function(params, callback){
        // var zips = params['zipCodes']
        // var zip = zips.split(',')
        // var newZips = []

        // zip.forEach(function(zipCode){
        // 	newZips.push(zipCode.trim())
        // })

        // params['zipCodes'] = newZips

		Zone.create(params, function(err, zone){
			if (err) {
				callback(err, null)
				return    //BE CAREFUL WHERE THIS LINE SHOULD GO
			}
            callback(null, zone)  //BE CAREFUL WHERE THIS LINE SHOULD GO
		})            
	},

	update: function(id, params, callback){	
		Zone.findByIdAndUpdate(id, params, {new:true}, function(err, zone){   //Zone.update(id, params, function(err, zone){
			if (err) {
				callback(err, null)
				return
			}
			callback (null, zone)
		})
	},

	delete: function(id, callback){
        Zone.findByIdAndRemove(id, function(err){
            if (err){
            	callback(err, null)
            	return
            }
            callback(null, null)
        })
	}
}