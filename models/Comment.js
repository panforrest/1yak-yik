var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({   //NOT var ZoneSchemas = mongoose.Schema({ 
	username: {type:String, default:''},
	// author: {type:mongoose.Schema.Types.Mixed, default:()}
	body: {type:String, default:''},
	zone: {type:String, default:''},
	timestamp: {type:Date, default:Date.now}   //timestamp: {type:String, default:Date.now()}
})  

module.exports = mongoose.model('CommentSchema', CommentSchema) 