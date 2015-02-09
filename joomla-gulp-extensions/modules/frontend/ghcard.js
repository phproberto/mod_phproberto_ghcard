var gulp = require('gulp');

var config = require('../../../gulp-config.json');

var extPath   = '.';
var mediaPath = extPath + '/media/mod_phproberto_ghcard';

// Dependencies
var browserSync = require('browser-sync');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var rm          = require('gulp-rimraf');
var sass        = require('gulp-ruby-sass');
var uglify      = require('gulp-uglify');
var zip         = require('gulp-zip');

// Clean
gulp.task('clean:modules.frontend.ghcard', function() {
    return gulp.src(config.wwwDir + '/modules/mod_phproberto_ghcard', { read: false })
        .pipe(rm({ force: true }));
});

// Clean: media
gulp.task('clean:modules.frontend.ghcard:media',
	['clean:modules.frontend.ghcard:media'], function() {
    return gulp.src(config.wwwDir + '/media/mod_phproberto_ghcard', { read: false })
        .pipe(rm({ force: true }));
});

// Copy
gulp.task('copy:modules.frontend.ghcard',
	[
		'copy:modules.frontend.ghcard:module',
		'copy:modules.frontend.ghcard:media'
	],
	function() {
});

// Copy module
gulp.task('copy:modules.frontend.ghcard:module',
	['clean:modules.frontend.ghcard'], function() {
	return gulp.src([
        extPath + '/**',
        '!' + extPath + '/joomla-gulp-extensions',
        '!' + extPath + '/joomla-gulp-extensions/**',
		'!' + mediaPath,
		'!' + mediaPath + '/**',
        '!' + extPath + '/node_modules',
        '!' + extPath + '/node_modules/**',
        '!' + extPath + '/gulp*.*',
		'!' + extPath + '/package.json'
	])
	.pipe(gulp.dest(config.wwwDir + '/modules/mod_phproberto_ghcard'));
});

// Copy media
gulp.task('copy:modules.frontend.ghcard:media', function() {
    return gulp.src([
	        mediaPath + '/**'
    	])
		.pipe(gulp.dest(config.wwwDir + '/media/mod_phproberto_ghcard'));
});

// Sass
gulp.task('sass:modules.frontend.ghcard', function () {
	return gulp.src(mediaPath + '/scss/style.scss')
		.pipe(sass({loadPath: [mediaPath + '/scss']}))
		.pipe(gulp.dest(mediaPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_phproberto_ghcard/css'))
		.pipe(minifyCSS())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(mediaPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_phproberto_ghcard/css'));
});

// Compile scripts
gulp.task('scripts:modules.frontend.ghcard', function () {
	return gulp.src([
			mediaPath + '/js/**/*.js',
			'!' + mediaPath + '/js/**/*.min.js',
			'!' + mediaPath + '/js/**/*-min.js'
		])
		.pipe(gulp.dest(config.wwwDir + '/media/mod_phproberto_ghcard/js'))
		.pipe(uglify())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(mediaPath + '/js'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_phproberto_ghcard/js'));
});

// Watch
gulp.task('watch:modules.frontend.ghcard',
	[
		'watch:modules.frontend.ghcard:module',
		'watch:modules.frontend.ghcard:scripts',
		'watch:modules.frontend.ghcard:sass'
	],
	function() {
});

// Watch: Module
gulp.task('watch:modules.frontend.ghcard:module', function() {
    gulp.watch([
	        extPath + '/**',
	        '!' + extPath + '/joomla-gulp-extensions',
	        '!' + extPath + '/joomla-gulp-extensions/**',
    		'!' + extPath + '/media',
    		'!' + extPath + '/media/**',
	        '!' + extPath + '/node_modules',
	        '!' + extPath + '/node_modules/**',
	        '!' + extPath + '/gulp-config*.js',
    		'!' + extPath + '/gulpfile.js',
    		'!' + extPath + '/package.json'
    	],
    	['copy:modules.frontend.ghcard:module', browserSync.reload]);
});

// Watch: Scripts
gulp.task('watch:modules.frontend.ghcard:scripts',
	function() {
		gulp.watch([
			mediaPath + '/js/**/*.js',
			'!' + mediaPath + '/js/**/*.min.js'
		],
		['scripts:modules.frontend.ghcard', browserSync.reload]);
});

// Watch: Styles
gulp.task('watch:modules.frontend.ghcard:sass',
	function() {
		gulp.watch(
			[
				mediaPath + '/scss/**'
			],
			['sass:modules.frontend.ghcard', browserSync.reload]
		);
});