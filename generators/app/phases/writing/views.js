(function () {
    var answers;

    module.exports = function (self) {
        answers = self.config.get('answers');

        self.fs.copy(
            __dirname + '/../../templates/express/src/views/' + (answers.indented ? 'jade' : 'ejs') + '/*.*',
            'src/views'
        );

        self.fs.copyTpl(
            __dirname  + '/../../templates/express/bin/www', self.destinationPath('bin/www'),
            { name: answers.name.toLowerCase().replace(/\s+/g, '-') }
        );

        self.fs.copy(__dirname + '/../../templates/express/app.js', self.destinationPath('app.js'));
    };
})();
