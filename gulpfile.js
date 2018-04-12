var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass');

var sassSources = ['css/*.sass'];

gulp.task('sass', function() {
    gulp.src(sassSources)
    .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
    .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
    gulp.watch(sassSources, ['sass']);
});

gulp.task('default', ['sass', 'watch']);
