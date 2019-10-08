var gulp = require('gulp');
var handlebars = require('handlebars');
var config = require('./gulp.config')();
var gulpHandlebars = require('gulp-handlebars-html')(handlebars);
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var del = require('del');

var browserSyncInstance;

function errorHandler(err) {
    console.error(
        "Gulp error in " + err.plugin,
        err.toString()
    );
}

function clean() {
    return del('build');
}

function copyCss() {
    var commands = gulp.src(config.cssGlob)
        .pipe(plumber({errorHandler}))
        .pipe(gulp.dest(config.outputPath));
        
    if (browserSyncInstance) {
        commands.pipe(browserSyncInstance.stream());
    }   
    return commands;
}

function copyImages() {
    var commands = gulp.src(config.imgGlob)
        .pipe(plumber({errorHandler}))
        .pipe(gulp.dest(config.outputPath));
    
    if (browserSyncInstance) {
        commands.pipe(browserSyncInstance.stream());
    }
    return commands;
}

function compileHtml() {
    var templateData = {},
    options = {
        partialsDirectory: [config.handlebarsPartialPath]
    };

    var commands = gulp.src(config.htmlGlob)
        .pipe(plumber({errorHandler}))
        .pipe(gulpHandlebars(templateData, options))
        .pipe(gulp.dest(config.outputPath));

    if (browserSyncInstance) {
        commands.pipe(browserSyncInstance.stream());
    }
    return commands;
}

function start(done) {
    browserSyncInstance = browserSync.create();
    browserSyncInstance.init({
        server: config.outputPath
    });
    gulp.watch(config.htmlInputsGlob, compileHtml);
    gulp.watch(config.cssGlob, copyCss);
    gulp.watch(config.imgGlob, copyImages);
    done();
};


var build = gulp.series(clean, gulp.parallel(compileHtml, copyCss, copyImages));

exports.start = gulp.series(build, start);
exports.build = build;
