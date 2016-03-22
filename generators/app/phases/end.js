(function () {
    var logging;

    logging = require('./../../../common/logging');

    function bar(n) {
        var bar, i;

        bar = '';

        if (!n) {
            n = 79;
        }

        for (i = 0; i < n; i++) {
            bar += '-';
        }

        return bar;
    }

    module.exports = function end(self) {
        self.log([
            '',
            ' ' + logging.bar(78),
            '  All done! Goodbye!',
            ' ' + logging.bar(78),
            ''
        ].join('\n'));
    };
})();
