(function () {
    /**
     * Generates a string of n dash characters.
     *
     * @param {Number} n  an integer value.
     * @returns {string} The string of dash characters.
     */
    function bar(n) {
        var bar, i;

        bar = '';

        if (!n) {
            n = 79;
        }

        for(i = 0; i < n; i++, bar += '-');

        return bar;
    }

    module.exports = function initializing(self) {
        var chalk;

        chalk = require('chalk');

        self.log([
            '',
            ' ' + bar(78),
            '  Welcome to ' + chalk.yellow('generator-isomorph') + '!',
            '  Coded by ' + chalk.green('Temoto-kun') + '.',
            ' ' + bar(78),
            ''
        ].join('\n'));
    };
})();
