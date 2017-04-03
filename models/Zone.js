var mongoose = require('mongoose')

var ZoneSchema = new mongoose.Schema({   //NOT var ZoneSchemas = mongoose.Schema({ 
	name: {type:String, default:''},
	zipCodes: {type:Array, default:[]},   //zipCodes: {type:String, default:''},
	timestamp: {type:Date, default:Date.now}   //timestamp: {type:String, default:Date.now()}
})  

module.exports = mongoose.model('ZoneSchema', ZoneSchema)   //module.exports = new mongoose.model('ZoneSchema', ZoneSchema)  