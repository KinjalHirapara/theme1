var gulp = require("gulp");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const connect = require('gulp-connect');
let uglify = require('gulp-uglify');
let vendors = [
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/popper.js/dist/umd/popper.min.js',
  'node_modules/@fancyapps/**/fancybox/dist/*',
  'node_modules/**/perfect-scrollbar/dist/*',
  'node_modules/**/perfect-scrollbar/css/*',
  'node_modules/**/font-awesome/**/*',
  'node_modules/animate.css/animate.min.css',
  'node_modules/aos/dist/*'


];


gulp.task('vendor', function(){
  return gulp.src(vendors)
  .pipe(gulp.dest('./dist/vendor'))
})
gulp.task('assets', function(){
  return gulp.src('src/assets/*')
  .pipe(gulp.dest('./dist/assets'))
})
gulp.task('scripts', function(){
  return gulp.src('src/scripts/*')
  .pipe(gulp.dest('./dist/scripts'))
})
gulp.task('sass', function() {
  return gulp.src('src/sass/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(postcss([ autoprefixer() ]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/css'))
});
gulp.task('minify-css', function() {
  return gulp.src(['dist/css/*.css', '!dist/css/*.min.css'])
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/css'))
});
gulp.task('css', gulp.series('sass','minify-css'));


gulp.task('html',function(){
  return gulp.src('src/**/*.html')
  .pipe(gulp.dest('./dist/'))
})

gulp.task('serve', function(){
  return connect.server({
    root: 'dist',
    livereload: true
  });
});


gulp.task('reload', function(){
  return gulp.src('./dist/**/*.*')
  .pipe(connect.reload());
});
gulp.task('watch', function(){
  gulp.watch(['src/**/*.html'], gulp.series('html', 'reload'));
  gulp.watch('src/**/*.scss',gulp.series('css', 'reload'));
  gulp.watch('src/**/*.js',gulp.series('scripts', 'reload'));
})

gulp.task('build', gulp.parallel('html','css', 'vendor','assets', 'scripts'));
gulp.task('host', gulp.parallel('serve', 'watch'));
gulp.task('default', gulp.series('build', 'host'))
