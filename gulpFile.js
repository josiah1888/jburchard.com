var gulp = require('gulp');

gulp.task('build', function () {
    gulp.src('src/**', {read: false})
        .pipe(gulp.dest('dist/'));
});