/**
 * Created by Work on 10/26/2016.
 */

// fix memory leak warning
require('events').EventEmitter.defaultMaxListeners = Infinity;

var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		// your-expected-site-name
		watch_path = './wordpress/wp-content/',
		// change site-theme
		browser_sync = watch_path + 'themes/';


gulp.task('default', function () {

	// init_watch(false, 3001, {target: 'http://docker.dev'});
	init_watch(true, 3001, {target: 'https://docker.dev'});
});

function init_watch(https, port, proxy) {

	var defaults = {
		port: 3001,
	};
	if (typeof https !== 'boolean') {
		https = defaults.https;
	}
	if (typeof port !== 'number') {
		port = defaults.port;
	}
	if (typeof proxy === 'string') {
		proxy = {target: proxy};
	} // fix the format if only target is passed
	if (typeof proxy !== 'object') {
		proxy = defaults.proxy;
	}

	browserSync({
		proxy: proxy,
		https: https,
		port: port,
		notify: false,
		open: false, // no new browser tab
		snippetOptions: {
			whitelist: ['/wp-admin/admin-ajax.php'],
			blacklist: ['/wp-admin/**']
		}
	});

	gulp.watch([browser_sync + '/**/*',
		// no babysit for minified nor scss
		'!' + browser_sync + '/**/*.min.css',
		'!' + browser_sync + '/**/*.scss'], function () {
		browserSync.reload();
	});
}