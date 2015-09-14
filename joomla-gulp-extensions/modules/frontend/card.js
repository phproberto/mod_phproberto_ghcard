var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Dependencies
var browserSync = require('browser-sync');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var rm          = require('gulp-rimraf');
var sass        = require('gulp-ruby-sass');
var uglify      = require('gulp-uglify');
var zip         = require('gulp-zip');

var baseTask  = 'modules.frontend.card';
var extPath   = './extensions/modules/site/card';
var mediaPath = extPath + '/media/mod_github_card';

// Clean
gulp.task('clean:' + baseTask, ['clean:' + baseTask + ':media'], function() {
	return gulp.src(config.wwwDir + '/modules/mod_github_card', { read: false })
		.pipe(rm({ force: true }));
});

// Clean: media
gulp.task('clean:' + baseTask + ':media', function() {
	return gulp.src(config.wwwDir + '/media/mod_github_card', { read: false })
		.pipe(rm({ force: true }));
});

// Copy
gulp.task('copy:' + baseTask,
	[
		'copy:' + baseTask + ':module',
		'copy:' + baseTask + ':media'
	],
	function() {
});

// Copy module
gulp.task('copy:' + baseTask + ':module', ['clean:' + baseTask, 'copy:' + baseTask + ':media'], function() {
	return gulp.src([
		extPath + '/**',
		'!' + extPath + '/media',
		'!' + extPath + '/media/**'
	])
	.pipe(gulp.dest(config.wwwDir + '/modules/mod_github_card'));
});

// Copy media
gulp.task('copy:' + baseTask + ':media', ['clean:' + baseTask + ':media'], function() {
	return gulp.src([
			mediaPath + '/**'
		])
		.pipe(gulp.dest(config.wwwDir + '/media/mod_github_card'));
});

// Sass
gulp.task('sass:' + baseTask, function () {
	return gulp.src(mediaPath + '/scss/style.scss')
		.pipe(sass({loadPath: [mediaPath + '/scss']}))
		.pipe(gulp.dest(mediaPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_github_card/css'))
		.pipe(minifyCSS())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(mediaPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_github_card/css'));
});

// Compile scripts
gulp.task('scripts:' + baseTask, function () {
	return gulp.src([
			mediaPath + '/js/**/*.js',
			'!' + mediaPath + '/js/**/*.min.js',
			'!' + mediaPath + '/js/**/*-min.js'
		])
		.pipe(gulp.dest(config.wwwDir + '/media/mod_github_card/js'))
		.pipe(uglify())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(mediaPath + '/js'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_github_card/js'));
});

// Watch
gulp.task('watch:' + baseTask,
	[
		'watch:modules.frontend.card:module',
		'watch:modules.frontend.card:scripts',
		'watch:modules.frontend.card:sass'
	],
	function() {
});

// Watch: Module
gulp.task('watch:' + baseTask + ':module', function() {
	gulp.watch([
			extPath + '/**',
			'!' + mediaPath,
			'!' + mediaPath + '/**'
		],
		['copy:' + baseTask + ':module', browserSync.reload]);
});

// Watch: Scripts
gulp.task('watch:' + baseTask + ':scripts',
	function() {
		gulp.watch([
			mediaPath + '/js/**/*.js',
			'!' + mediaPath + '/js/**/*.min.js'
		],
		['scripts:' + baseTask, browserSync.reload]);
});

// Watch: Styles
gulp.task('watch:' + baseTask + ':sass',
	function() {
		gulp.watch(
			[
				mediaPath + '/scss/**'
			],
			['sass:' + baseTask, browserSync.reload]
		);
});