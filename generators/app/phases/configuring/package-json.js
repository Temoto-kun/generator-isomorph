(function () {
    var packageJson, answers, requireDir;

    requireDir = require('require-dir');

    function initializePackageJson(self, answers) {
        packageJson = self.fs.readJSON(self.destinationPath('package.json'), {});

        packageJson.title = packageJson.name || answers.name;
        packageJson.name = packageJson.name || answers.name.toLowerCase().replace(/\s+/g, '-');
        packageJson.version = packageJson.version || '0.0.0';
        packageJson.description = packageJson.description || answers.description;
        packageJson.authors = packageJson.authors || [
            answers.author + ' <' + answers.email + '>'
        ];
        packageJson.private = true;
    }

    function runSubtasks(subtasks, answers) {
        var packageJsonPart;

        Object.keys(subtasks).forEach(function (subtaskName) {
            packageJsonPart = subtasks[subtaskName](answers);

            Object.keys(packageJsonPart).forEach(function (partName) {
                packageJson[partName] = packageJson[partName] || packageJsonPart[partName];
            });
        });
    }

    module.exports = function (self) {
        answers = self.config.get('answers');

        initializePackageJson(self, answers);
        runSubtasks(requireDir('./package-json'), answers);

        self.fs.writeJSON(self.destinationPath('package.json'), packageJson);
    };
})();
