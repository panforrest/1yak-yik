var ProfileController = require('./ProfileController')
var Promise = require('bluebird')

module.exports = {

	currentUser: function(req){

        return new Promise(function(resolve, reject){
			if (req.session == null) {
				// console.log('ERROR 1')
				// reject({message:'user not logged in'})
				resolve(null)
				return
			}

			if (req.session.user == null) {
				// console.log('ERROR 2')
	   //          reject({message:'User not logged in'})
	            resolve(null)
				return
			}

			ProfileController.findById(req.session.user, function(err, result){
				if (err) {
					console.log('ERROR 3')
	                reject(err)
					return
				}

	            resolve(result)
			})
        })
	}		
}