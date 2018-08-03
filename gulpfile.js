var gulp = require('gulp');

//Requires the gulp-sass plugin
var sass = require('gulp-sass');

//Requires the browser sync plugin
var browserSync = require('browser-sync').create();

//Requires the gulp-pug plugin
var pug = require('gulp-pug');

//Requires the gulp-babel plugin
var babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('src/styles/*.sass')
    .pipe(sass()) //Converts SASS to CSS with gulp-sass
    .pipe(gulp.dest('dist/css'));
});

gulp.task('pug', function() {
    return gulp.src('src/templates/*.pug')
    .pipe(pug({
        pretty: true
    })) //Converts PUG to HTML with gulp-pug
    .pipe(gulp.dest('dist'));
});

gulp.task('babel', function() {
    return gulp.src('src/scripts/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['browserSync', 'sass'],function() {
    gulp.watch('src/styles/*.sass',['sass']);
    gulp.watch('src/scripts/*.js', ['babel']);
    gulp.watch('src/templates/*.pug', ['pug']);
    gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('default', function() {
    gulp.start([
        'sass',
        'pug',
        'babel',
        'watch',
        'browserSync'
    ]);
});