var ProfileController = require('./ProfileController')
var Promise = require('bluebird')

module.exports = {

	currentUser: function(req){

        return new Promise(function(resolve, reject){
			if (req.session == null) {
				reject({message:'user not logged in'})
				return
			}

			if (req.session.user == null) {
	            reject({message:'User not logged in'})
				return
			}

			ProfileController.findById(req.session.user, function(err, result){
				if (err) {
	                reject(err)
					return
				}

	            resolve(result)
			})
        })
	}		
}