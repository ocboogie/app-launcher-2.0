var gulp = require('gulp'),
    inSequence = require('run-sequence'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

var tsProject = typescript.createProject('tsconfig.json');

const mainjs = "src/main.js";
const htmlFiles = "src/**/*.html";
const stylesheetFiles = "src/stylesheets/**/*.scss";
const tsFiles = ["src/app/**/*.tsx", "src/app/**/*.ts"];

gulp.task('default', function(done) {
    inSequence(
        [
            'ts',
            'mainjs'
        ],
        'html',
        'sass'
    );
});

gulp.task('watch', function() {
    gulp.start('mainjs:watch');
    gulp.start('html:watch');
    gulp.start('ts:watch');
    gulp.start('sass:watch');
});

gulp.task('mainjs', function() {
    return gulp.src(mainjs)
        .pipe(gulp.dest('dist'));
});

gulp.task('ts', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
    return gulp.src(htmlFiles)
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
    return gulp.src(stylesheetFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('mainjs:watch', function() {
    gulp.watch(mainjs, ['mainjs']);
});

gulp.task('html:watch', function() {
    gulp.watch(htmlFiles, ['html']);
});

gulp.task('ts:watch', function() {
    gulp.watch(tsFiles, ['ts']);
});

gulp.task('sass:watch', function() {
    gulp.watch(stylesheetFiles, ['sass']);
});
