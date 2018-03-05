// fix memory leak warning
require('events').EventEmitter.defaultMaxListeners = Infinity;

var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		sass = require('gulp-sass'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		csso = require('postcss-csso'),
		plumber = require('gulp-plumber'),

		// your-expected-site-name

		// OpenCart
		// watch_path = './opencart/upload/',
		// browser_sync = watch_path + 'catalog/view/theme';

		// WP
		watch_path = './wordpress/wp-content/',
		browser_sync = watch_path + 'themes/';


gulp.task('serve', ['sass'], function () {

	browserSync.init({
		proxy: "http://docker.dev",
		notify: false,
		open: false // no new browser tab
	});

	gulp.watch(browser_sync + "/**/*.scss", ['sass']);

	// OpenCart
//	gulp.watch(browser_sync + "/**/*.tpl").on('change', browserSync.reload);

	// WP
	gulp.watch(browser_sync + "/**/*.php").on('change', browserSync.reload);
});

gulp.task('sass', function () {
	var plugins = [
		autoprefixer(),
		csso()    // old best
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