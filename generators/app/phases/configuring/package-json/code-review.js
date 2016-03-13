(function () {
    var path;

    path = require('path');

    module.exports = function (self, answers) {
        if (!answers['code-review']) {
            return {};
        }
        switch (answers['code-review'].id) {
            case 'jscs':
                return require(path.join(self.sourceRoot(), 'jscsconfig.json'));
            case 'jslint':
                return require(path.join(self.sourceRoot(), 'jslintconfig.json'));
            case 'eslint':
                if (answers.js.id === 'react') {
                    return require(path.join(self.sourceRoot(), 'eslintconfig.react.json'));
                }
                return require(path.join(self.sourceRoot(), 'eslintconfig.json'));
            case 'jshint':
                return require(path.join(self.sourceRoot(), 'jshintconfig.json'));
        }
        return {};
    };
})();
