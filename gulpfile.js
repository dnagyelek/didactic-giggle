// fix memory leak warning
require('events').EventEmitter.defaultMaxListeners = Infinity;

const gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		watch = require('gulp-watch'),
		sass = require('gulp-sass'),
		postcss = require('gulp-postcss'),
		// gulp plugins
		autoprefixer = require('autoprefixer'),
		csso = require('postcss-csso'),
		merge_rules = require("postcss-merge-rules"),           // optional
		mqpacker = require("css-mqpacker"),

		// uncss gulp plugin version
//		uncss = require('postcss-uncss'),
		// uncss pipe version
//		uncss = require('gulp-uncss'),

		//      next best thing
//      critical = require('critical'),

		browserSync = require('browser-sync').create(),
		// OpenCart
		// watch_path = './opencart/upload/',
		// browser_sync = watch_path + 'catalog/view/theme';
		// WP
		// your-expected-site-name
		watch_path = './wordpress/wp-content/',
		// change site-theme
		browser_sync_theme = watch_path + 'themes/',
		browser_sync_sass = browser_sync_theme + 'kreon/',
		browser_sync_plugin = watch_path + 'plugins/';

function server() {

	browserSync.init({
		proxy: "http://docker.local",
		https: true,
		notify: false,
		open: false // no new browser tab
	});

	// WP Sass
	watch(browser_sync_sass + '/**/*.scss').on('change', css);

	// WP Themes + WP Plugins
	// WP Themes
	watch(browser_sync_theme + "/**/*.php").on('change', browserSync.reload);

	// WP Plugins
	watch(browser_sync_plugin + "/**/*.php").on('change', browserSync.reload);

	// OpenCart
	// watch(browser_sync + "/**/*.tpl").on('change', browserSync.reload);

}

// Sass tasks
function css() {
	const plugins = [
		autoprefixer(),
		/*		uncss({
					html: ['http://docker.local/automatic-roller-garage-doors'],
					ignore: ['#toc ']
				}),*/
		// unique_selectors(),  // optional
		merge_rules(),       // optional
		csso(),    // old best
		mqpacker({
			sort: true
		})
	];
	return gulp
			.src(browser_sync_sass + "/**/*.scss", {base: browser_sync_sass})
			.pipe(plumber())
			.pipe(sass().on('error', sass.logError))
			// will slow down
			/*			.pipe(uncss({
							html: ['http://docker.local/automatic-roller-garage-doors'],
							ignore: ['#toc ']
						 }))*/
			.pipe(postcss(plugins))
			.pipe(gulp.dest(function (file) {
				return file.base;
			}))
			.pipe(browserSync.stream());
}

exports.css = css;

exports.default = server;

