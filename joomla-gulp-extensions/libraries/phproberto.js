var gulp = require('gulp');

var config = require('../../gulp-config.json');

// Dependencies
var browserSync = require('browser-sync');
var rm          = require('gulp-rimraf');
var zip         = require('gulp-zip');

var extPath   = './extensions/libraries/phproberto';
var mediaPath = extPath + '/media/phproberto';

// Clean
gulp.task('clean:libraries.phproberto', ['clean:libraries.phproberto:manifest', 'clean:libraries.phproberto:media'], function() {
		return gulp.src(config.wwwDir + '/libraries/phproberto', { read: false })
			.pipe(rm({ force: true }));
});

// Clean manifest
gulp.task('clean:libraries.phproberto:manifest',
	function() {
		return 	gulp.src(config.wwwDir + '/administrator/manifests/libraries/phproberto.xml', { read: false })
			.pipe(rm({ force: true }));
});

// Clean: media
gulp.task('clean:libraries.phproberto:media', function() {
	return gulp.src(config.wwwDir + '/libraries/phproberto', { read: false })
		.pipe(rm({ force: true }));
});

// Copy
gulp.task('copy:libraries.phproberto', ['clean:libraries.phproberto', 'copy:libraries.phproberto:manifest'], function() {
		return gulp.src([
				extPath + '/**',
				'!' + extPath + '/phproberto.xml'
			])
			.pipe(gulp.dest(config.wwwDir + '/libraries/phproberto'));
});

// Copy manifest
gulp.task('copy:libraries.phproberto:manifest', ['clean:libraries.phproberto:manifest'], function() {
		return gulp.src(extPath + '/phproberto.xml')
			.pipe(gulp.dest(config.wwwDir + '/administrator/manifests/libraries'));
});

// Watch
gulp.task('watch:libraries.phproberto', function() {
	gulp.watch(extPath + '/**', ['copy:libraries.phproberto', browserSync.reload]);
});
