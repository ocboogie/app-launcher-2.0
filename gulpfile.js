var gulp = require('gulp'),
    inSequence = require('run-sequence'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

const tsRendererProject = typescript.createProject('tsconfig.web.json');
const tsMainProject = typescript.createProject('tsconfig.electron.json');

const htmlFiles = "src/**/*.html";
const stylesheetFiles = "src/stylesheets/**/*.scss";
const mainFiles = ["src/main/**/*.ts"];
const rendererFiles = ["src/renderer/**/*.tsx", "src/renderer/**/*.ts"];

gulp.task('default', function(done) {
    inSequence(
        'mainjs',
        'ts',
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
    let tsResult = tsMainProject.src()
        .pipe(tsMainProject());
    return tsResult.js
        .pipe(gulp.dest('dist/main'));
    // return gulp.src(mainjs)
    //     .pipe(gulp.dest('dist'));
});

gulp.task('ts', function() {
    let tsResult = tsRendererProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsRendererProject());
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
    gulp.watch(mainFiles, ['mainjs']);
});

gulp.task('html:watch', function() {
    gulp.watch(htmlFiles, ['html']);
});

gulp.task('ts:watch', function() {
    gulp.watch(rendererFiles, ['ts']);
});

gulp.task('sass:watch', function() {
    gulp.watch(stylesheetFiles, ['sass']);
});
