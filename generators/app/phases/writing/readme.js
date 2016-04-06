(function () {
    var answers, path;

    path = require('path');

    module.exports = function (self, scope) {
        answers = self.config.get('answers');

        self.fs.write(
            self.destinationPath('README.txt'),
            [
                scope.global.Logging.Bar(79),
                answers.name,
                answers.description,
                scope.global.Logging.Bar(79),
                '',
                'Contributors',
                '------------',
                '',
                answers.author + ' <' + answers.email + '>'
            ].join('\n')
        );
    };
})();
