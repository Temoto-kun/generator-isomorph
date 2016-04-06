(function () {
    var Logging;
    Logging = require('./../Logging');
    module.exports = function (self) {
        return function (details) {
            self.log([
                '',
                ' ' + Logging.Bar(78),
                '  Finished execution! Goodbye!',
                '',
                '  ' + Logging.Chalk.white('isomorph') + Logging.Chalk[details.color](':' + details.name),
                ' ' + Logging.Bar(78)
            ].join('\n'));
        };
    };
})();
