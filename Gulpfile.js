var gulp = require('gulp');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

// Start Development Express Server
function startExpress() {
    var express = require('express');
    var app = express();

    // Connect livereload-middle ware
    // Pages served by Express now have a small bit of JS injected just before their body closing tag.
    // This will make them react to the livereload updates.
    app.use(require('connect-livereload')());

    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);

    console.log('Express Started on port http://localhost:' + EXPRESS_PORT);
}

// Keep a reference to the tiny-lr object to send notifications of file changes
var liveReload;
function startLiveReload() {
    liveReload = require('tiny-lr')();
    liveReload.listen(LIVERELOAD_PORT);
    console.log('Reload magic started on port http://localhost:' + LIVERELOAD_PORT);
}

// Notifies livereload of changes detected by `gulp.watch()`
function notifyLiveReload(event) {
    // `gulp.watch()` events provide an absolute path so we need to make it relative to the server root
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

// `gulp.task()` defines task that can be run calling `gulp xyz` from the command line
// The `default` task gets called when no task name is provided to Gulp
gulp.task('default', function () {
    console.log('Gulp and running!');
    startExpress();
    startLiveReload();

    gulp.watch('*.html', notifyLiveReload);
});
