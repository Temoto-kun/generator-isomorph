(function () {
    var logging;
    logging = require('./../logging');
    module.exports = function (self) {
        return function (details) {
            self.log([
                '',
                ' ' + logging.bar(78),
                '  ' + logging.chalk.white('isomorph') + logging.chalk[details.color](':' + details.name),
                '  ' + details.desc,
                '',
                '  Coded by ' + logging.chalk.white(details.author) + '.',
                ' ' + logging.bar(78),
                ''
            ].join('\n'));
        };
    };
})();
