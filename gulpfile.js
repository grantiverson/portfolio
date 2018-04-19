let gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant');

let coffeeSources = ['build/js/hello.coffee'],
    scriptsSources = ['build/js/*.js'],
    stylesSources = ['build/css/*.sass'],
    htmlSources = ['build/*.html'],
    imagesSources = ['build/img/*'],
    outputDir = 'dist';

gulp.task('copy-html', function() {
  gulp.src(htmlSources)
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});

// gulp.task('--default', function() {
//   gulp.src(imagesSources)
//     .pipe(imagemin())
//     .pipe(gulp.dest(outputDir + '/img'))
// });

// gulp.task('compress-images', function() {
//   return gulp.src(imagesSources)
//     .pipe(imagemin({
//       progressive: true,
//       use: [pngquant()]
//     }))
//     .pipe(gulp.dest(outputDir + '/img'));
// });

gulp.task('copy-images', function() {
  gulp.src(imagesSources)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(outputDir + '/img'))
});

gulp.task('copy-work-dir', function() {
  gulp.src('build/work/**/*')
    .pipe(gulp.dest(outputDir + '/work'))
});

gulp.task('styles', function() {
  gulp.src(stylesSources)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
      .on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload())
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + '/js'))
});

gulp.task('scripts', function() {
  gulp.src(scriptsSources)
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(connect.reload())
});

gulp.task('scripts-dist', function() {
  gulp.src(scriptsSources)
    .pipe(babel())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(htmlSources, ['copy-html']);
  gulp.watch(stylesSources, ['styles']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(scriptsSources, ['scripts']);
  // gulp.watch(scriptsSources, ['lint']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('lint', function() {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js','!node_modules/**','!build/js/app.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('dist', [
  'copy-html',
  'copy-images',
  'styles',
  // 'lint',
  'scripts-dist',
  'copy-work-dir',
  // 'compress-images'
])

gulp.task('default', [
  'copy-html',
  'copy-images',
  'styles',
  'scripts',
  'coffee',
  'connect',
  'watch',
  'copy-work-dir'
]);
