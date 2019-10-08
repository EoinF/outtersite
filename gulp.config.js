module.exports = function () {
    var srcPath = './src/';
    var config = {
        srcPath,
        handlebarsPartialPath: './src/partials',
        outputPath: './build',
        htmlInputsGlob: [srcPath + '**/*.html', srcPath + '**/*.handlebars'],
        htmlGlob: srcPath + '**/*.html',
        cssGlob: srcPath + '**/*.css',
        imgGlob: [srcPath + '**/*.png', srcPath + '**/*.jpg', srcPath + '**/*.gif', srcPath + '**/*.ico']
    };

    return config;
};