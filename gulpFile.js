var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var changed = require('gulp-changed');
var imagemin =require('gulp-imagemin');
var inlineSource = require('gulp-inline-source');
var filter = require('gulp-filter');
var uncss = require('gulp-uncss');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');

var DIST = 'dist/';

gulp.task('build', ['build-all'], function() {
    var index = filter(['**/index.html'], {restore: true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(inlineSource({rootpath: 'dist'}))
        .pipe(index)
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: true
        // }))
        .pipe(index.restore)
        .pipe(gulp.dest(DIST));
});

gulp.task('build-all', function() {
    var js = filter(['**/*.js'], {restore: true});
    var css = filter(['**/*.css'], {restore: true});
    var images = filter(['**/*.(gif|jpg|svg|png)'], {restore: true});
    
    return gulp.src('src/**/*.*')
        .pipe(js)
        //.pipe(uglify())
        .pipe(js.restore)
        .pipe(css)
        //.pipe(uncss({html: ['**/index.html']}))
        //.pipe(csso())
        .pipe(css.restore)
        .pipe(images)
        .pipe(imagemin())
        .pipe(images.restore)
        .pipe(gulp.dest(DIST))
});