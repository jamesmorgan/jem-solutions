'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglifyify = require('uglifyify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    ngAnnotate = require('browserify-ngannotate'),
    templateCache = require('gulp-angular-templatecache'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    morgan = require('morgan'),
    express = require('express'),
    livereload = require('connect-livereload'),
    imageResize = require('gulp-image-resize'),
    notify = require('gulp-notify'),
    livereloadport = 35730,
    serverport = 3000;

/************************************************
 Web Server
 ***********************************************/

var server = express();
// log all requests to the console
server.use(morgan('dev'));
// Add live reload
server.use(livereload({port: livereloadport}));
server.use(express.static('./'));
// Serve index.html for all routes to leave routing up to Angular
server.all('/*', function (req, res) {
    res.sendFile('index.html', { root: './' });
});

/************************************************
 Gulp Tasks
 ***********************************************/

// JSHint task
gulp.task('lint', function () {
    // Watch for changes to all JS except template cache
    return gulp.src(['app/js/**/*.js', '!app/js/templates.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function () {

    var b = browserify({
        basedir: '.',
        entries: './app/js/main.js',
        debug: true,
        insertGlobals: true
    });

    b.transform({
        global: true
    }, ngAnnotate);

    b.transform({
        global: true
    }, uglifyify);

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(streamify(rename({suffix: '.min'})))
        .pipe(gulp.dest('build/js'))
        .pipe(refresh(lrserver))
        .pipe(notify({ message: 'Completed browserify task...' }));
});

// Styles task
gulp.task('styles', function () {

    // Copy template cover.css file to the dist folder
    gulp.src('app/template-css/cover.css')
        .pipe(gulp.dest('build/css/'));

    return gulp.src('app/styles/main.scss')
        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass({
            style: 'compressed',
            onError: function (e) {
                console.error(e);
            }
        }))
        // Add min to all processed
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css/'))
        .pipe(refresh(lrserver));
});

// Create link logos for front page
gulp.task('create_link_logos', function () {
    gulp.src('app/images/links/src/*')
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
        .pipe(gulp.dest("build/images/links/dest/"))
        .pipe(notify({ message: 'Running link images resize task...' }));
});

gulp.task('images', function (cb) {

});

// Views task
gulp.task('views', function () {
    // Process any other view files from app/views
    return gulp.src('app/views/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(refresh(lrserver));
});

gulp.task('watch', function () {

    // Watch our scripts
    gulp.watch(['./app/js/**/*.js'], [
        'lint',
        'browserify'
    ]);
    // Watch our styles
    gulp.watch(['./app/styles/**/*.scss'], [
        'styles'
    ]);
    // Watch our views
    gulp.watch(['index.html', './app/views/**/*.html'], [
        'views'
    ]);
    // Watch our images
    gulp.watch(['app/images/**/src/*'], [
        'images'
    ]);
});

// Dev task
gulp.task('dev', function () {

    // Start webserver
    server.listen(serverport);
    // Start live reload
    lrserver.listen(livereloadport);

    // Run all tasks once
    runSequence('styles', 'views', 'browserify', 'images');

    // Then, run the watch task to keep tabs on changes
    gulp.start('watch');

});
