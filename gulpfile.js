var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  clean = require('gulp-clean');

var jsFiles = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/popper.js/dist/umd/popper.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.min.js',
];

var scssFiles = ['./node_modules/bootstrap/scss/**/*.scss'];

function buildCss() {
  return gulp
    .src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/'));
}

function watcher() {
  gulp.watch(['scss/*.scss'], gulp.series(buildCss));
}

function cleanJs() {
  return gulp.src('js/*.*', { read: false }).pipe(clean());
}

function updateJs() {
  return gulp.src(jsFiles).pipe(gulp.dest('js'));
}

function cleanBootstrap() {
  return gulp.src('scss/bootstrap/**/*.*', { read: false }).pipe(clean());
}

function updateBootstrap() {
  return gulp.src(scssFiles).pipe(gulp.dest('scss/bootstrap'));
}

gulp.task(
  'build',
  gulp.series(cleanJs, updateJs, cleanBootstrap, updateBootstrap)
);
gulp.task('default', gulp.series(watcher));
