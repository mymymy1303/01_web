var gulp = require('gulp');

//Requires the gulp-sass plugin
var sass = require('gulp-sass');

//Requires the browser sync plugin
var browserSync = require('browser-sync').create();

//Requires the gulp-pug plugin
var pug = require('gulp-pug');

//Requires the gulp-babel plugin
var babel = require('gulp-babel');

//Requires the gulp-concat plugin
var concat = require('gulp-concat');

//Requires the gulp-sourcemaps plugin
var sourcemaps = require('gulp-sourcemaps')

//Concatinate CSS files into one file: /dist/css/thuvien.css
gulp.task('concat-css', function() {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(concat('thuvien.css'))
    .pipe(gulp.dest('./dist/css'));
});

//Concatinate JS files into one file: /dist/js/thuvien.js
gulp.task('concat-js', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.slim.min.js',
        'bower_components/popper.js/dist/umd/popper.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('thuvien.js'))
    .pipe(gulp.dest('./dist/js'));
});


//Converts all SASS files in src/styles to CSS file in dist/css
gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

//Converts all JS files in src/scripts to JS file in dist/js
gulp.task('babel', function() {
    return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/js'));
});

//Converts all PUG files in src/templates to HTML file in /dist
gulp.task('pug', function() {
    return gulp.src([
        'src/templates/*.pug',
    '!./src/templates/{**/\_*,**/\_*/**}.pug'
    ])
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist'));
});

//Watch all files in /src for change
gulp.task('watch', ['browserSync', 'sass'],function() {
    gulp.watch('src/styles/*.sass',['sass']);
    gulp.watch('src/scripts/*.js', ['babel']);
    gulp.watch('src/templates/*.pug', ['pug']);
    gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

//Static server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('default', function() {
    gulp.start([
        'concat-css',
        'concat-js',
        'sass',
        'pug',
        'babel',
        'watch',
        'browserSync'
    ]);
});