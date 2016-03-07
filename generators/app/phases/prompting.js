(function () {
    var done, prompts, chalk;

    chalk = require('chalk');

    module.exports = function (self) {
        done = self.async();

        prompts = [
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
            },
            {
                name: 'name',
                message: 'Type in your project name. ' + chalk.red('(Required)'),
                type: 'input',
                required: true,
                default: self.appname,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your project name.');
                }
            },
            {
                name: 'description',
                message: 'Describe what your project does. ' + chalk.red('(Required)'),
                type: 'input',
                optional: true,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your project description.');
                }
            }
        ];

        prompts = prompts.concat(require('./../common/options'));

        self.prompt(prompts, function (answers) {
            var nodeModules;

            nodeModules = require('./../common/npm-deps')(answers);

            self.config.set('answers', answers);
            self.config.set('nodeModules', nodeModules);

            done();
        });
    };
})();
