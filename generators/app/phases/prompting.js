(function () {

    /**
     * Gets the prompts for the prompting phase.
     *
     * @param {Object} self The generator context.
     * @param {Object} scope The scope object.
     * @returns {Array.<Object>} The prompts.
     */
    function getPrompts(self, scope) {
        var prompts;

        prompts = [];

        if (self.arguments.length < 1) {
            prompts.push({
                name: 'name',
                message: 'Type in your project name.',
                type: 'input',
                required: true,
                'default': self.appname
            });
        }

        if (self.arguments.length < 2 || true) { // TODO parse description
            prompts.push({
                name: 'description',
                message: 'Describe what your project does.',
                type: 'input',
                required: true
            });
        }

        return prompts
            .concat([
                {
                    name: 'author',
                    message: 'Type in your name.',
                    type: 'input',
                    required: true
                },
                {
                    name: 'email',
                    message: 'Type in your email.',
                    type: 'input',
                    required: true
                }
            ])
            .concat(require('./../common/options'))
            .map(function (prompt) {
                var validateFn;
                validateFn = prompt.validate || function () {
                    return true;
                };
                if (prompt.required && prompt.type === 'input') {
                    prompt.message += ' ' + scope.global.chalk.red('(Required)');
                    prompt.validate = function (input) {
                        return (input.trim().length <= 0 ?
                            'This field is required.' : validateFn(input)
                        );
                    }
                }
            });
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
