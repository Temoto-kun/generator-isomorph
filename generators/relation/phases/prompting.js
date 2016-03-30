(function () {
    module.exports = function (self, scope) {
        var chalk, models;

        models = self.config.get('models');

        chalk = scope.global.logging.chalk;

        self.prompt([
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
        ], function (answers) {
            self.prompt({
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
            });
        });
    };
})();
