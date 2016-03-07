(function () {
    var modules, defaultNpm;

    defaultNpm = require('./../common/default-npm');

    modules = {
        dependencies: [],
        devDependencies: []
    };

    function determineDefaultDeps() {
        modules.dependencies = modules.dependencies.concat(defaultNpm.save);
        modules.devDependencies = modules.devDependencies.concat(defaultNpm.saveDev);
    }

    function determinePreprocessorDeps(answers) {
        modules.dependencies.push(answers.indented ? 'jade' : 'ejs');

        if (answers.indented) {
            modules.dependencies.push(answers.js.id === 'react' ? 'cjsx' : 'coffee-script');
        }
    }

    function determineFeatureDeps(answers, answerKey) {
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

        modules.dependencies = modules.dependencies.concat(answers[answerKey].npm.save || []);
        modules.devDependencies = modules.devDependencies.concat(answers[answerKey].npm.saveDev || []);
    }

    module.exports = function (answers) {
        determineDefaultDeps();
        determinePreprocessorDeps(answers);
        Object.keys(answers).forEach(function (answerKey) {
            determineFeatureDeps(answers, answerKey);
        });
        return modules;
    };
})();
