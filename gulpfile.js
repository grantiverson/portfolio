var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    eslint = require('gulp-eslint');

var sassSources = ['css/*.sass'];
    // jsSources = ['js/*.js'];

gulp.task('sass', function() {
    gulp.src(sassSources)
    .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
    .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
    gulp.watch(sassSources, ['sass']);
    // gulp.watch(jsSources, ['lint']);
});

// gulp.task('lint', () => {
//     // ESLint ignores files with "node_modules" paths.
//     // So, it's best to have gulp ignore the directory as well.
//     // Also, Be sure to return the stream from the task;
//     // Otherwise, the task may end before the stream has finished.
//     return gulp.src(['**/*.js','!node_modules/**'])
//         // eslint() attaches the lint output to the "eslint" property
//         // of the file object so it can be used by other modules.
//         .pipe(eslint())
//         // eslint.format() outputs the lint results to the console.
//         // Alternatively use eslint.formatEach() (see Docs).
//         .pipe(eslint.format())
//         // To have the process exit with an error code (1) on
//         // lint error, return the stream and pipe to failAfterError last.
//         .pipe(eslint.failAfterError());
// });

gulp.task('default', ['sass', 'watch']);
