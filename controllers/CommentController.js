var Comment = require('../models/Comment')

module.exports = {
	find: function(params, callback){    //find: function(params){
		Comment.find(params, function(err, comments){    //Zone.find(params, function(err, response){
			if (err) {
				callback(err, null)  //err is always first, payload second
				return
			}
			callback(null, comments)
		})

	},

	findById: function(id, callback){
	    Comment.findById(id, function(err, comment){
	    	if (err) {
	    		callback(err, null)
	    		return
	    	}
            callback(null, comment)
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

		Comment.create(params, function(err, comment){
			if (err) {
				callback(err, null)
				return    //BE CAREFUL WHERE THIS LINE SHOULD GO
			}
            callback(null, comment)  //BE CAREFUL WHERE THIS LINE SHOULD GO
		})            
	},

	update: function(id, params, callback){	
		Comment.findByIdAndUpdate(id, params, {new:true}, function(err, comment){   //Zone.update(id, params, function(err, zone){
			if (err) {
				callback(err, null)
				return
			}
			callback (null, comment)
		})
	},

	delete: function(id, callback){
        Comment.findByIdAndRemove(id, function(err){
            if (err){
            	callback(err, null)
            	return
            }
            callback(null, null)
        })
	}
}