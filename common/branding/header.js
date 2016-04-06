(function () {
    var Logging;
    Logging = require('./../Logging');
    module.exports = function (self) {
        return function (details) {
            self.log([
                '',
                ' ' + Logging.Bar(78),
                '  ' + Logging.Chalk.white('isomorph') + Logging.Chalk[details.color](':' + details.name),
                '  ' + details.desc,
                '',
                '  Coded by ' + Logging.Chalk.white(details.author) + '.',
                ' ' + Logging.Bar(78),
                ''
            ].join('\n'));
        };
    };
})();
