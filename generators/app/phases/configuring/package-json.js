(function () {
    var answers, packageJson, requireDir, slug;

    requireDir = require('require-dir');
    slug = require('slug');

    /**
     * Initializes the contents of the package.json file.
     *
     * @param {Object} self The generator context.
     * @returns {undefined}
     */
    function initializePackageJson(self) {
        packageJson = self.fs.readJSON(self.destinationPath('package.json'), {});

        packageJson.title = packageJson.name || answers.name;
        packageJson.name = packageJson.name || slug(answers.name.replace(/\s+/g, ' '));
        packageJson.version = packageJson.version || '0.0.0';
        packageJson.description = packageJson.description || answers.description;
        packageJson.authors = packageJson.authors || [
            answers.author + ' <' + answers.email + '>'
        ];
        packageJson['private'] = true;
    }

    /**
     * Run the subtasks.
     *
     * @param {Object} self The generator context.
     * @param {Object} subtasks The subtasks to run.
     * @returns {undefined}
     */
    function runSubtasks(self, subtasks) {
        var packageJsonPart;

        Object.keys(subtasks).forEach(function (subtaskName) {
            packageJsonPart = subtasks[subtaskName](self, answers);

            Object.keys(packageJsonPart).forEach(function (partName) {
                packageJson[partName] = packageJson[partName] || packageJsonPart[partName];
            });
        });
    }

    module.exports = function writePackageJson(self, scope) {
        answers = self.config.get('answers');

        initializePackageJson(self);
        runSubtasks(self, requireDir('./package-json'));

        self.fs.writeJSON(self.destinationPath('package.json'), packageJson);
    };
})();
