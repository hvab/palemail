'use strict';

const browserSync = require('browser-sync').create();
const cache = require('gulp-cached');
const debug = require('gulp-debug');
const del = require('del');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const inlineCss = require('gulp-inline-css');
const nunjucks = require('gulp-nunjucks');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const typograf = require('gulp-typograf');
const zip = require('gulp-zip');

// export PATH=./node_modules/.bin:$PATH
// export NODE_ENV=development
// NODE_ENV=production gulp
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
  return gulp.src('*.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(debug({title: 'sass:'}))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('')))
    .pipe(gulp.dest('dist'))
});

gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(nunjucks.compile())
    .pipe(debug({title: 'nunjucks:'}))
    .pipe(gulpIf(!isDevelopment, inlineCss({
      removeHtmlSelectors: true
    })))
    .pipe(gulpIf(!isDevelopment, typograf({
      lang: 'ru',
      mode: 'digit'
    })))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
  return gulp.src('images/**')
    .pipe(debug({title: 'images:'}))
    .pipe(cache('images'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('clean', function() {
  return del('dist/*');
});

gulp.task('zip', function() {
  return gulp.src('dist/**')
    .pipe(zip('dist.zip'))
    .pipe(debug({title: 'zip:'}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('build', gulp.series(
  'clean',
  'styles',
  gulp.parallel('images', 'html')
));

gulp.task('watch', function() {
  gulp.watch([
    '*.scss',
    'styles/*.scss'
  ], gulp.series('styles', 'html'));
  gulp.watch('images/**', gulp.series('images'));
  gulp.watch([
    '*.html',
    'templates/*.html'
  ], gulp.series('html'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'dist',
    port: isDevelopment ? 3000 : 8080,
    notify: false,
    open: false,
    ui: false,
    logPrefix: "palemail",
    tunnel: false,
  });

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
gulp.task('prod', gulp.series('build', 'serve'));

gulp.task('default', gulp.series(isDevelopment ? 'dev' : 'prod'));
