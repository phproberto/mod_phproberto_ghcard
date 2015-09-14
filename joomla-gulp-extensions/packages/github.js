var gulp = require('gulp');

var config = require('../../gulp-config.json');
var extPath = '.';

// Dependencies
var browserSync = require('browser-sync');
var changed     = require('gulp-changed');
var rm          = require('gulp-rimraf');
var zip         = require('gulp-zip');

var baseTask  = 'packages.github';
var extPath   = './';

// Clean
gulp.task('clean:' + baseTask,
	['clean:' + baseTask + ':languages', 'clean:' + baseTask + ':manifest'],
	function() {
		return true;
});

// Clean: languages
gulp.task('clean:' + baseTask + ':languages', function() {
	return gulp.src(config.wwwDir + '/language/**/*.pkg_github.*')
		.pipe(rm({ force: true }));
});

// Clean: manifest
gulp.task('clean:' + baseTask + ':manifest', function() {
	return gulp.src(config.wwwDir + '/administrator/manifests/packages/pkg_github.xml', { read: false })
		.pipe(rm({ force: true }));
});

// Copy
gulp.task('copy:' + baseTask,
	['copy:' + baseTask + ':languages', 'copy:' + baseTask + ':manifest'],
	function() {
		return true;
});

// Copy: languages
gulp.task('copy:' +  baseTask + ':languages', ['clean:' + baseTask + ':languages'], function() {
	return gulp.src(extPath + '/language/**')
		.pipe(gulp.dest(config.wwwDir + '/language'));
});

// Copy: Manifest
gulp.task('copy:' +  baseTask + ':manifest', ['clean:' + baseTask + ':manifest'], function() {
	return gulp.src(extPath + '/pkg_github.xml')
		.pipe(gulp.dest(config.wwwDir + '/administrator/manifests/packages'));
});

// Watch
gulp.task('watch:' + baseTask,
	['watch:'  + baseTask + ':languages', 'watch:'  + baseTask + ':manifest'],
	function() {
		return true;
});

// Watch: Languages
gulp.task('watch:' + baseTask + ':languages', function() {
	gulp.watch(extPath + '/language/**', ['copy:' + baseTask + ':languages']);
});

// Watch: Manifest
gulp.task('watch:' + baseTask + ':manifest', function() {
	gulp.watch(extPath + '/pkg_github.xml', ['copy:' + baseTask + ':manifest']);
});