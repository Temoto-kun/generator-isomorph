(function () {

    /**
     * Gets the prompts for the prompting phase.
     *
     * @param {Object} self The generator context.
     * @returns {Array.<Object>} The prompts.
     */
    function getPrompts(self) {
        var chalk, prompts;

        chalk = require('chalk');

        prompts = [];

        if (self.arguments.length < 1) {
            prompts.push({
                name: 'name',
                message: 'Type in your project name. ' + chalk.red('(Required)'),
                type: 'input',
                required: true,
                'default': self.appname,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your project name.');
                }
            });
        }

        if (self.arguments.length < 2 || true) { // TODO parse description
            prompts.push({
                name: 'description',
                message: 'Describe what your project does. ' + chalk.red('(Required)'),
                type: 'input',
                optional: true,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your project description.');
                }
            });
        }

        prompts = prompts.concat([
            {
                name: 'author',
                message: 'Type in your name. ' + chalk.red('(Required)'),
                type: 'input',
                required: true,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your name.');
                }
            },
            {
                name: 'email',
                message: 'Type in your email. ' + chalk.red('(Required)'),
                type: 'input',
                required: true,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your email.');
                }
            }
        ]);

        return prompts.concat(require('./../common/options'));
    }

    module.exports = function prompting(self) {
        var done;

        done = self.async();

        self.prompt(getPrompts(self), function (answers) {
            if (self.arguments.length > 0) {
                answers.name = self.arguments.shift();
            }

            self.config.set('answers', answers);

            done();
        });
    };
})();
