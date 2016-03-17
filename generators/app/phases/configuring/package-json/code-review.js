(function () {
    var path;

    path = require('path');

    /**
     * Gets the path for the configuration template of the code reviewer.
     *
     * @param {Object} answers The answers hash.
     * @returns {string} The template path.
     */
    function getTemplatePath(answers) {
        var paths;

        paths = {
            jscs: 'code-review/jscs.template.json',
            jslint: 'code-review/jslint.template.json',
            jshint: 'code-review/jshint.template.json'
        };

        if (answers['code-review'].id === 'eslint') {
            // A particular ESLint configuration for React has been provided.
            return (
                answers.js.id === 'react' ?
                    'code-review/eslint/react/eslint.template.json' :
                    'code-review/eslint/eslint.template.json'
            );
        }

        return paths[answers['code-review'].id];
    }

    module.exports = function (self, answers) {
        var templatePath;

        templatePath = getTemplatePath(answers);

        // If there is no code review selected, or invalid code review ID
        // has been selected.
        if (!answers['code-review'] || !templatePath) {
            return {};
        }

        return require(path.join(self.sourceRoot(), templatePath));
    };
})();
