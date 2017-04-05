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

        put: (id) => {
            superagent
            .findByIdAndUpdate(id)
            .send()
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) {
                    alert('ERROR: '+err)
                    return
                }
                console.log(JSON.stringify(response.body))
            })
        },

        delete: () => {

        }
}