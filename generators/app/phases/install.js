(function () {
    module.exports = function (self) {
        var nodeModules;

        nodeModules = self.config.get('nodeModules');

        //self.npmInstall(nodeModules.dependencies, { saveDev: false });
        //self.npmInstall(nodeModules.devDependencies, { saveDev: true });
    };
})();
