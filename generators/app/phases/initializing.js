(function () {
    var logging;

    logging = require('./../../../common/logging');

    module.exports = function initializing(self) {
        self.log([
            '',
            ' ' + logging.bar(78),
            '  ' + logging.chalk.blue('isomorph') + logging.chalk.yellow(':app'),
            '  Main Generator',
            '',
            '  Coded by ' + logging.chalk.underline('Temoto-kun') + '.',
            ' ' + logging.bar(78),
            ''
        ].join('\n'));
    };
})();
