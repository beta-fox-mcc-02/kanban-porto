const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')

gulp.task('sass', () => {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('./src/assets/styles'))
})

gulp.task('watch', () => {
  gulp.watch('./scss/*.scss', gulp.series('sass'))
})

gulp.task('default', gulp.series('watch'))