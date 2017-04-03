var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
    	app: './src/app.js'   //'/src/app.js'
    },
    output: {
        filename: 'public/build/bundle.js',    //sourceFile: '/public/bundle/built.js'
    	sourceMapFilename: 'public/build/bundle.map'    //mapSourceFile:
    },
    devtool: '#source-map',   //devtool: {}
    module: {     //modules: {
    	// debug:     
        loaders: [
            {
	            test: /\.jsx?$/,
	            exclude: /(node_modules)/,
	            loader: 'babel-loader',
	            query: {
	                presets: ['react', 'es2015']   //    preset: ['react', 'es2015']
	            }
            }
        ]
    }
}