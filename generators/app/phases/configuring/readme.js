(function () {
    var answers;

    module.exports = function (self) {
        answers = self.config.get('answers');

        self.fs.copyTpl(
            __dirname + '/../../templates/readme.ejs',
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
