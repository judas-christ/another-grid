var pkg = require('./package.json');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');

var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> */\n'

gulp.task('dev', function() {
    return $.requirejs({
        baseUrl: 'src',
        out: 'another-grid.dev.js',
        name: '../build/development',
        pragmasOnSave: {
            exclude: true,
            development: true
        },
        findNestedDependencies: true,
        skipModuleInsertion: true,
        wrap: {
            start: "(function(window, undefined){",
            end: "})(this);"
        }
    })
    .pipe($.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'));
});

gulp.task('prod', function() {
    return $.requirejs({
        baseUrl: 'src',
        out: 'another-grid.js',
        name: '../build/production',
        pragmasOnSave: {
            exclude: true,
            development: false
        },
        findNestedDependencies: true,
        skipModuleInsertion: true,
        wrap: {
            start: "(function(window, undefined){",
            end: "})(this);"
        }
    })
    .pipe($.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'))
    .pipe($.rename({ extname: '.min.js' }))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('jshint', function() {
    return gulp.src('src/**/*.js')
        .pipe($.jshint())
});

gulp.task('clean', function(cb) {
    del('dist', cb);
})

gulp.task('default', ['jshint', 'dev', 'prod']);
