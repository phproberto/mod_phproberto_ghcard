var gulp = require('gulp');

var config = require('../../gulp-config.json');

// Dependencies
var browserSync = require('browser-sync');
var rm          = require('gulp-rimraf');
var zip         = require('gulp-zip');

var baseTask  = 'libraries.phproberto';
var extPath   = './extensions/libraries/phproberto';
var mediaPath = extPath + '/media/phproberto';

// Clean
gulp.task('clean:' + baseTask, ['clean:' + baseTask + ':manifest', 'clean:' +  baseTask + ':media'], function() {
		return gulp.src(config.wwwDir + '/libraries/phproberto', { read: false })
			.pipe(rm({ force: true }));
});

// Clean manifest
gulp.task('clean:' + baseTask + ':manifest',
	function() {
		return 	gulp.src(config.wwwDir + '/administrator/manifests/libraries/phproberto.xml', { read: false })
			.pipe(rm({ force: true }));
});

// Clean: media
gulp.task('clean:' + baseTask + ':media', function() {
	return gulp.src(config.wwwDir + '/libraries/phproberto', { read: false })
		.pipe(rm({ force: true }));
});

// Copy
gulp.task('copy:' + baseTask, ['clean:' + baseTask, 'copy:' + baseTask + ':manifest'], function() {
		return gulp.src([
				extPath + '/**',
				'!' + extPath + '/phproberto.xml'
			])
			.pipe(gulp.dest(config.wwwDir + '/libraries/phproberto'));
});

// Copy manifest
gulp.task('copy:' + baseTask + ':manifest', ['clean:' + baseTask + ':manifest'], function() {
		return gulp.src(extPath + '/phproberto.xml')
			.pipe(gulp.dest(config.wwwDir + '/administrator/manifests/libraries'));
});

// Watch
gulp.task('watch:' + baseTask, function() {
	gulp.watch(extPath + '/**', ['copy:' + baseTask, browserSync.reload]);
});
