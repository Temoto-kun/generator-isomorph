(function () {
    var answers, path;

    path = require('path');

    module.exports = function (self) {
        answers = self.config.get('answers');

        self.fs.copyTpl(
            path.resolve(__dirname, '../../templates/readme.ejs'),
            self.destinationPath('README'),
            {
                name: answers.name,
                description: answers.description,
                author: {
                    name: answers.author,
                    email: answers.email
                }
            }
        );
    };
})();
