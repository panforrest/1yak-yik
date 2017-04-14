import superagent from 'superagent'

export default {

    get: (url, params, callback) => {   // get: (params) => {
	superagent
        .get(url)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                callback(err, null)
        	return
            }

            //HANDLE API FAILURE:
            const confirmation = response.body.confirmation
            if (confirmation != 'success') {
                callback({message: response.body.message}, null)
                return
            }

            callback(null, response.body)  //callback(null, response)
        })    
    },


    post: (url, body, callback) => {  //post: (url, params, callback) => {
        superagent
        .post(url)
        .send(body)   //.send(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if(err){
                callback(err, null)
                return
            } 
     
            const confirmation = response.body.confirmation
            if (confirmation != 'success') {
                callback({message: response.body.message}, null)   //message
                return
            }

            callback(null, response.body)
        })
    },

    put: (url, body, callback) => {  //put: (id) => {
        superagent
        .put(url)   //.findByIdAndUpdate(id)
        .send(body)  //
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                callback(err, null)   //alert('ERROR: '+err)
                return
            }
            // console.log(JSON.stringify(response.body))
            const confirmation = response.body.confirmation
            if (confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }

            callback(null, response.body)
        })
    },

        delete: () => {

        },

    upload: (endpoint, file, params, callback) => {
        console.log('APIManager - upload: ')

    }
}