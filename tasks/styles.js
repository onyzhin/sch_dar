/*===========================================================
 GULP : APP TASKS :: CSS & SASS -- minify, concat
===========================================================*/
var gulp = require('gulp'),
    config = require('./config'),
    gulpIf = require('gulp-if'),
    gulploadPlugins = require('gulp-load-plugins'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');

var plugins = gulploadPlugins();
var config = require('./config');

var onError = function (err) {
    console.log(config.notify.error('\n--------- SASS file has error clear it to see changes, check the log below -------------\n'));
    console.log(err);
    this.emit('end');
};

gulp.task('sass', function () {

    console.log(config.notify.update('\n--------- Running SASS tasks -------------------------------------------'));
    return gulp.src(['app/scss/main.scss'])  
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(plugins.sass())
        .pipe(plugins.size())
        .pipe(gulp.dest(config.source.css));
});

gulp.task('styles', ['sass'], function () {

    console.log(config.notify.update('\n--------- Running CSS tasks --------------------------------------------\n'));
    return gulp.src([config.source.css + '/**/*.css']) 
        .pipe(autoprefixer({ 
            browsers: config.browserVersion,
            cascade: false
        }))
        .pipe(gulpIf(config.production, plugins.minifyCss()))
        //.pipe(plugins.concat('main.css'))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.css));
});
