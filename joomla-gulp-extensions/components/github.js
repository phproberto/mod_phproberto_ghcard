var gulp = require('gulp');

var config = require('../../gulp-config.json');
var extPath = '.';

// Dependencies
var browserSync = require('browser-sync');
var changed     = require('gulp-changed');
var rm          = require('gulp-rimraf');
var zip         = require('gulp-zip');

// Clean
gulp.task('clean:components.github',
	['clean:components.github:manifest'],
	function() {
		return true;
});
gulp.task('clean:components.github:manifest', function() {
	return gulp.src(config.wwwDir + '/administrator/manifests/packages/pkg_github.xml', { read: false })
		.pipe(rm({ force: true }));
});

// Copy
gulp.task('copy:components.github',
	['copy:components.github:manifest'],
	function() {
		return true;
});
gulp.task('copy:components.github:manifest', ['clean:components.github:manifest'], function() {
	return gulp.src(extPath + '/pkg_github.xml')
		.pipe(gulp.dest(config.wwwDir + '/administrator/manifests/packages'));
});

// Watch
gulp.task('watch:components.github',
	['watch:components.github:manifest'],
	function() {
		return true;
});
gulp.task('watch:components.github:manifest', function() {
	gulp.watch(extPath + '/pkg_github.xml', ['copy:components.github:manifest']);
});