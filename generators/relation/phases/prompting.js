(function () {
    var logging;

    logging = require('./../../../common/logging');

    module.exports = function (self) {
        var models;

        models = self.config.get('models');

        self.prompt([
            {
                name: 'strong',
                message: 'Select the ' + logging.chalk.cyan('referencing') + ' model.',
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
                message: 'Select the model being ' + logging.chalk.cyan('referenced') + '.',
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
