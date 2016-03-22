(function () {
    var logging;

    logging = require('./../../../common/logging');

    module.exports = function initializing(self) {
        var chalk;

        chalk = require('chalk');

        self.log([
            '',
            ' ' + logging.bar(78),
            '  ' + logging.chalk.blue('isomorph') + logging.chalk.magenta(':model'),
            '  Model Subgenerator',
            '',
            '  Coded by ' + logging.chalk.underline('Temoto-kun') + '.',
            ' ' + logging.bar(78),
            ''
        ].join('\n'));
    };
})();
