(function () {
    var logging;
    logging = require('./../logging');
    module.exports = function (self) {
        return function (details) {
            self.log([
                '',
                ' ' + logging.bar(78),
                '  ' + logging.chalk.blue('isomorph') + logging.chalk[details.color](':' + details.name),
                '  ' + details.desc,
                '',
                '  Coded by ' + logging.chalk.underline(details.author) + '.',
                ' ' + logging.bar(78),
                ''
            ].join('\n'));
        };
    };
})();
