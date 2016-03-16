(function () {
    var chalk, done, prompts;

    chalk = require('chalk');

    module.exports = function prompting(self) {
        done = self.async();

        prompts = [];

        if (self.arguments.length < 1) {
            prompts.push({
                name: 'name',
                message: 'Type in your model name. ' + chalk.red('(Required)'),
                type: 'input',
                required: true,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your model name.');
                }
            });
        }

        prompts = prompts.concat(require('./../common/options'));

        self.prompt(prompts, function (answers) {
            if (self.arguments.length > 0) {
                answers.name = self.arguments.shift();
            }

            self.config.set('last-model', answers);

            done();
        });
    };
})();
