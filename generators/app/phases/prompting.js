(function () {
    var chalk, done, prompts;

    chalk = require('chalk');

    module.exports = function prompting(self) {
        console.log(self.sourceRoot());

        done = self.async();

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

        prompts = prompts.concat(require('./../common/options'));

        self.prompt(prompts, function (answers) {
            var nodeModules;

            if (self.arguments.length > 0) {
                answers.name = self.arguments.shift();
            }

            nodeModules = require('./../common/npm-deps')(answers);

            self.config.set('answers', answers);
            self.config.set('nodeModules', nodeModules);

            done();
        });
    };
})();
