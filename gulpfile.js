// fix memory leak warning
require('events').EventEmitter.defaultMaxListeners = Infinity;

var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		sass = require('gulp-sass'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		//		cssnano = require('cssnano'),
		csso = require('postcss-csso'),
//		csswring = require('csswring'),
		plumber = require('gulp-plumber'),
//		notify = require("gulp-notify"),
		// your-expected-site-name
		watch_path = './wordpress/wp-content/',
		// change site-theme
		browser_sync = watch_path + 'themes/pendock/';


gulp.task('serve', ['sass'], function () {

	browserSync.init({
		proxy: "http://docker.dev",
		notify: false,
		open: false, // no new browser tab
	});

	gulp.watch(browser_sync + "/**/*.scss", ['sass']);
	gulp.watch(browser_sync + "/**/*.php").on('change', browserSync.reload);
});

gulp.task('sass', function () {
	var plugins = [
		autoprefixer(),
//		cssnano(), // good
		csso(),    // old best
//		csswring(), // new best
	];
	return gulp.src(browser_sync + "/**/*.scss", {base: browser_sync})
			.pipe(plumber())
			//			.pipe(sass())
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss(plugins))
			.pipe(gulp.dest(function (file) {
				return file.base;
			}))
			.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);