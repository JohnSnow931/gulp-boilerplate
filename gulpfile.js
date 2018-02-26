var gulp = require('gulp'),
del = require('del'),
// runSequence = require('run-sequence'),
sass = require('gulp-sass'),
// minifycss = require('gulp-minify-css'),
// cleanCSS = require('gulp-clean-css'),
// concat = require('gulp-concat'),
// uglify = require('gulp-uglify'),
// sourcemaps = require('gulp-sourcemaps'),
// rename = require('gulp-rename'),
browserSync = require('browser-sync'),
prefix = require('gulp-autoprefixer'),
plumber = require('gulp-plumber');

// 清除编译后的css文件
gulp.task('clean', function () {
    return del(['src/styles/dist/*.css']);
});

// 编译scss文件
gulp.task('scss', function () {
    return gulp.src('src/styles/scss/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2'))
    //   .pipe(minifycss())
    //   .pipe(concat('main.min.css'))
      .pipe(gulp.dest('src/styles/dist'))
      .pipe(browserSync.stream());
  });

// 监听任务
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./src/pages/"
        }
    });
    gulp.watch('src/styles/scss/*.scss', ["scss"]);
    gulp.watch('src/styles/dist').on("change", function () {
        browserSync.reload();
    });
    gulp.watch('src/pages/*.html').on("change", function () {
        browserSync.reload();
    });
});

gulp.task('default', ['clean'],function() {
    gulp.start('watch');
});