var ProfileController = require('./ProfileController')

module.exports = {

	currentUser: function(req, callback){
		if (req.session == null) {
			callback({message:'user not logged in'}, null)
			return
		}

		if (req.session.user == null) {
            callback({message:'User not logged in'}, null)
			return
		}

		ProfileController.findById(req.session.user, function(err, result){
			if (err) {
                callback(err, null)
				return
			}

            callback(null, result)
		})		
	}		

}