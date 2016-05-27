var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var changed = require('gulp-changed');
var imagemin =require('gulp-imagemin');
var inlineSource = require('gulp-inline-source');
var filter = require('gulp-filter');

var DIST = 'dist/';

gulp.task('build', ['images', 'build--js'], function () {
    var js = filter(['*', '**/*.js'], {restore: true});
    var jsApp = filter(['*', '!*.min.js'], {restore: true});
    var css = filter(['*', '**/*.css'], {restore: true});
    var cssApp = filter(['*', '!*.min.css'], {restore: true});
    var index = filter(['*', '**/index.html'], {restore: true});
    
    return gulp.src('src/**/*.*')
        .pipe(js)
        .pipe(jsApp)
        .pipe(uglify())
        .pipe(jsApp.restore)
        .pipe(js.restore)
        .pipe(css)
        .pipe(cssApp)
        .pipe(csso())
        .pipe(cssApp.restore)
        .pipe(css.restore)
        .pipe(index)
        .pipe(inlineSource())
        .pipe(index.restore)
        .pipe(gulp.dest(DIST));
});

gulp.task('images', function() {
   return gulp.src('src/images/**')
        .pipe(changed(DIST))
        .pipe(imagemin())
        .pipe(gulp.dest(DIST));
});

gulp.task('build--js', function() {
   return gulp.src('src/lib/js/**')
        .pipe(changed(DIST))
        .pipe(imagemin())
        .pipe(gulp.dest(DIST));
});