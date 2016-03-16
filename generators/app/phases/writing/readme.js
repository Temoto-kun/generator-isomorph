(function () {
    var answers, path;

    path = require('path');

    module.exports = function (self) {
        answers = self.config.get('answers');

        self.fs.write(
            self.destinationPath('README.txt'),
            [
                '-------------------------------------------------------------------------------',
                answers.name,
                answers.description,
                '-------------------------------------------------------------------------------',
                '',
                'Contributors',
                '------------',
                '',
                answers.author + ' <' + answers.email + '>'
            ].join('\n')
        );
    };
})();
