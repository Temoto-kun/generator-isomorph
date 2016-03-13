(function () {
    var answers, path;

    path = require('path');

    module.exports = function (self) {
        answers = self.config.get('answers');

        self.fs.copy(
            path.join(self.sourceRoot(), 'express/src/views/*.' + (answers.indented ? 'jade' : 'ejs')),
            'src/views'
        );

        self.fs.copyTpl(
            path.join(self.sourceRoot(), 'express/bin/www'),
            self.destinationPath('bin/www'),
            { name: answers.name.toLowerCase().replace(/\s+/g, '-') }
        );

        self.fs.copy(
            path.join(self.sourceRoot(), 'express/app.js'),
            self.destinationPath('app.js')
        );
    };
})();
