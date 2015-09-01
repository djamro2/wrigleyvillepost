
//grap our gulp packages
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'index.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('index.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
	
	//watch stylesheet files
	gulp.watch('client/css/styles.css', function(event){
		gulp.src('client/css/styles.css')
	        .pipe(livereload());
	});
	
	//watch html files
	gulp.watch('views/**/*', function(event){
		gulp.src('views/**/*')
	        .pipe(livereload());
	});
	
	//watch front-end app files in general, no need to restart completely
	gulp.watch('client/app/**/*', function(event){
		gulp.src('client/app/**/*')
	        .pipe(livereload());
	});
	
});

gulp.task('scripts', function(){
	gulp.src('client/app/controllers/*.js')
	    .pipe(uglify())
		.pipe(gulp.dest('client/minjs'));
	gulp.src('client/app/*.js')
	    .pipe(uglify())
		.pipe(gulp.dest('client/minjs'));
});

gulp.task('styles', function(){
	//nothing for now, compress css later
});

gulp.task('watch', function(){
	//nothing for now, use if I hae sass later
});

//no imagemin right now since this causes problems on the live site
//look into this problem later
