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
            .concat(scope.local.prompts['profile'])
            .concat(scope.local.prompts['default'])
            .map(scope.global.Validation.Required);
    }

    module.exports = function prompting(self, scope) {
        var done;

        done = self.async();

        self.prompt(getPrompts(self, scope), function (answers) {
            if (self.arguments.length > 0) {
                answers.name = self.arguments.shift();
            }

            self.config.set('answers', answers);

            done();
        });
    };
})();
