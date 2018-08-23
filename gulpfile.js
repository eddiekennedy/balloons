// Gulp
var gulp = require('gulp');

// Plugins
var sass = require('gulp-sass');
var inlinesource = require('gulp-inline-source');
var fileinclude = require('gulp-file-include')
var server = require('gulp-server-livereload');

// Sass
gulp.task('styles', function () {
  gulp.src('./src/styles/**/*.scss')
    .pipe(sass({
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

// Compile Markup
gulp.task('compilemarkup', function () {
  return gulp.src(['./src/markup/*.html', '!./src/markup/partials/*.html'])
    .pipe(inlinesource({
      rootpath: './'
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'));
});

// Copy Images
gulp.task('copy-images', function() {
  gulp.src('./src/images/*.{gif,jpg,png,svg,pdf}')
    .pipe(gulp.dest('./dist/images'));
});

// Server
gulp.task('server', function() {
  gulp.src('./dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

// Watch
gulp.task('watch', function () {
  gulp.watch(['./src/styles/**/*.scss'], ['styles', 'compilemarkup']);
  gulp.watch(['./src/markup/**/*.html'], ['compilemarkup']);
  gulp.watch(['./src/images/*.{gif,jpg,png,svg,pdf}'], ['copy-images']);
});

// Default Task
gulp.task('default', ['styles', 'copy-images', 'compilemarkup', 'server', 'watch']);
