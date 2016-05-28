var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var changed = require('gulp-changed');
var imagemin =require('gulp-imagemin');
var inlineSource = require('gulp-inline-source');
var filter = require('gulp-filter');

var DIST = 'dist/';

gulp.task('build', [], function () {
    var js = filter(['**/*.js'], {restore: true});
    var css = filter(['**/*.css'], {restore: true});
    var index = filter(['**/index.html'], {restore: true});
    var images = filter(['**/*.(gif|jpg|svg|png)'], {restore: true});
    
    return gulp.src('src/**/*.*')
        .pipe(js)
        .pipe(uglify())
        .pipe(js.restore)
        .pipe(css)
        .pipe(csso())
        .pipe(css.restore)
        .pipe(index)
        .pipe(inlineSource())
        .pipe(index.restore)
        .pipe(images)
        .pipe(imagemin())
        .pipe(images.restore)
        .pipe(gulp.dest(DIST));
});