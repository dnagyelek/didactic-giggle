// fix memory leak warning
require('events').EventEmitter.defaultMaxListeners = Infinity;

var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		sass = require('gulp-sass'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		csso = require('postcss-csso'),
//		uncss = require('postcss-uncss'),
		uncss = require('gulp-uncss'),
		mqpacker = require("css-mqpacker"),
		plumber = require('gulp-plumber'),

		// your-expected-site-name
		watch_path = './wordpress/wp-content/',
		// change site-theme
		browser_sync_theme = watch_path + 'themes/',
		browser_sync_sass = browser_sync_theme + 'voalu/',
		browser_sync_plugin = watch_path + 'plugins/';

gulp.task('default', ['serve']);

gulp.task('serve', ['sass'], function () {

	browserSync.init({
		proxy: "http://docker.dev",
		notify: false,
		open: false // no new browser tab
	});

	// WP Sass
	gulp.watch(browser_sync_sass + "/**/*.scss", ['sass']);

	// WP Themes
	gulp.watch(browser_sync_theme + "/**/*.php").on('change', browserSync.reload);

	// WP Plugins
	gulp.watch(browser_sync_plugin + "/**/*.php").on('change', browserSync.reload);

	// OpenCart
//	gulp.watch(browser_sync + "/**/*.tpl").on('change', browserSync.reload);


});

gulp.task('sass', function () {
	var plugins = [
		autoprefixer(),
		csso(),    // old best
		mqpacker({
			sort: true
		})
	];
	return gulp.src(browser_sync_sass + "/**/*.scss", {base: browser_sync_sass})
			.pipe(plumber())
			//			.pipe(sass())
			.pipe(sass().on('error', sass.logError))
			.pipe(uncss({
				html: ['https://dralb.co.uk/find-a-used-car'],
				ignore: ['#toc ']
			}))
			.pipe(postcss(plugins))
			.pipe(gulp.dest(function (file) {
				return file.base;
			}))
			.pipe(browserSync.stream());
});