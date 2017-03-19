const gulp = require('gulp'),
    inSequence = require('run-sequence'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    fs = require('fs');

const tsRendererProject = typescript.createProject('./src/renderer/tsconfig.json');
const tsMainProject = typescript.createProject('./src/main/tsconfig.json');

const htmlFiles = "src/**/*.html";
const stylesheetFiles = "src/stylesheets/**/*.scss";
const mainFiles = ["src/main/**/*.ts"];
const rendererFiles = ["src/renderer/**/*.tsx", "src/renderer/**/*.ts"];

gulp.task('default', function(done) {
    inSequence(
        'mainTS',
        'webTS',
        'html',
        'sass'
    );
});

gulp.task('watch', function() {
    gulp.start('mainTS:watch');
    gulp.start('html:watch');
    gulp.start('webTS:watch');
    gulp.start('sass:watch');
});

gulp.task('mainTS', function() {
    let tsResult = tsMainProject.src()
        .pipe(tsMainProject());
    return tsResult.js
        .pipe(gulp.dest('dist/main'));
});

gulp.task('webTS', function() {
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

gulp.task('set-dev', function() {
    fs.writeFileSync('assets/env', "development", 'utf8');
});

gulp.task('set-prod', function() {
    fs.writeFileSync('assets/env', "production", 'utf8');
});

gulp.task('mainTS:watch', function() {
    gulp.watch(mainFiles, ['mainTS']);
});

gulp.task('html:watch', function() {
    gulp.watch(htmlFiles, ['html']);
});

gulp.task('webTS:watch', function() {
    gulp.watch(rendererFiles, ['webTS']);
});

gulp.task('sass:watch', function() {
    gulp.watch(stylesheetFiles, ['sass']);
});
