(function () {
    module.exports = function (answers) {
        if (!answers['code-review']) {
            return {};
        }
        switch (answers['code-review'].id) {
            case 'jscs': return require('./../../../templates/jscsconfig.json');
            case 'jslint': return require('./../../../templates/jslintconfig.json');
            case 'eslint':
                if (answers.js.id === 'react') {
                    return require('./../../../templates/eslintconfig.react.json');
                }
                return require('./../../../templates/eslintconfig.json');
            case 'jshint': return require('./../../../templates/jshintconfig.json');
        }
        return {};
    };
})();
