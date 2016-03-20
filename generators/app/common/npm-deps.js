(function () {
    var answers, defaultNpm, modules;

    defaultNpm = require('./../common/default-npm');

    modules = {
        dependencies: [],
        devDependencies: []
    };

    /**
     * Determine the default dependencies.
     *
     * @returns {undefined}
     */
    function determineDefaultDeps() {
        modules.dependencies = modules.dependencies.concat(defaultNpm.save);
        modules.devDependencies = modules.devDependencies.concat(defaultNpm.saveDev);
    }

    /**
     * Determine the preprocessor dependencies.
     *
     * @returns {undefined}
     */
    function determinePreprocessorDeps() {
        modules.dependencies.push(answers.indented ? 'jade' : 'ejs');

        if (answers.indented) {
            modules.dependencies.push(answers.js.id === 'react' ? 'cjsx' : 'coffee-script');
        }
    }

    /**
     * Determine the feature dependencies.
     *
     * @param answerKey {Object} The answer key from the prompts.
     * @returns {undefined}
     */
    function determineFeatureDeps(answerKey) {
        if (!answers[answerKey] || typeof answers[answerKey] !== 'object') {
            return;
        }

        if (answers[answerKey] instanceof Array) {
            modules.dependencies = modules.dependencies.concat(answers[answerKey].map(function (answer) {
                return answer.npm.save;
            }));

            modules.devDependencies = modules.devDependencies.concat(answers[answerKey].map(function (answer) {
                return answer.npm.saveDev;
            }));
            return;
        }

        if (!!answers[answerKey].npm.save &&
            !(answers[answerKey].npm.save instanceof Array)) {
            answers[answerKey].npm.save = [answers[answerKey].npm.save];
        }

        if (!!answers[answerKey].npm.saveDev &&
            !(answers[answerKey].npm.saveDev instanceof Array)) {
            answers[answerKey].npm.saveDev = [answers[answerKey].npm.saveDev];
        }

        modules.dependencies = modules.dependencies
            .concat(answers[answerKey].npm.save || []);

        modules.devDependencies = modules.devDependencies
            .concat(answers[answerKey].npm.saveDev || []);
    }

    /**
     * Compact the dependency arrays.
     *
     * @returns {undefined}
     */
    function compactDeps() {
        modules.dependencies = modules.dependencies
            .filter(function (item) {
                return !!item;
            });

        modules.devDependencies = modules.devDependencies
            .filter(function (item) {
                return !!item;
            });
    }

    module.exports = function determineNodeModules(theAnswers) {
        answers = theAnswers;
        determineDefaultDeps();
        determinePreprocessorDeps();
        Object.keys(answers).forEach(function (answerKey) {
            determineFeatureDeps(answerKey);
        });
        compactDeps();
        return modules;
    };
})();

// TODO create middleware for node-sass
