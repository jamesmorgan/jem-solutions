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
    imageResize = require('gulp-image-resize'),
    notify = require('gulp-notify');

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
        .pipe(notify({message: 'Completed browserify task...'}));
});

// Styles task
gulp.task('styles', function () {

    // Copy template cover.css file to the dist folder
    gulp.src('app/template-css/cover.css').pipe(gulp.dest('build/css/'));

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
        .pipe(gulp.dest('build/css/'));
});

// Create link logos for front page
gulp.task('create_link_logos', function () {
    return gulp.src('app/images/links/src/*')
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
        .pipe(gulp.dest("build/images/links/dest/"));
});

// Views task
gulp.task('views', function () {
    // Process any other view files from app/views
    return gulp.src('app/views/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', function () {

    // JavaScripts
    gulp.watch(['./app/js/**/*.js'], ['lint', 'browserify']);

    // Styles
    gulp.watch(['./app/styles/**/*.scss'], ['styles']);

    // Views
    gulp.watch(['index.html', './app/views/**/*.html'], ['views']);

});

// Dev task
gulp.task('dev', function () {
    // Run all tasks once
    runSequence('styles', 'views', 'browserify');

    // Then, run the watch task to keep tabs on changes
    gulp.start('watch');
});

// Default task
gulp.task('default', ['dev']);