var gulp = require('gulp');
var build = require('gulp-build');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gulpIgnore = require('gulp-ignore');
var jshint = require('gulp-jshint');

gulp.task('build', function() {
  gulp.src('views/js/built/*.js')
      .pipe(build({ GA_ID: '0.0.1' }))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest('dest'))
});

gulp.task('task', function() {
  gulp.src('views/js/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', function(){
  return gulp.src('views/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('lib', function(){
  return gulp.src('views/js/lib/*.js')
    .pipe(gulp.dest('build/js'))
});

gulp.task('css', function(){
  return gulp.src('views/css/*.css')
    .pipe(gulp.dest('build/css'))
});

gulp.task('images', function(){
  return gulp.src('views/images/*')
    .pipe(gulp.dest('build/images'))
});

gulp.task('fonts', function(){
  return gulp.src('views/fonts/*')
    .pipe(gulp.dest('build/fonts'))
});
gulp.start('build');
gulp.start('task');
gulp.start('html');
gulp.start('lib');
gulp.start('images');
gulp.start('fonts');