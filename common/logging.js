(function () {
    var chalk;

    chalk = require('chalk');

    module.exports = {
        /**
         * Generates a string of n dash characters.
         *
         * @param {Number} n  an integer value.
         * @returns {string} The string of dash characters.
         */
        bar: function bar(n) {
            var bar, i;

            bar = '';

            if (!n) {
                n = 79;
            }

            for (i = 0; i < n; i++) {
                bar += '-';
            }

            return bar;
        },
        chalk: chalk
    };
})();
