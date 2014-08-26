var gulp = require('gulp'),
    imageResize = require('gulp-image-resize'),
    rename = require("gulp-rename"),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

// Gulp plumber error handler
var onError = function (err) {
    console.log(err);
};

// Start Development Express Server
function startExpress() {
    var express = require('express');
    var app = express();
    // Connect livereload-middle ware
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

// Hint all of our custom developed Javascript to make sure things are clean
gulp.task('jshint', function () {
    return gulp.src('./js/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'JS Hinting task complete' }));
});

gulp.task('live_reload', function () {
    startExpress();
    startLiveReload();
    gulp.watch(['/js/*', '*.html', '/css/*', '/images/*'], notifyLiveReload);
});

gulp.task('convert_link_images', function () {
    gulp.src('images/src/links/*')
        .pipe(imageResize({
            width: 80,
            height: 80,
            format: 'png',
            crop: false,
            upscale: true
        }))
        .pipe(rename(function (path) {
            path.basename += "-80x80";
        }))
        .pipe(gulp.dest('images/dist/links/'));
});

// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['live_reload', 'convert_link_images', 'jshint'], function () {
    console.log("Gulp running...")
});
