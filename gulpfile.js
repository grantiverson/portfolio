var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var coffeeSources = ['build/js/hello.coffee'],
    jsSources = ['build/js/*.js'],
    sassSources = ['build/css/*.sass'],
    htmlSources = ['build/*.html'],
    imgSources = ['build/img/*'],
    outputDir = 'dist';

gulp.task('copy-html', function() {
  gulp.src(htmlSources)
    .pipe(gulp.dest(outputDir))
});

gulp.task('copy-img', function() {
  gulp.src(imgSources)
    .pipe(gulp.dest(outputDir + '/img'))
});

gulp.task('copy-work-dir', function() {
  gulp.src('work/**/*')
    .pipe(gulp.dest(outputDir + '/work'))
});

gulp.task('sass', function() {
  gulp.src(sassSources)
    .pipe(sass({outputStyle: 'compressed'}))
      .on('error', gutil.log)
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload())
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + '/js'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  // gulp.watch(jsSources, ['lint']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(connect.reload())
});

// gulp.task('lint', () => {
//   // ESLint ignores files with "node_modules" paths.
//   // So, it's best to have gulp ignore the directory as well.
//   // Also, Be sure to return the stream from the task;
//   // Otherwise, the task may end before the stream has finished.
//   return gulp.src(['**/*.js','!node_modules/**'])
//     // eslint() attaches the lint output to the "eslint" property
//     // of the file object so it can be used by other modules.
//     .pipe(eslint())
//     // eslint.format() outputs the lint results to the console.
//     // Alternatively use eslint.formatEach() (see Docs).
//     .pipe(eslint.format())
//     // To have the process exit with an error code (1) on
//     // lint error, return the stream and pipe to failAfterError last.
//     .pipe(eslint.failAfterError());
// });

gulp.task('default', ['html', 'coffee', 'js', 'sass', 'connect', 'watch', 'copy-html', 'copy-img', 'copy-work-dir']);
