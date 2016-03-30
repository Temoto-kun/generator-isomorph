(function () {
    var logging;
    logging = require('./../logging');
    module.exports = function (self) {
        return function (details) {
            self.log([
                '',
                ' ' + logging.bar(78),
                '  Finished execution! Goodbye!',
                '',
                '  ' + logging.chalk.white('isomorph') + logging.chalk[details.color](':' + details.name),
                ' ' + logging.bar(78)
            ].join('\n'));
        };
    };
})();
