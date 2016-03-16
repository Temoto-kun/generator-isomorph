(function () {
    var path;

    path = require('path');

    module.exports = function (self, answers) {
        if (!answers['code-review']) {
            return {};
        }
        switch (answers['code-review'].id) {
            case 'jscs':
                return require(path.join(self.sourceRoot(), 'code-review/jscs.template.json'));
            case 'jslint':
                return require(path.join(self.sourceRoot(), 'code-review/jslint.template.json'));
            case 'eslint':
                if (answers.js.id === 'react') {
                    return require(path.join(self.sourceRoot(), 'code-review/eslint/react/eslint.template.json'));
                }
                return require(path.join(self.sourceRoot(), 'code-review/eslint/eslint.template.json'));
            case 'jshint':
                return require(path.join(self.sourceRoot(), 'code-review/jshint.template.json'));
        }
        return {};
    };
})();
