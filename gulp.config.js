module.exports = function () {
    var srcPath = './src/';
    var config = {
        srcPath,
        handlebarsPartialPath: './src/partials',
        outputPath: './build',
        htmlGlob: srcPath + '/**/*.html',
        cssGlob: srcPath + '/**/*.css',
        imgGlob: [srcPath + '/**/*.png', srcPath + '/**/*.jpg', srcPath + '/**/*.gif']
    };

    return config;
};