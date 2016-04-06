(function () {
    var done;

    module.exports = function (self, scope) {
        var chalk, models, prompts;
        models = self.config.get('models');
        chalk = scope.global.Logging.Chalk;
        done = self.async();
        prompts = scope.local.prompts['default']
            .concat([
                {
                    name: 'strong',
                    message: 'Select the ' + chalk.cyan('referencing') + ' model.',
                    type: 'list',
                    required: true,
                    choices: models.map(function (model) {
                        return {
                            name: model.name,
                            value: model
                        }
                    })
                }
            ]);
        self.prompt(prompts, function (answers) {
            var nextPrompts;
            nextPrompts = [
                {
                    name: 'weak',
                    message: 'Select the model being ' + chalk.cyan('referenced') + '.',
                    type: 'list',
                    required: true,
                    choices: models
                        .filter(function (model) {
                            return answers.strong.name !== model.name;
                        })
                        .map(function (model) {
                            return {
                                name: model.name,
                                value: model
                            }
                        })
                }
            ];
            self.prompt(nextPrompts, function (answers2) {
                done();
            });
        });
    };
})();
