(function () {
    module.exports = function install(self, scope) {
        var answers, nodeModules;

        answers = self.config.get('answers');

        nodeModules = require('./../common/npm-deps')(answers);

        self.npmInstall(nodeModules.dependencies, { save: true });
        self.npmInstall(nodeModules.devDependencies, { saveDev: true });
    };
})();
