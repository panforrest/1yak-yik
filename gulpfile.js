var gulp = require('gulp')
var to5 = require('gulp-6to5')
var less = require('gulp-less')
var gp_concat = require('gulp-concat')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('es6-es5', function(){
	return gulp.src([
			    './src/serverapp.js',
	            './src/*/**.js',
	            './src/*/*/**.js'
		    ]
		)    
		.pipe(to5())
		.pipe(gulp.dest('./public/build/es5/'))  //STRICTLY BENEFIT THE SERVER
})

gulp.task('css', function(){
	return gulp.src(
		[
            './public/css/bootstrap.css',
            './public/css/style.css',
            './public/css/swiper.css',
            './public/css/dark.css',
            './public/css/font-icons.css',
            './public/css/animate.css',
            './public/css/magnific-popup.css',
            './public/css/responsive.css'
		]
	)
	.pipe(minifyCSS())
	.pipe(autoprefixer('last 2 version', 'sarari 5', 'ie 8', 'ie 9'))
	.pipe(gp_concat('style.min.css'))
	.pipe(gulp.dest('./public/build/css/'))
})

gulp.task('watch', function(){
    gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js'],['es6-es5'])
})

gulp.task('default', ['es6-es5', 'css', 'watch'], function(){})